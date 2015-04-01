
var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
	clicksToEdit: 1,
	listeners: {
		edit: function(){
			//TODO - <AP> javascript run-time TypeError: grid is undefined
			var grid=Ext.getCmp("productByAccountEditGrid");
			grid.getView().refresh();
		}
	}
});

var sm = Ext.create('Ext.selection.CheckboxModel');
/*var sm = Ext.create('Ext.selection.CheckboxModel',{
	
	onHeaderClick: function(headerCt, header, e) {
      //do nothing
    },
    toggleUiHeader: function(isChecked) {
        var view     = this.views[0],
            headerCt = view.headerCt,
            checkHd  = headerCt.child('gridcolumn[isCheckerHd]');

        if (checkHd) {         
                checkHd.el.removeCls(this.checkerOnCls);         
        }
    }
});*/

Ext.define('Fast.view.sales.SalesProductByAccountEditGrid' ,{
    extend: 'Ext.grid.Panel',
    hideCheckbox: function() {
        var cm = this.grid.getColumnModel();
        var idx = cm.getIndexById(this.id);
        cm.setHidden(idx, true);
    },
    alias : 'widget.SalesProductByAccountEditGrid',
    selModel: sm,
    columnLines: true,
    id: 'productByAccountEditGrid',
    iconCls: 'icon-grid',
    plugins: [cellEditing],
    title : 'Product By Account Edit',
    store: 'sales.ProductByAccountEdit',//TODO

    columns: [

    {text     : 'Sequence Number',hidden   : true,flex     : 1, dataIndex: 'sequenceNumber'	},//sortable : false,
	{text     : 'Product by Account Id',hidden   : true,flex     : 1,dataIndex: 'id'}, //sortable : false,
	{text     : 'Dealer Id',hidden   : true,flex     : 1,dataIndex: 'dealerId'}, //sortable : false,
	{text     : 'Deleted Flag',hidden   : true,flex     : 1,dataIndex: 'deleted'}, //sortable : false,
	{text     : 'Customer Code',flex     : 1,dataIndex: 'customerCode'},//sortable : false,
	{text     : 'Customer Name',flex     : 1,dataIndex: 'customerName'},//sortable : false,
	{text     : 'Sales Person Id',hidden   : true,flex     : 1,dataIndex: 'salesPersonId'},//sortable : false,
	{text     : 'Sales Rep',flex     : 1,dataIndex: 'salesPerson'},//sortable : false,
	{text     : 'Status',flex     : 1,dataIndex: 'accountStatus'}, //sortable : false,
	{text     : 'CCI Category',hidden   : true,flex     : 1,dataIndex: 'category'}, //sortable : false,
	{text     : 'Mgmt Group',flex     : 1,dataIndex: 'managementGroup'}, //sortable : false,
	{text     : 'Category',flex     : 1,dataIndex: 'categoryName'},//sortable : false,
	{text     : 'Code Number',flex     : 1,dataIndex: 'codeNumber'},//sortable : false,
	{text     : 'Item Code',flex     : 1,dataIndex: 'itemCode'},//sortable : false,
	{text     : 'Item Name',flex     : 1,dataIndex: 'itemName'},//sortable : false,
	{text     : 'Std M%',flex     : 1,renderer: function(value) {return (value+'%');},dataIndex: 'defaultM'},//sortable : false,
	{text     : 'Std M2%',flex     : 1,renderer: function(value) {return (value+'%');},dataIndex: 'defaultM2'},//sortable : false,
	{text     : 'Adj M%',flex     : 1,renderer: function(value) {return (value+'%');},
		field: {xtype: 'numberfield',minValue: 0},dataIndex: 'adjustedM'},//sortable : false,
	{text     : 'Adj M2%',flex     : 1,renderer: function(value) {return (value+'%');},
		field: {xtype: 'numberfield',minValue: 0},dataIndex: 'adjustedM2'},//sortable : false,
	{text     : 'Adj Comments',flex     : 1,field: {xtype: 'textfield'},dataIndex: 'adjustedComments'},//sortable : false,
	{text     : 'Approval Comments',hidden   : true,flex     : 1,dataIndex: 'approvalComments'}//sortable : false,
	],
	
	initComponent: function() {
		
		this.dockedItems = [{  
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            layout: {pack:'left'},
            //TODO - <AP> move handlers to controller
            items: [ 
                     {minWidth: 80,text: 'Submit for Approval',iconCls: 'icon-submit',action: 'salesProductSubmitForApproval'} 
					,{minWidth: 80,text: 'Back',iconCls: 'icon-return',action: 'salesProductBackToNewItems'},
					'->'
					,{minWidth: 80,text: 'Cancel',iconCls: 'icon-cancel',action: 'salesProductCancelSubmitForApproval'} ]
        }
        /*,{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'sales.ProductByAccountEdit',
            displayInfo: false,
            displayMsg: 'Displaying ProductByAccount Edit{0} - {1} of {2}',
            emptyMsg: "Displaying ProductByAccount Edit"//"Displaying ProductByAccount Edit 1 - "+totalRecords//+"No ProductByAccount to display"
        }*/];
		
		this.callParent(arguments);
		
	}


});

function filterData(store,grid) {
	store.filter([{
	    fn: function(record) {
	    	var selectedRecord = grid.getSelectionModel().getSelection();     	
	    	var isSlected=grid.getSelectionModel().isSelected(record);
	       return isSlected;
	    }
	}]);
	}

function getSelectedIds(grid){
	 
	 var listValues=new Array();
	  var selectedRecords = grid.getSelectionModel().getSelection();
	  var size=selectedRecords.length;
	 
   for (i=0;i<size;i++){
   var strNumber=selectedRecords[i].get('sequenceNumber');
	  listValues[i]=strNumber;
	  
	 
    }
   
 
   return listValues;
};

function getSelectedElementList(grid,elmName){
	 var listValues="";
	  var selectedRecords = grid.getSelectionModel().getSelection();
	  var size=selectedRecords.length;
	 
      for (i=0;i<size;i++){
	  listValues=listValues+selectedRecords[i].get(elmName)+", ";
	  
       }
      var vaules="{"+listValues+"}";
      
      return vaules.replace(", }", "}");
}

