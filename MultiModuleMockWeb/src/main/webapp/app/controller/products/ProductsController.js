// Extend timeout for all Ext.Ajax.requests to 90 seconds.
// Ext.Ajax is a singleton, this statement will extend the timeout
// for all subsequent Ext.Ajax calls.
//Ext.override(Ext.data.proxy.Ajax, { timeout:120000 });

Ext.define('Fast.controller.products.ProductsController', {
    extend: 'Ext.app.Controller',
    requires: ['Ext.MessageBox'],
    stores: ['products.Products',
             'products.ProductApproval',
           	 'products.ProductCCI',
         	 'products.MType',
         	 'products.ProductCode',
         	 'products.ProductCode2',
         	 'products.PrdCategory',
         	 'products.ItemSegment',
         	 'products.CountryCode'],

    models: ['products.ProductModel',
         	 'products.ProductApprovalModel',
         	 'products.ProductCCIModel',
         	 'products.Options',
         	'products.Category'],

    views: ['products.ProductFormWnd',
            'products.ProductSetupGrid',
            'products.ProductApprovalGrid'//,
            ],

    refs: [{ ref: 'ProductFormWnd',				selector: 'ProductFormWnd'},
           { ref: 'ProductSetupGrid',			selector: 'ProductSetupGrid'},
           { ref: 'ProductApprovalGrid',		selector: 'ProductApprovalGrid'}
           ],

    init: function() {
        this.control({

 			'ProductSetupGrid dataview'							:	{itemdblclick: this.editProduct},
            'ProductSetupGrid button[action=addProduct]'		:	{click: this.addProduct},
            'ProductSetupGrid button[action=copyProduct]'		:	{click: this.copyProduct},

			'ProductFormWnd button[action=submitProduct]'		:	{click: this.saveOrSubmitProduct},
            'ProductFormWnd button[action=saveProduct]'			:	{click: this.saveOrSubmitProduct},
 			'ProductFormWnd button[action=cancel]'				:	{click: this.cancelAndClose},

			'ProductApprovalGrid button[action=productApproval]':	{click: this.directAjaxProductApproval},
	        'ProductApprovalGrid button[action=productReWork]'	:	{click: this.directAjaxProductReWork}
        });
    },

    getProductsStore: function(){
    	var theGrid	= this.getProductSetupGrid();
    	return theGrid.store;
    },

    getProductApprovalStore: function(){
    	var theGrid	= this.getProductApprovalGrid();
    	return theGrid.store;
    },


    loadFormWithProduct: function(record, isEditMode, inquiryMode) {

    	if(record == null || record == undefined)//TODO message to select product
    		return;
    	var editWnd = Ext.create('Fast.view.products.ProductFormWnd');
    	//editWnd.inquiryMode = inquiryMode; 
    	
    	var editform	= editWnd.down('form');
    	editform.loadedFlag = false;
    	editform.inquiryMode = inquiryMode;
    	var formRef	= editform.getForm();
    	var codeNumberField	= formRef.findField('codeNumber');
    	var itemCodeField	= formRef.findField('itemCode');

		editform.isEditMode = isEditMode;
		editform.validateItemCode = false;//initialize to false
		if(isEditMode){
			codeNumberField.readOnly = true;
			codeNumberField.disable();
			var itemCodeFieldValue = record.get('itemCode');
			if(itemCodeFieldValue != null && itemCodeFieldValue != ''){
				itemCodeField.readOnly = true;
				itemCodeField.disable();
			}else{
				editform.validateItemCode = true;
			}
	    }else{
			codeNumberField.readOnly = false;
	    }


		var productSetupStore = this.getProductsProductsStore();
		editform.loadedFlag = false;
		editform.loadRecord(record);
		editform.loadedFlag = true;
		var status = record.get('status');


		//reload Product Code
		var productCodeField	= formRef.findField('productCode');
 		delete productCodeField.lastQuery;
		productCodeField.store.load();
		//2 digit Product Code
		var productCode2Field	= formRef.findField('pCode2');
 		delete productCode2Field.lastQuery;
		productCode2Field.store.load();


		//load 'category'
		var itemCategoryRef = formRef.findField('category');
		delete itemCategoryRef.lastQuery;
		var productCode = record.data.productCode;
		//itemCategoryRef.store.proxy.api.read= 'json/commonProduct?m=getItemCategoryByPcode&productCode=' + productCode;//commonDropDownCCI
		itemCategoryRef.store.proxy.api.read= 'json/commonDropDownCCI?m=getItemCategoryByPcode&productCode=' + productCode;
		itemCategoryRef.store.load();
		//load 'itemSegment'
		var itemSegmentRef = formRef.findField('itemSegment');
		var categoryCode = record.data.itemCategory;
		//itemSegmentRef.store.proxy.api.read='json/commonProduct?m=getItemSegmentByCategory&categoryCode=' + categoryCode;
		itemSegmentRef.store.proxy.api.read='json/commonDropDownCCI?m=getItemSegmentByCategory&categoryCode=' + categoryCode;
		delete itemSegmentRef.lastQuery;
		itemSegmentRef.store.load();

		if(isEditMode){
			formRef.setValues({displayStatus:status});
			if( status =='Submitted' || status =='Approving' ){
				Ext.getCmp("productFormSaveButton").disable();
				Ext.getCmp("productFormSubmitButton").disable();
			} else if( status =='Active' || status =='Draft' ){
				Ext.getCmp("productFormSaveButton").enable();
				Ext.getCmp("productFormSubmitButton").enable();
			}
		}else{//in CopyMode clear code
			formRef.setValues({id:'', displayStatus:'Draft',codeNumber:'', itemCode:'', itemName:'', status:'Draft'});
		}
		
		editform.checkRequiredFields();
    	if(inquiryMode){
    		editWnd.down('#productFormSubmitButton').setDisabled(true);
    		editWnd.down('#productFormSaveButton').setDisabled(true);
    	}else{
    		editWnd.down('#productFormSubmitButton').setDisabled(false);
    		editWnd.down('#productFormSaveButton').setDisabled(false);
    	}
    },

    editProduct: function(grid, record) {
    	//if(grid.panel.inquiryMode == true) return;
    	this.loadFormWithProduct(record, true, grid.panel.inquiryMode);
    },
    copyProduct: function(button){
    	var grid = this.getProductSetupGrid();
    	var record = grid.getSelectionModel().getSelection()[0];
    	this.loadFormWithProduct(record, false, grid.panel.inquiryMode);
    },

    addProduct: function(grid, record) {
    	var record = Ext.create('Fast.model.products.ProductModel');
    	this.loadFormWithProduct(record, false, grid.panel.inquiryMode);
    },


    saveOrSubmitProduct: function(button){
    	var win    = button.up('window');
    	var buttonArgument = button.myData;//'ProductSubmit' || 'ProductSave'
        var form	= win.down('form');
        var formRef	= form.getForm();

        var urlValue = 'json/commonProduct?m=updateProduct&act='+buttonArgument;
        var errorTitle = (buttonArgument == 'ProductSave')?'SAVE FAILURE:':'SUBMIT FAILURE:';
        var errorMsg = (buttonArgument == 'ProductSave')?'Unable to Save data.':'Unable to Submit data.';
        //will not submitted if diasabled
		var codeNumberField	= formRef.findField('codeNumber');
		codeNumberField.readOnly = false;
		codeNumberField.enable();//disabled field will not be sent

        var productStore = this.getProductsStore();
    	form.submit({
    		url: urlValue,
            success: function (form, action) {
            	productStore.load();
            },
            failure: function(form, action) {
				Ext.MessageBox.show({title: errorTitle,
					                    msg: errorMsg,
					                    icon: Ext.MessageBox.ERROR,
					                    buttons: Ext.Msg.OK});
            }
    	});//eof submit
    	this.cancelAndClose(button);
    },

    /*	==========================
     * cancelAndClose
     */
    cancelAndClose : function(button){
    	this.getProductsStore().load();
    	var win    = button.up('window');
    	var editform	= win.down('form');
    	editform.loadedFlag = false;
    	//TODO - <AP> revisit thise linked comboboxes: the way how ItemSegment/ItemCategory repointed & restored
		var itemSegmentRef = Ext.getCmp('itemSegment');
		if( itemSegmentRef != undefined){
			itemSegmentRef.store.proxy.api.read = 'json/commonDropDownCCI?m=getItemSegmentByCategory';
			itemSegmentRef.store.load();

			var itemCategoryRef = Ext.getCmp('category');
			//itemCategoryRef.store.proxy.api.read = 'json/commonDropDownCCI?m=getCategory';
			itemCategoryRef.store.proxy.api.read = 'json/commonDropDownCCI?m=getItemCategoryByPcode';
			itemCategoryRef.store.load();
		}
    	win.close();
    },

    directAjaxProductApproval: function(button) {
   	    var productApprovalStore = this.getProductsProductApprovalStore();
    	var grid = this.getProductApprovalGrid();
    	records = grid.getSelectionModel().getSelection();
    	//alert("sm.hasSelection()"+sm.hasSelection()+" vs. records.length = "+records.length);
    	if (records.length == 0) {
			Ext.MessageBox.show({title: 'ERROR', msg: "Please select record(s) to approve!",
                    			icon: Ext.MessageBox.ERROR, buttons: Ext.Msg.OK});
    		return;
    	}
        // field value check
        var approvalCommentsField = Ext.getCmp('productApprovalGridCommentsId');
        var requestData = new Object;
        requestData.command = "Approving";
        requestData.approvalComments = approvalCommentsField.getValue();
        requestData.idsToApprove = [];
  	    for (var i = 0; i < records.length ; i++){
   	    	requestData.idsToApprove.push(records[i].data.id);
   	    }
  	    var store = this.getProductApprovalStore();
  	    store.remove(records);

   	    Ext.Ajax.request({
   	        method: 'POST',
   	        url: 'json/commonProduct?m=ajaxUpdateProductApproval&actionFlag=' + 1,
   	        jsonData: requestData,
   	        timeout:120000,
   	        success: function (response,request){
				var theGrid = Ext.getCmp('ProductApprovalGrid');
            	var theStore = theGrid.store;
            	theStore.load();
   	        },
   	        failure: function (response,request){
				Ext.MessageBox.show({
                    title: 'AJAX FAILURE:',
                    msg: 'Unable to change selected records for the reason: '+response.responseText,
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
   	        }
   	    });
	    approvalCommentsField.reset();
        sm.toggleUiHeader(false);
    },
    directAjaxProductReWork: function(button) {
    	var grid = this.getProductApprovalGrid();
    	records = grid.getSelectionModel().getSelection();
    	if (records.length == 0) {
			Ext.MessageBox.show({title: 'ERROR',
								msg: "Please select record(s) to re-work!",
								icon: Ext.MessageBox.ERROR,
								buttons: Ext.Msg.OK});
    		return;
    	}
        // field value check
        var approvalCommentsField = Ext.getCmp('productApprovalGridCommentsId');
        if (approvalCommentsField.getValue() == ""){
        	approvalCommentsField.markInvalid("This field is required");
        	return;
        }
        var requestData = new Object;
        requestData.command = "ReWork";
        requestData.approvalComments = approvalCommentsField.getValue();
        requestData.idsToApprove = [];
  	    for (var i = 0; i < records.length ; i++){
   	    	requestData.idsToApprove.push(records[i].data.id);
   	    }
  	    var store = this.getProductApprovalStore();//this.getProductsProductApprovalStore();
  	    store.remove(records);
   	    Ext.Ajax.request({
   	        method: 'POST',
   	        url: 'json/commonProduct?m=ajaxUpdateProductApproval&actionFlag=' + 2,
   	        jsonData: requestData,
   	        timeout:120000,
   	        success: function(response,request) {
				var theGrid = Ext.getCmp('ProductApprovalGrid');
            	var theStore = theGrid.store;
            	theStore.load();
   	        },
   	        failure: function(response,request)
   	        {
				Ext.MessageBox.show({
                    title: 'AJAX FAILURE:',
                    msg: 'Unable to change selected records for the reason: '+response.responseText,
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
   	        }
   	    });
	    approvalCommentsField.reset();
        sm.toggleUiHeader(false);
    }

});
