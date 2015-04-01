//mine globals
var dealerControllerRef;
//eof mine globals

var lookupStore;
var optionStore;
var optionStoreDefine;
var detailStore;
var detailGrid;
var detailStoreDefine;
var hierarchyStore;
var hierarchyGrid;
var smsHierarchyStore;
var currentRecord;
var previousRecord;

Ext.define('Fast.controller.dealers.DealersController', {
    extend: 'Ext.app.Controller',

    selectedDealerId : 0,
    
    stores: ['dealers.Detail', 'dealers.Option','dealers.Dealer','dealers.DealerQuota',
             'dealers.DealerQuotaDetail','dealers.Budget','dealers.BudgetDetail',
    		'SalesPerson', 'SalesManager', 'ManagerGroup', 'dealers.Hierarchy',
    		'dealers.Lookup','SMSHierarchy','SMSChannel', 'SMSRegion'
             ],

    models: ['SalesPersonModel', 'SalesManagerModel', 'ManagerGroupModel'
    		,'dealers.DealerModel', 'dealers.HierarchyModel','dealers.DealerQuotaModel'
    		,'dealers.DealerQuotaDetailModel','dealers.BudgetModel','dealers.BudgetDetailModel'
             ],

    views: ['dealers.DealerSetupGrid'
            ,'dealers.DealerCreateWnd'
    		,'dealers.DealerDetailWnd'
    		,'dealers.DealerDetailGrid'
    		,'dealers.DealerOptionGrid'
    		,'dealers.OptionForm'
    		,'dealers.DetailForm'
    		,'dealers.DealerHierarchyGrid'
    		,'dealers.LookupGrid'
    		,'dealers.HierarchyForm'
    		
    		,'dealers.DealerQuotaView'
    		,'dealers.DealerQuotaGrid'
    		,'dealers.DealerQuotaDetailView'
    		,'dealers.DealerQuotaDetailGrid'
    		
    		,'dealers.BudgetView'
			,'dealers.BudgetGrid'
			,'dealers.BudgetDetailView'
			,'dealers.BudgetDetailGrid'
    		],

    refs: [	
    		{ref: 'DealerSetupGrid',	selector: 'DealerSetupGrid'}
    		,{ref: 'DealerDetailWnd',	selector: 'DealerDetailWnd'}
    		,{ref: 'DealerCreateWnd',	selector: 'DealerCreateWnd'}
    		
    		,{ref: 'DealerOptionGrid',	selector: 'DealerOptionGrid'}
    		,{ref: 'DealerDetailGrid',	selector: 'DealerDetailGrid'}
    		,{ref: 'DealerHierarchyGrid',selector: 'DealerHierarchyGrid'}
    		,{ref: 'OptionForm',			selector: 'OptionForm'}
    		,{ref: 'DetailForm',			selector: 'DetailForm'}
			,{ref: 'LookupGrid',			selector: 'LookupGrid'}
			,{ref: 'HierarchyForm',		selector: 'HierarchyForm'}
			
			,{ref: 'DealerQuotaView',	selector: 'DealerQuotaView'}
			,{ref: 'DealerQuotaGrid',	selector: 'DealerQuotaGrid'}
			,{ref: 'DealerQuotaDetailView',	selector: 'DealerQuotaDetailView'}
			,{ref: 'DealerQuotaDetailGrid',	selector: 'DealerQuotaDetailGrid'}

			,{ref: 'BudgetView',	selector: 'BudgetView'}
			,{ref: 'BudgetGrid',	selector: 'BudgetGrid'}
			,{ref: 'BudgetDetailView',	selector: 'BudgetDetailView'}
			,{ref: 'BudgetDetailGrid',	selector: 'BudgetDetailGrid'}
			
			],

    init: function() {
        this.control({
        	'DealerQuotaGrid dataview'					:	{itemdblclick: this.openDealerQuota},
        	'DealerQuotaDetailGrid button[action=quotaDetailSave]'		:	{click: this.quotaDetailSave},
        	'DealerQuotaDetailGrid button[action=quotaDetailReset]'		:	{click: this.quotaDetailReset},
        	'DealerQuotaDetailGrid button[action=quotaDetailReturn]'	:	{click: this.quotaDetailReturn},
        	
        	'BudgetGrid dataview'					:	{itemdblclick: this.openBudget},
        	'BudgetDetailGrid button[action=budgetDetailSave]'		:	{click: this.budgetDetailSave},
        	'BudgetDetailGrid button[action=budgetDetailReset]'		:	{click: this.budgetDetailReset},
        	'BudgetDetailGrid button[action=budgetDetailReturn]'	:	{click: this.budgetDetailReturn},

        	//Dealer Setup page
        	'DealerSetupGrid dataview'					:	{itemdblclick: this.openDealerDetailWnd},
            'DealerSetupGrid button[action=delete]'		:	{click: this.deleteDealer},
        	'DealerSetupGrid button[action=create]'		:	{click: this.createDealer},
            
        	
            'DealerCreateWnd button[action=next]'		:	{click: this.searchAndCreateDealer},
            'DealerCreateWnd button[action=lookup]'		:	{click: this.lookupDealer},
            'DealerCreateWnd button[action=back]'		:	{click: this.backToCreateDealerOrCloseWindow},

			'LookupGrid dataview'						:	{itemdblclick: this.selectDealerCCI},
            
            //Dealer Detail Window
            'DealerDetailGrid dataview'		: {itemdblclick: this.editDetail},
            'DealerOptionGrid dataview'		: {itemdblclick: this.editOption},
            'DealerHierarchyGrid dataview'	: {itemdblclick: this.editHierarchy},
            //Dealer Hierarchy
            ////'HierarchyGrid button[action=create]': {click: this.editHierarchy},
            //'HierarchyGrid button[action=delete]': {click: this.deleteHierarchy},
            //'HierarchyGrid button[action=back]': {click: this.backToDetail},
            //'HierarchyGrid button[action=cancel]': {click: this.backToDealer},
            //'HierarchyEdit button[action=save]': {click: this.updateHierarchy},
            'HierarchyForm button[action=updateHierarchy]': {click: this.updateHierarchy},
            
            'DealerDetailWnd button[action=delete]'	:	{click: this.deleteDetailOrHierarhy},
            'DealerDetailWnd button[action=cancel]'	:	{click: this.closeWindow},
            'DealerDetailWnd button[action=next]'	:	{click: this.nextToHierarchy},
            'DealerDetailWnd button[action=back]'	:	{click: this.backToDetail},

            //Dealer Option
            'OptionEdit button[action=save]': {click: this.updateOption},

            //Dealer Edit 
            'DetailEdit button[action=save]': {click: this.updateDetail}
            
        });
    }

	,closeWindow:  function(button) {
	    var wnd    = button.up('window');
	    wnd.close();
	}
	//Budget & BudgetDetail
	,budgetDetailSave: function(button) {
       	var budgetDetailGrid = this.getBudgetDetailGrid();
       	var theStore = budgetDetailGrid.getStore();
       	var syncOptions = {	theStore:theStore,
							success:this.updateBudgetDetailCallback
							};
       	theStore.sync(syncOptions);
	}
    ,updateBudgetDetailCallback:function (batch, syncOptions){
        syncOptions.theStore.load();
    }

	,budgetDetailReset: function(button) {
		dealerControllerRef = this;
    	Ext.MessageBox.confirm('Confirm', 'Are you sure to reset all quotas?', this.budgetDetailResetConfirm);
	}
    ,budgetDetailResetConfirm: function(btn) {
    	if (btn != "yes") return;
    	var budgetDetailView	= dealerControllerRef.getBudgetDetailView();
    	var budgetIdField		= budgetDetailView.down('#Id');
    	Ext.Ajax.request({
   	        method: 'POST',
   	        url: 'json/BudgetController?m=resetBudgetDetail',
   	        params: {budgetId:budgetIdField.getValue()},
   	        timeout:120000,
   	        success: function (response,request){
   	        	var budgetDetailGrid = dealerControllerRef.getBudgetDetailGrid();
   	        	var theStore = budgetDetailGrid.getStore();
   	        	theStore.load();
   	        }
    		,failure: function (response,request){
				Ext.MessageBox.show({title: 'AJAX FAILURE:',
									msg: 'Unable to reset budget details for the reason: '+response.responseText,
									icon: Ext.MessageBox.ERROR,
									buttons: Ext.Msg.OK
									});
   	        }
   	    });
    }
	,budgetDetailReturn: function(button) {
		var budgetView = button.up('BudgetView');
		var cardLayout = budgetView.getLayout();
		cardLayout.setActiveItem(0);
	}

    ,openBudget: function(grid, record) {
    	var cardPanel = grid.up('BudgetView');//var cardPanel = this.getBudgetView();
		var cardLayout = cardPanel.getLayout();
    	var budgetDetailView = cardPanel.down('BudgetDetailView');

    	var budgetIdField			= budgetDetailView.down('#Id');
    	var budgetYearField			= budgetDetailView.down('#Year');
		var year1stHalfField		= budgetDetailView.down('#Year1stHalf');
		var year2ndHalfField		= budgetDetailView.down('#Year2ndHalf');

    	budgetIdField.setValue(record.get('id'));
    	budgetYearField.setValue(record.get('year'));
    	year1stHalfField.setValue(record.get('year1stHalf'));
		year2ndHalfField.setValue(record.get('year2ndHalf'));

		var budgetDetailGrid = cardPanel.down('BudgetDetailGrid');
		var theStore = budgetDetailGrid.getStore();
		theStore.proxy.extraParams = {budgetId:record.get('id')};
		theStore.load();

		cardLayout.setActiveItem(1);
    }
    
//end of Budget & BudgetDetail	
	,quotaDetailSave: function(button) {
       	var dealerQuotaDetailGrid = this.getDealerQuotaDetailGrid();
       	var theStore = dealerQuotaDetailGrid.getStore();
       	var syncOptions = {	theStore:theStore,
							success:this.updateDealerQuotaDetailCallback
							};
       	theStore.sync(syncOptions);
	}
    ,updateDealerQuotaDetailCallback:function (batch, syncOptions){
        syncOptions.theStore.load();
    }
    
	,quotaDetailReset: function(button) {
		dealerControllerRef = this;
    	Ext.MessageBox.confirm('Confirm', 'Are you sure to reset all quotas?', this.resetQuotaConfirm);
	}
    ,resetQuotaConfirm: function(btn) {
    	if (btn != "yes") return;
    	var dealerQuotaDetailView	= dealerControllerRef.getDealerQuotaDetailView();
    	var dealerQuotaIdField		= dealerQuotaDetailView.down('#Id');
    	Ext.Ajax.request({
   	        method: 'POST',
   	        url: 'json/DealerQuotaController?m=resetDealerQuotaDetail',
   	        params: {quotaId:dealerQuotaIdField.getValue()},
   	        timeout:120000,
   	        success: function (response,request){
   	        	var dealerQuotaDetailGrid = dealerControllerRef.getDealerQuotaDetailGrid();
   	        	var theStore = dealerQuotaDetailGrid.getStore();
   	        	theStore.load();
   	        }
    		,failure: function (response,request){
				Ext.MessageBox.show({title: 'AJAX FAILURE:',
									msg: 'Unable to reset quota details for the reason: '+response.responseText,
									icon: Ext.MessageBox.ERROR,
									buttons: Ext.Msg.OK
									});
   	        } 
   	    });
    }	
	,quotaDetailReturn: function(button) {
		var dealerQuotaView = button.up('DealerQuotaView');
		var cardLayout = dealerQuotaView.getLayout();
		cardLayout.setActiveItem(0);
	}
	    
    ,openDealerQuota: function(grid, record) {
    	var cardPanel = grid.up('DealerQuotaView');//var cardPanel = this.getDealerQuotaView();
		var cardLayout = cardPanel.getLayout();
    	var dealerQuotaDetailView = cardPanel.down('DealerQuotaDetailView');
		
    	var dealerIdField			= dealerQuotaDetailView.down('#dealerId');
		var dealerCodeField			= dealerQuotaDetailView.down('#dealerCode');
		var dealerNameField			= dealerQuotaDetailView.down('#dealerName');
		var dealerTypeField			= dealerQuotaDetailView.down('#dealerType');
    	var dealerQuotaIdField		= dealerQuotaDetailView.down('#Id');
    	var dealerQuotaYearField	= dealerQuotaDetailView.down('#Year');
		var year1stHalfField		= dealerQuotaDetailView.down('#Year1stHalf');
		var year2ndHalfField		= dealerQuotaDetailView.down('#Year2ndHalf');

    	dealerIdField.setValue(record.get('dealerId'));
    	dealerCodeField.setValue(record.get('dealerCode'));
    	dealerNameField.setValue(record.get('dealerName'));
    	dealerTypeField.setValue(record.get('dealerType'));
    	dealerQuotaIdField.setValue(record.get('id'));
    	dealerQuotaYearField.setValue(record.get('year'));
    	year1stHalfField.setValue(record.get('year1stHalf'));
		year2ndHalfField.setValue(record.get('year2ndHalf'));
    	
    	
		var dealerQuotaDetailGrid = cardPanel.down('DealerQuotaDetailGrid');
		var theStore = dealerQuotaDetailGrid.getStore();
		theStore.proxy.extraParams = {quotaId:record.get('id')};
		theStore.load();

		cardLayout.setActiveItem(1);
    }
    
    //Dealer
    ,openDealerDetailWnd: function(grid, record) {
		if(record == 'undefined'){
			//console.log('Bad dealer record' + record );
        	return;
		}	
    	//Store TODO - <AP> get rid from that global variable 
    	this.selectedDealerId = record.data.id;
    	//update Store Detail
		var dealerDetailStore = this.getDealersDetailStore();
		dealerDetailStore.proxy.api.read = 'json/commonDealer?m=getDealerDetails&dealerId=' + record.data.id;
        this.getDealersDetailStore().load();
    	//update Store Option
		var dealerOptionStore = this.getDealersOptionStore();
		dealerOptionStore.proxy.api.read = 'json/commonDealer?m=getDealerById&dealerId=' + record.data.id;
        this.getDealersOptionStore().load();
    	var dealerDetailWnd = Ext.create('Fast.view.dealers.DealerDetailWnd');
		//console.log('dealerDetailWnd = '+ dealerDetailWnd);
		//console.log('fieldcontainer = '+dealerDetailWnd.down('fieldcontainer'));
    	var fieldcontainer = dealerDetailWnd.down('fieldcontainer');
    	var dealeCodeField = fieldcontainer.getComponent('dealerCodeId');
    	var dealerNameField  = fieldcontainer.getComponent('dealerNameId');
    	var dealerTypeField  = fieldcontainer.getComponent('dealerTypeId');
    	dealeCodeField.setValue(record.data.dealerCode);
    	dealerNameField.setValue(record.data.dealerName);
    	dealerTypeField.setValue(record.data.dealerType);

		//console.log('dealeCodeField = '+ dealeCodeField+' value = '+dealeCodeField.getValue());
		//console.log('dealerNameField = '+ dealerNameField+' value = '+dealerNameField.getValue());
    	dealerDetailWnd.show();
    },

    deleteDealer: function(button){
    	//AP - in callback this will point to MessageBox.confirm Window  
    	dealerControllerRef = this;
    	var dealerGrid = this.getDealerSetupGrid();
    	var dealerStore = this.getDealersDealerStore();
    	var record = dealerGrid.getSelectionModel().getSelection()[0];
    	if (record){
    		Ext.MessageBox.confirm('Confirm', 'Are you sure to delete this record?', this.deleteDealerConfirm);
    	}
    },
        
    deleteDealerConfirm: function(btn) {
    	if (btn != "yes") return;
    	//this point to  MessageBox.confirm Window
    	var dealerGrid = dealerControllerRef.getDealerSetupGrid();
    	var dealerStore = dealerControllerRef.getDealersDealerStore();
    	var record = dealerGrid.getSelectionModel().getSelection()[0];
    	//console.log(record);
    	var idx = -1;
    	var dataArray = dealerStore.data.items;
    	var i;
    	for(i=0; i< dataArray.length;i++){
    		if (dataArray[i].data.id == record.data.id){
    			idx = i
    			break;
    		}
    	}
    	if(idx != -1){
    		dealerStore.removeAt(idx);
    		dealerStore.sync();
    		//TODO - <AP> does NOT refresh grid. add callback to do dealerStore.load(); 
    		dealerStore.load();
    	}
    }
    
    ,createDealer: function(button) {    
    	var edit = Ext.create('Fast.view.dealers.DealerCreateWnd');
    }

    ,searchAndCreateDealer: function(button) {
        var wnd    = button.up('window');
        var form   = wnd.down('form');
        if (!(form.form.isValid())){
        	return;       
        }
        var values = form.getValues();
		var record = Ext.create('Fast.model.dealers.DealerModel');
		record.set(values);
		//this id set cause that dealerStore can't find new record >>> record.setId(-1);
		var dealerStore = this.getDealersDealerStore();
		dealerStore.add(record);
		var syncOptions = {	controller:this, 
							wnd:wnd, 
							record:record, 
							dealerStore:dealerStore, 
							success:this.createDealerSyncCallback,
							failure:this.failureSyncCallback};
        dealerStore.sync(syncOptions);//POST proxy.api.create url
    }
    ,createDealerSyncCallback:function (batch, syncOptions){
    	//console.log('createDealerSyncCallback    syncOptions.dealerStore = '+syncOptions.dealerStore);
    	syncOptions.dealerStore.load();
    	syncOptions.wnd.close();

		var responseObj = Ext.JSON.decode(batch.operations[0].response.responseText,true);
		var newDealerId = responseObj.dealers.id;
		//console.log('DealerController::createDealerSyncCallback newDealerId = ' + newDealerId);
		syncOptions.record.setId(newDealerId);
    	syncOptions.controller.openDealerDetailWnd(null, syncOptions.record);
    }
    ,selectDealerCCI: function(grid, record) {
        if(record == 'undefined' || record ==null)
        	return;
        var wnd = grid.up('window');
		var recordId = record.getId();
        record.setId(-1);

		var dealerStore = this.getDealersDealerStore();
		var lookupStore = this.getDealersLookupStore();
		var syncOptions = {	controller:this, 
							record:record,
							recordId:recordId,
							dealerStore:dealerStore, 
							wnd:wnd,
							success:this.lookupDealerSyncCallback,
							failure:this.failureSyncCallback};
		this.getDealersLookupStore().sync(syncOptions);
    },
	
	lookupDealerSyncCallback:function (batch, syncOptions){
		syncOptions.dealerStore.load();
		syncOptions.wnd.close();
		var responseObj = Ext.JSON.decode(batch.operations[0].response.responseText,true);
		var newDealerId = responseObj.dealers.id;
		syncOptions.record.setId(newDealerId);
    	syncOptions.controller.openDealerDetailWnd(null, syncOptions.record);
	},

	failureSyncCallback:function (batch, syncOptions){
    	syncOptions.dealerStore.load();
    	//need to be restored if failure hapens on lookup
		syncOptions.record.setId(syncOptions.recordId);
	},
	
	backToCreateDealerOrCloseWindow: function(button){
		var cardPanel	=	button.up('panel');
    	var cardLayout	=	cardPanel.getLayout(); 
    	var prevBtn = Ext.getCmp('back');
    	var nextBtn = Ext.getCmp('next');
    	var lookupBtn = Ext.getCmp('lookup');
    	var idx = cardPanel.items.indexOf(cardLayout.getActiveItem());
    	if(idx == 1){
    		cardLayout.setActiveItem(0);
    		nextBtn.setDisabled(false);
    		lookupBtn.setDisabled(false);
    	}else{
			var win    = button.up('window');
			win.close();    		
    	}
	},

    
    lookupDealer: function(button){
    	
        var wnd    = button.up('window');
        var form   = wnd.down('form');
        var values = form.getValues();
    	
		var cardPanel	=	button.up('panel');
    	var cardLayout	=	cardPanel.getLayout(); 
    	var prevBtn = Ext.getCmp('back');
    	var nextBtn = Ext.getCmp('next');
    	var lookupBtn = Ext.getCmp('lookup');
    	var idx = cardPanel.items.indexOf(cardLayout.getActiveItem());

		cardLayout.setActiveItem(1);
		nextBtn.setDisabled(true);
		lookupBtn.setDisabled(true);
    	var lookupStore = this.getDealersLookupStore();
    	
    	var filterStr ='';
    	lookupStore.clearFilter(true);
    	if (!(values.dealerCode == null || values.dealerCode == undefined || values.dealerCode == '')){
    		//lookupStore.filter([{property:"dealerCode", value: values.dealerCode, type:'string'}]);
    		filterStr+="{property:'dealerCode',value: values.dealerCode}";
    	}
    	if (!(values.dealerType == null || values.dealerType == undefined || values.dealerType == '')){
    		if(filterStr.length > 0) filterStr+=',';
    		//lookupStore.filter('dealerType', values.dealerType);
    		filterStr+="{property:'dealerType',value: values.dealerType}";
    	}
    	if(filterStr.length > 0){
    		var filters = eval('['+filterStr+']');
    		lookupStore.filter(filters);
    	}
    	
    	lookupStore.load();//.filter([{field:"dealerCode", value: values.dealerCode, type:'string'}]);
    },

    nextToHierarchy: function(button) {
    	//var hierarchyStoreDefineInst = this.getStore('Fast.store.dealers.Hierarchy'); 
    	var hierarchyStore = this.getDealersHierarchyStore();
		hierarchyStore.proxy.api.read='json/commonDealer?m=getDealerHierarchies&dealerId=' + this.selectedDealerId;
		hierarchyStore.load();//this.getDealersHierarchyStore()
    	var cardPanel	=	button.up('panel');
    	var cardLayout	=	cardPanel.getLayout(); 
    	var prevBtn = Ext.getCmp('back');
    	var nextBtn = Ext.getCmp('next');
    	cardLayout.setActiveItem(1);
    	prevBtn.setDisabled(!cardLayout.getPrev());
    	nextBtn.setDisabled(!cardLayout.getNext());
    },

    backToDetail: function(button) {
    	var dealerDetailStore = this.getDealersDetailStore();
    	dealerDetailStore.load();
    	
    	var cardPanel	=	button.up('panel');
    	var cardLayout	=	cardPanel.getLayout(); 
    	var prevBtn = Ext.getCmp('back');
    	var nextBtn = Ext.getCmp('next');
    	cardLayout.setActiveItem(0);
    	prevBtn.setDisabled(!cardLayout.getPrev());
    	nextBtn.setDisabled(!cardLayout.getNext());
    },
    
    //Dealer Option
    editOption: function(grid, record) {
        var edit = Ext.create('Fast.view.dealers.OptionForm').show();
        if(record){
        	edit.down('form').loadRecord(record);
        }
    },
    
    updateOption: function(button) {
        var win    = button.up('window');
        var form   = win.down('form');
        var record = form.getRecord();
        var values = form.getValues();
                
		record.set(values);
        this.getDealersOptionStore().sync();
		win.close();
    },
    
    //Dealer Detail
    editDetail: function(grid, record) {
        var edit = Ext.create('Fast.view.dealers.DetailForm');
        if(record){
        	edit.down('form').loadRecord(record);
        }
    },
    
    //TODO handle new dealers
    updateDetail: function(button) {
        var editDetailWnd    = button.up('window');
        var form   = editDetailWnd.down('form');
        var formRef= form.getForm();
        
        var isValid = true;
        // field value check
        var salesPersonField	= formRef.findField('salesPersonId');
        var salesManagerField	= formRef.findField('salesManagerId');
        var managerGroupField	= formRef.findField('managerGrpId');
        var dealerIdField		= formRef.findField('dealerId');
        
        if (salesPersonField.getValue() == 0){
        	salesPersonField.markInvalid("This field is required");
        	isValid = false;
        }
        
        if (salesManagerField.getValue() == 0){
        	salesManagerField.markInvalid("This field is required");
        	isValid = false;
        }
        if (salesPersonField.getValue() == salesManagerField.getValue()
        		&& salesPersonField.getValue() > 0){
        	salesManagerField.markInvalid("Sales person and sales manager should not be same person");
        	isValid = false;        	
        }
        
        if (managerGroupField.getValue() == 0){
        	managerGroupField.markInvalid("This field is required");
        	isValid = false;
        }
        
        if (!isValid) return;
        
        var record = form.getRecord();
        var values = form.getValues();
		values.dealerId = dealerIdField.getValue();        
		if (values.id > 0){
			record.set(values);
		} else{
			record = Ext.create('Fast.model.dealers.DetailModel');
			record.set(values);
			record.setId(0);
			this.getDealersDetailStore().add(record);
		}
        
        this.getDealersDetailStore().sync();
		editDetailWnd.close();
    },
    
    deleteDetailOrHierarhy: function(button) {
    	dealerControllerRef = this;
    	
 		var cardPanel	=	button.up('panel');
    	var cardLayout	=	cardPanel.getLayout(); 
    	var idx = cardPanel.items.indexOf(cardLayout.getActiveItem());

		if(idx == 0){//on Dealer Detail panel
	    	var detailGrid = this.getDealerDetailGrid();
	    	var record = detailGrid.getSelectionModel().getSelection()[0];
	    	if (record){
	    		if (record.get('sequenceNumber') == 0) return;
	    		Ext.MessageBox.confirm('Confirm', 'Are you sure to delete this record?', this.deleteDetailConfirm);
	    	}
		}else{//on Hierarhy panel
			var hierarchyGrid = this.getDealerHierarchyGrid();
	    	var record = hierarchyGrid.getSelectionModel().getSelection()[0];
	    	if (record){
	    		if (record.get('sequenceNumber') == 0) return;
	    		Ext.MessageBox.confirm('Confirm', 'Are you sure to delete this record?', this.deleteHierarchyConfirm);
	    	}
		}
     },
        
    deleteDetailConfirm: function(btn) {
    	if (btn != "yes") return;
    	var dealersDetailStore = dealerControllerRef.getDealersDetailStore(); 
    	var detailGrid = dealerControllerRef.getDealerDetailGrid();
    	var record = detailGrid.getSelectionModel().getSelection()[0];
    	record.set('deleted', true);
    	record.set('dealerM', 0);
    	record.set('dealerM2', 0);
    	record.set('salesPerson', null);
    	record.set('salesManager', null);
    	record.set('managerGroup', null);
    	dealersDetailStore.sync();
    },
    //TODO - <AP> find out what's going on with hierarhy delete and why after phisical delete there still 3 records see selectDealerCCI
    deleteHierarchyConfirm: function(btn) {
    	if (btn != "yes") return;
    	var hierarchyStore = dealerControllerRef.getDealersHierarchyStore();
    	var hierarchyGrid = dealerControllerRef.getDealerHierarchyGrid();
    	record = hierarchyGrid.getSelectionModel().getSelection()[0]; 
    	//clear Channel and Region data
    	record.set('deleted', true);
    	record.set('value2', null);
    	record.set('value3', null);
    	hierarchyStore.sync();        
    },
    
    //Dealer Hierarchy
    editHierarchy: function(grid, record) {
    	smsHierarchyStore = this.getSMSHierarchyStore();
    	var smsHierarchyStoreVar = this.getSMSHierarchyStore();
    	regionStore = this.getSMSRegionStore();
    	var channelStore = this.getSMSChannelStore();
    	channelStore.removeAll();
    	currentRecord = record;
    	previousRecord = null;
    	
    	smsHierarchyStore.each(function(hierarchy){
						    		if (currentRecord.get('value1') == hierarchy.get('mgmtGrp') ){
						    			if (previousRecord == null){
						    			this.getSMSChannelStore().add(hierarchy);    			
						    			}else{
						    				if (!((hierarchy.get('mgmtGrp') == previousRecord.get('mgmtGrp'))
						    						&&(previousRecord.get('channelName') == hierarchy.get('channelName')))){
						    	    			this.getSMSChannelStore().add(hierarchy);    					
						    				}
						    			}
						    		}
						    		previousRecord = hierarchy;
						    	}, this); 
        var edit = Ext.create('Fast.view.dealers.HierarchyForm').show();
        if(record){
        	edit.down('form').loadRecord(record);
        }
    },
    
    updateHierarchy: function(button) {
        var wnd    = button.up('window');
        var form   = wnd.down('form');
        var isValid = true;
        var channelField = Ext.getCmp('hierarchyFormValue2Id');
        if (channelField.getValue() == null || channelField.getValue() == ""){
        	channelField.markInvalid("This field is required");
        	isValid = false;
        }
        var regionField = Ext.getCmp('hierarchyFormValue3Id');
        if ((regionField.getValue() == null || regionField.getValue() == "")
        		&& this.getSMSRegionStore().getCount() > 0){
        	this.getSMSRegionStore().each(function(region){
        		if (region.get('region') != null && region.get('region') != ""){
                	regionField.markInvalid("This field is required");
                	isValid = false;        			
        		}
        	});
        }
        
        if (!isValid) return;
        
        var record = form.getRecord();
        var values = form.getValues();

		values.dealerId = this.selectedDealerId;
		if (values.id > 0){
			record.set(values);
		} else{
			record = Ext.create('Fast.model.dealers.HierarchyModel');
			record.set(values);
			record.setId(0);
			this.getDealersHierarchyStore().add(record);
		}
        this.getDealersHierarchyStore().sync();
		wnd.close();
		//var theStore = this.getStore('Fast.store.dealers.Hierarchy');
		//theStore.proxy.api.read='json/commonDealer?m=getDealerHierarchies&dealerId=' + this.selectedDealerId;
    	var hierarchyStore = this.getDealersHierarchyStore();
		hierarchyStore.proxy.api.read='json/commonDealer?m=getDealerHierarchies&dealerId=' + this.selectedDealerId;
		hierarchyStore.load();//this.getDealersHierarchyStore()

    }
});


function setRegionStore(channelName){
	previousRecord = null;
	regionStore.removeAll();
	smsHierarchyStore.each(function(hierarchy){
		if (currentRecord.get('value1') == hierarchy.get('mgmtGrp')
				&& channelName == hierarchy.get('channelName')){
			if (previousRecord == null){				
				regionStore.add(hierarchy);    			
			}else{
				if (!((hierarchy.get('mgmtGrp') == previousRecord.get('mgmtGrp'))
						&& (previousRecord.get('channelName') == hierarchy.get('channelName'))
						&& (previousRecord.get('region') == hierarchy.get('region')))){
					regionStore.add(hierarchy);    					
				}
			}
		}
		previousRecord = hierarchy;
	}, this); 
};



