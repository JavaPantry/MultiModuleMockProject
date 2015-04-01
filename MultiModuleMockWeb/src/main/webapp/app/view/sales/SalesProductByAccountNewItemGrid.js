//Ext.Loader.setConfig({enabled: true});
//Ext.Loader.setPath('Ext.ux', 'resources/js/ext-4.0.0/ux');
Ext.require([
             'Ext.grid.*',
             'Ext.data.*',
             'Ext.util.*',
             'Ext.state.*',
             'Ext.QuickTips.*',
             'Ext.ux.grid.FiltersFeature'
         ]);


var filters = {
	    ftype: 'filters',
	    encode: 'encode', // json encode the filter query
	    filters: [{dataIndex: 'customerCode'},
	              {dataIndex: 'itemCode'},
	              {dataIndex: 'salesPerson'},
	              {dataIndex: 'customerName'},
	              {dataIndex: 'category'},
	              {dataIndex: 'managementGroup'},
	              {dataIndex: 'categoryName'},
	              {dataIndex: 'codeNumber'},
	              {dataIndex: 'itemName'}	              
	    ]
	}

var newRecordHolder= new Array();
var num=0;
var selectedIds=null;

var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToMoveEditor: 1,
        autoCancel: false
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

Ext.define('Fast.view.sales.SalesProductByAccountNewItemGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.SalesProductByAccountNewItemGrid',
    selModel: sm,
    columnLines: true,
    features: [filters],
    id: 'productByAccountNewItemGrid',
    iconCls: 'icon-grid',

    title : 'Product By Account New Item',
    store: 'sales.ProductByAccountNewItem',

    columns: [
    {text     : 'Sequence Number',hidden   : true,flex     : 1,dataIndex: 'sequenceNumber'},
	{text     : 'Product by Account Id',hidden   : true,flex     : 1,dataIndex: 'id'}, 
	{text     : 'Dealer Id',hidden   : true,flex     : 1,dataIndex: 'dealerId'}, 
	{text     : 'Deleted Flag',hidden   : true,flex     : 1,sortable : false,dataIndex: 'deleted'}, 
	{text     : 'Customer Code',flex     : 1,dataIndex: 'customerCode',filterable: true},
	{text     : 'Sales Person Id',hidden   : true,flex     : 1,sortable : false,dataIndex: 'salesPersonId'},
	{text     : 'Sales Rep',flex     : 1,dataIndex: 'salesPerson',filterable: true},
	{text     : 'Customer Name',flex     : 1,dataIndex: 'customerName',filterable: true},
	{text     : 'CCI Category',hidden   : true,flex     : 1,dataIndex: 'category',filterable: true}, 
	{text     : 'Mgmt Group',flex     : 1,dataIndex: 'managementGroup',filterable: true}, 
	{text     : 'Category',flex     : 1,dataIndex: 'categoryName',filterable: true},
	{text     : 'Code Number',flex     : 1,dataIndex: 'codeNumber',filterable: true},
	{text     : 'Item Code',flex     : 1,dataIndex: 'itemCode',filterable: true},
	{text     : 'Item Name',flex     : 1,dataIndex: 'itemName',filterable: true},
	{text     : 'Product by Account Status',flex     : 1,hidden : true,dataIndex: 'accountStatus'}
	],
	
	initComponent: function() {
		this.dockedItems = [{  
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            layout: {
                pack: 'left'
            },
            items: [
          		{minWidth: 80,
                text: 'Select',
                iconCls: 'icon-check',
                action:'salesProductByAccountNewItemSelect'
            },{
                minWidth: 80,
                text: 'Back',
                iconCls: 'icon-return',
                action:'salesProductByAccountNewItemBack'
            },{
                minWidth: 80,
                text: 'Next',
                id: 'nextBtn',
                iconCls: 'icon-next',
                hidden: true,
                action:'salesProductByAccountNewItemNext'
            },{
                text: 'Clear Filter',
                iconCls: 'icon-reset',
                action:'salesProductByAccountNewItemClearFilter'
            }
            ]
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'sales.ProductByAccountNewItem',
            displayInfo: true,
            displayMsg: 'Displaying ProductByAccount New Item {0} - {1} of {2}',
            emptyMsg: "No ProductByAccount to display"
        }];
		this.callParent(arguments);
	}
});
function getNewItemSelectedIds(grid){
	var listValues=new Array();
	var selectedRecords = grid.getSelectionModel().getSelection();
	var size=selectedRecords.length;
	for (i=0;i<size;i++){
		var strNumber=selectedRecords[i].get('id');
		listValues[i]=strNumber;
	}
	return listValues;
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
	
function setSelectedNewItemRecs(store, selectedIds) {
	store.filter([{
	    fn: function(record) {
	    	//var id=record.get('sequenceNumber');
	    	//var status=record.get('accountStatus');
	    	//var validStatus=(status=="Active" || status=="ReWork");
	    	return selectedIds.contains(record.get('id'));
	      
	    }
	}]);
};