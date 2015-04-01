Ext.define('Fast.controller.sales.SalesProductByAccountController', {
    extend: 'Ext.app.Controller',

    selectedSalesProducts:new Array(),
    isFromNewItemPage:false,
    
    
    stores: [
    		'sales.ProductByAccount'
			,'sales.ProductByAccountEdit'
			,'sales.ProductByAccountNewItem'
			],

    models: ['sales.ProductByAccountModel'],

    views: [
			'sales.SalesProductByAccountGrid'
			,'sales.SalesNewOrEditWnd'
			,'sales.SalesProductByAccountEditGrid'
			,'sales.SalesProductByAccountNewItemGrid'
			//'sales.SalesApprovalGrid'
			],

    refs: [
			{ref: 'SalesProductByAccountGrid',selector: 'SalesProductByAccountGrid'}
			,{ref: 'SalesNewOrEditWnd',selector: 'SalesNewOrEditWnd'}
    		,{ref: 'SalesProductByAccountEditGrid',selector: 'SalesProductByAccountEditGrid'}
			,{ref: 'SalesProductByAccountNewItemGrid',selector: 'SalesProductByAccountNewItemGrid'}
			//{ref: 'SalesApprovalGrid',selector: 'SalesApprovalGrid'},
    ],

    init: function() {
        this.control(
       	{
        'SalesProductByAccountGrid button[action=salesProductByAccountSelect]': {click: this.salesProductByAccountSelect},
        'SalesProductByAccountGrid button[action=salesProductByAccountEdit]': {click: this.salesProductByAccountEdit},
        'SalesProductByAccountGrid button[action=salesProductByAccountNewItem]': {click: this.salesProductByAccountNewItem},
        'SalesProductByAccountGrid button[action=salesProductByAccountDelist]': {click: this.salesProductByAccountDelist},
        'SalesProductByAccountGrid button[action=salesProductByAccountReportByProduct]': {click: this.salesProductByAccountReportByProduct},
        'SalesProductByAccountGrid button[action=salesProductByAccountReportByAccount]': {click: this.salesProductByAccountReportByAccount},
        
        'SalesProductByAccountEditGrid button[action=salesProductSubmitForApproval]':{click: this.salesProductSubmitForApproval},
        'SalesProductByAccountEditGrid button[action=salesProductCancelSubmitForApproval]':{click: this.salesProductCancelSubmitForApproval},
        'SalesProductByAccountEditGrid button[action=salesProductBackToNewItems]':{click: this.salesProductBackToNewItems},
        
        'SalesProductByAccountNewItemGrid button[action=salesProductByAccountNewItemSelect]':{click: this.salesProductByAccountNewItemSelect},
        'SalesProductByAccountNewItemGrid button[action=salesProductByAccountNewItemNext]':{click: this.salesProductByAccountNewItemNext},
        'SalesProductByAccountNewItemGrid button[action=salesProductByAccountNewItemBack]':{click: this.salesProductByAccountNewItemBack},
        'SalesProductByAccountNewItemGrid button[action=salesProductByAccountNewItemClearFilter]':{click: this.salesProductByAccountNewItemClearFilter}
        });
    },
// ************* Action  Handlers *************
    
    salesProductByAccountReportByAccount : function() {
    	exportToExcel('D')
	},

	salesProductByAccountReportByProduct: function() {
    	exportToExcel('P');
	},

    salesProductByAccountNewItem : function(button) {
    	var salesNewOrEditWnd = Ext.create('Fast.view.sales.SalesNewOrEditWnd');
    	salesNewOrEditWnd.controller = this;
		var newItemGrid = salesNewOrEditWnd.down('SalesProductByAccountNewItemGrid');
    	var newItemStore=newItemGrid.getStore();
    	if (newItemStore.isFiltered())
    		newItemStore.clearFilter();
		newItemStore.load();
		Ext.getCmp('nextBtn').hide();
		var cardLayout	=	salesNewOrEditWnd.getLayout();
		cardLayout.setActiveItem(0);
		this.isFromNewItemPage = true;
		this.selectedSalesProducts = new Array();
		salesNewOrEditWnd.show();
	},
	
	salesProductByAccountNewItemSelect : function(button) {
 		var salesNewOrEditWnd    = button.up('window');
		var newItemGrid = salesNewOrEditWnd.down('SalesProductByAccountNewItemGrid');//var newItemGrid=Ext.getCmp("productByAccountNewItemGrid");
		 
		 var selectedRecords = newItemGrid.getSelectionModel().getSelection();
		 if (selectedRecords == null || selectedRecords.length == 0){
			Ext.MessageBox.alert({
					title: 'Warning:', msg: 'Please select records with Active/ReWork status for Edit!',
					icon: Ext.MessageBox.OK,
					buttons: Ext.Msg.OK
				});
			return;
		}
		this.selectedSalesProducts.push.apply(this.selectedSalesProducts, selectedRecords);
		//remove selected records from screen
		newItemGrid.getStore().remove(selectedRecords);
		newItemGrid.getView().refresh();
		Ext.getCmp('nextBtn').enable();
		Ext.getCmp('nextBtn').show();
	},
	
	salesProductByAccountNewItemNext : function(button) {
 		var salesNewOrEditWnd    = button.up('window');
		var editGrid = salesNewOrEditWnd.down('SalesProductByAccountEditGrid');//var mewEditGrid=Ext.getCmp("productByAccountEditGrid");               
		//add selected records to edit grid
		var editStore = editGrid.getStore();               	
		if (editStore.isFiltered())
			editStore.clearFilter();
		editStore.removeAll();
		editStore.add(this.selectedSalesProducts);
		var cardLayout	=	salesNewOrEditWnd.getLayout();
		cardLayout.setActiveItem(1);
		editGrid.getSelectionModel().toggleUiHeader(false);
		editGrid.getView().refresh();
		Ext.getCmp('nextBtn').hide();
	},

	//TODO - <AP> TBR???
	salesProductByAccountNewItemBack : function(button) {
		var salesNewOrEditWnd = button.up('window');
		this.selectedSalesProducts = new Array();
		salesNewOrEditWnd.close();
	},

	salesProductBackToNewItems : function(button) {
		var salesNewOrEditWnd = button.up('window');
        if (this.isFromNewItemPage){
			this.selectedSalesProducts = new Array();
			var editGrid = salesNewOrEditWnd.down('SalesProductByAccountEditGrid');//var mewEditGrid=Ext.getCmp("productByAccountEditGrid");               
			//add selected records to edit grid
			var editStore = editGrid.getStore();               	
			if (editStore.isFiltered())
				editStore.clearFilter();
			editStore.removeAll();
			
			var newItemGrid = salesNewOrEditWnd.down('SalesProductByAccountNewItemGrid');
	    	var newItemStore=newItemGrid.getStore();
	    	if (newItemStore.isFiltered())
	    		newItemStore.clearFilter();
			newItemStore.load();
			this.selectedSalesProducts = new Array();
			Ext.getCmp('nextBtn').hide();
			var cardLayout	=	salesNewOrEditWnd.getLayout();
			cardLayout.setActiveItem(0);        }
        else{
        	this.selectedSalesProducts = new Array();
       	    salesNewOrEditWnd.close();
       	    var salesProductByAccountGrid  = this.getSalesProductByAccountGrid();
       	    var salesProductByAccountStore = salesProductByAccountGrid.getStore();
       	    salesProductByAccountGrid.filters.clearFilters();
       	    salesProductByAccountStore.load();
        }
       	Ext.getCmp('editBtn').hide();
	},

	
	salesProductByAccountNewItemClearFilter: function (button) {
		var salesNewOrEditWnd = button.up('window');
		var newItemGrid = salesNewOrEditWnd.down('SalesProductByAccountNewItemGrid');//var newGrid=Ext.getCmp("productByAccountNewItemGrid");
		newItemGrid.filters.clearFilters();
		var newItemStore=newItemGrid.getStore();
    	if (newItemStore.isFiltered())
    		newItemStore.clearFilter();
		newItemStore.load();
		newItemGrid.getView().refresh();
	},

 
	/**
	 * The value must be zero or greater in the adjustedM1 and adjustedM2 fields 
	 * You can not enter margin 2 if margin 1 is zero and neither adjusted margin can be negative
	 *  
	 * @param {} button
	 */
	salesProductSubmitForApproval: function(button) {
		var salesNewOrEditWnd    = button.up('window');
		var editGrid = salesNewOrEditWnd.down('SalesProductByAccountEditGrid');//var grid=Ext.getCmp("productByAccountEditGrid");
        //at least one selection required
        var sequenceNumber=this.getSelectedElementListAsJsonString(editGrid,"sequenceNumber");
        if (sequenceNumber== '{}'){// || sequenceNumber.length==0){
        	Ext.MessageBox.alert({	title: 'Warning:', msg: 'Please select records for Submit!',
                					icon: Ext.MessageBox.OK, buttons: Ext.Msg.OK});
        	return;
        }
        var adjustedM=this.getSelectedElementListAsJsonString(editGrid,"adjustedM");
        var adjustedM2=this.getSelectedElementListAsJsonString(editGrid,"adjustedM2");
        var adjustedComments=this.getSelectedElementListAsJsonString(editGrid,"adjustedComments");
       
        var adjustedMargins = this.getSelectedNumberArray(editGrid,"adjustedM");
        var adjustedMargins2 = this.getSelectedNumberArray(editGrid,"adjustedM2");
        var number=0;
        //TODO - <AP> getSelectedElementListAsJsonString return JSON string '{1,2,3}' String is NOT an ARRAY
        for (i=0; i<adjustedMargins.length;i++){ 
        	if (adjustedMargins[i] >= 0 && adjustedMargins[i] >= 0 &&
        		adjustedMargins[i]==0 && adjustedMargins2[i]!=0){
        		number++;
        		}
        	}
        if (number!=0){
        	Ext.MessageBox.alert({	title: 'Adjusted M% field validation Warning:', 
        							msg: 'You\'ve selected '+ number +' fields with invalid zero values, please enter with non-zero values!',
									icon: Ext.MessageBox.OK, buttons: Ext.Msg.OK});
			return;
        }
		var url="";
        if (this.isFromNewItemPage){
        	url='json/productByAccountEditAction?m=create';
        	//var debugIds =  this.getSelectedElementListAsJsonString(editGrid,"id");
        	//productByAccountEditAction?m=create will expect normal Id //sequenceNumber=this.getSelectedElementListAsJsonString(editGrid,"id");
        }else{
        	url='json/productByAccountEditAction?m=update';	
        }
        
        this.sendPramsToServer(url,sequenceNumber,adjustedM,adjustedM2,adjustedComments);
        this.selectedSalesProducts = new Array();
		salesNewOrEditWnd.close();
	},
	sendPramsToServer: function(url,value1,value2,value3,value4){
		var me = this;
		Ext.Ajax.request({
			url : url,
			method: 'POST',
			params :{ids:value1, am1:value2,am2:value3,cmts:value4},
			success: function(response){
								var text = response.responseText;
								var grid = me.getSalesProductByAccountGrid();
								var store = grid.getStore();
								store.load();
								},
			failure:function(response){
								var text = response.responseText;
								Ext.MessageBox.alert({	title: 'Remote Error:', msg: text,
													icon: Ext.MessageBox.OK, buttons: Ext.Msg.OK});
								}
		});
	},

	salesProductCancelSubmitForApproval: function(button) {
		var salesNewOrEditWnd = button.up('window');
		this.selectedSalesProducts = new Array();
		salesNewOrEditWnd.close();
        Ext.getCmp('editBtn').hide();
	},
    
    salesProductByAccountDelist: function(button) {
		var accountGrid = this.getSalesProductByAccountGrid();//var byAccountGrid=Ext.getCmp("productByAccountGrid");
       	var sequenceNumber = this.getSelectedElementListAsJsonString(accountGrid,"sequenceNumber");
       	//TODO - <AP> suppose to return array of records but need to review the way it sent POST with arrays in body - need send regular JSON 
        if (sequenceNumber == '{}'){//null || sequenceNumber.length == 0){//
	     	Ext.MessageBox.alert({
                    title: 'Warning:', msg: 'Please select records to delist with \'Active\' or \'Rework\' status!',
                    icon: Ext.MessageBox.OK,
                    buttons: Ext.Msg.OK
   	        	});
   	        return;	
        }else{
       	var url='json/productByAccountEditAction?m=delete';
		var me = this;
		Ext.Ajax.request({
			url : url,
			method: 'POST',
			params :{ids:sequenceNumber},               
			success: function(response){
								var text = response.responseText;
								var grid = me.getSalesProductByAccountGrid();
								//reload the grid
								var store = grid.getStore();
								store.load();
								grid.getView().refresh();
								},
			failure:function(response){
								var text = response.responseText;
								Ext.MessageBox.alert({	title: 'Remote Error:', msg: text,
													icon: Ext.MessageBox.OK, buttons: Ext.Msg.OK});
								}
		});

       }
	},

	salesProductByAccountSelect : function() {
		var theStore = this.getSalesProductByAccountStore(); 
		//alert("Selected records with Active/ReWork status will be stored for edit!");
		 var accountGrid=this.getSalesProductByAccountGrid();// Ext.getCmp("productByAccountGrid");
		 var selected	= this.getValidSelectRecords(accountGrid); 
	     if (selected==null || selected.length==0){
	     	Ext.MessageBox.alert({
                    title: 'Warning:', msg: 'Please select records with Active/ReWork status for Edit!',
                    icon: Ext.MessageBox.OK,
                    buttons: Ext.Msg.OK
   	        	});
			return;
		}
		//this.selectedSalesProducts.concat(selected);
		this.selectedSalesProducts.push.apply(this.selectedSalesProducts, selected);
		accountGrid.getStore().remove(selected);
		//clean selection in those removed
		accountGrid.getSelectionModel().deselectAll();
	    Ext.getCmp('editBtn').enable();
		Ext.getCmp('editBtn').show();
		},

	salesProductByAccountEdit : function(button) {
		var salesNewOrEditWnd = Ext.create('Fast.view.sales.SalesNewOrEditWnd');
		salesNewOrEditWnd.controller = this;
		var editGrid = salesNewOrEditWnd.down('SalesProductByAccountEditGrid');
		var editStore	= editGrid.getStore();
		editStore.removeAll();
		editStore.add(this.selectedSalesProducts);
		var cardLayout	=	salesNewOrEditWnd.getLayout();
		cardLayout.setActiveItem(1);
		this.isFromNewItemPage = false;
		this.selectedSalesProducts = new Array();
		salesNewOrEditWnd.show();
	},    

	getValidSelectRecords : function(grid){
		var listValues = new Array();
		var selectedRecords = grid.getSelectionModel().getSelection();
		var size = selectedRecords.length;
	
		for (var i=0;i<size;i++){
			var status = selectedRecords[i].get('accountStatus');
			if (status == "Active" || status == "ReWork"){ 
				listValues.push(selectedRecords[i]);
			}
		}
		return listValues;
	},
	//TODO - <AP> suppose to return array of records but need to review the way it sent POST with arrays in body - need send regular JSON
	getSelectedElementListAsJsonString: function(grid,elmName){
		var listValues="";
		var selectedRecords = grid.getSelectionModel().getSelection();
		var size=selectedRecords.length;
			 
		for (i=0;i<size;i++){
			var validStatus=false;
			var status=selectedRecords[i].get('accountStatus');
			var validStatus=(status=="Active" || status=="ReWork");
			if (validStatus)
				  listValues=listValues+selectedRecords[i].get(elmName);//+", ";
			if ( i != size-1 )	  
				listValues += ", ";
		}
		return "{"+listValues+"}";
	},

	getSelectedNumberArray: function(grid,elmName){
		var result=new Array();
		var selectedRecords = grid.getSelectionModel().getSelection();
		var size=selectedRecords.length;
			 
		for (i=0;i<size;i++){
			var validStatus=false;
			var status=selectedRecords[i].get('accountStatus');
			var validStatus=(status=="Active" || status=="ReWork");
			if (validStatus)
				  result[i]=parseFloat(selectedRecords[i].get(elmName));
		}
		return result;
	}

});
/*
function getSelectedIds(grid){
	var listValues=new Array();
	var selectedRecords = grid.getSelectionModel().getSelection();
	var size=selectedRecords.length;

    for (i=0;i<size;i++){
    var strNumber=selectedRecords[i].get('sequenceNumber');
	  listValues[i]=strNumber;
     }
    return listValues;
};*/


Array.prototype.contains = function (element) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == element) {
			return true;
		}
	}
	return false;
};
function filterData(store,grid) {
	store.filter([{
	    fn: function(record) {
	    	var selectedRecord = grid.getSelectionModel().getSelection();     	
	    	var isSlected=grid.getSelectionModel().isSelected(record);
	       return isSlected;
	    }
	}]);
};

/*
 * function setSelectedRecs(store, selectedIds) {
	store.filter([{
	    fn: function(record) {
	    	//var id=record.get('sequenceNumber');
	    	var status=record.get('accountStatus');
	    	var validStatus=(status=="Active" || status=="ReWork");
	    	return selectedIds.contains(record.get('sequenceNumber')) && validStatus;
	    }
	}]);
};

function setPagingCount(store ){
	    store.on('load', function(store, records, options) {
        store.getBottomToolbar().get(0).setText('Total count: ' + records.length.toString());
        });
};*/

function exportToExcel(type){
	window.open("productByAccountDetailsAction?m=exportToExcel&rptType=" + type + "&math=" + Math.random());
	return false;
};
/*
function getSelectedElementArry(grid,elmName){
	 var arrayValues=new Array();;
	  var selectedRecords = grid.getSelectionModel().getSelection();
	  var size=selectedRecords.length;
	 
     for (i=0;i<size;i++){
    	 arrayValues[i]=selectedRecords[i].get(elmName);
      }
     return arrayValues;
}*/

