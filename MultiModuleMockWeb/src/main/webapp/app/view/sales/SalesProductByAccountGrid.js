var editRecordHolder= new Array();
var count=0;
isFromNewItemPage=false;
var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToMoveEditor: 1,
        autoCancel: false
    });
var sm = Ext.create('Ext.selection.CheckboxModel');

Ext.define('Fast.view.sales.SalesProductByAccountGrid' ,{
    extend:'Ext.grid.Panel',
    id : 'SalesProductByAccountGrid',
    alias :'widget.SalesProductByAccountGrid',
    selModel: sm,
    requires:['Ext.toolbar.Toolbar','Ext.toolbar.Paging'],
    columnLines: true,
    store: 'sales.ProductByAccount',
    features: [{
				ftype: 'filters', encode: 'encode', // json encode the filter query
				filters: [{type: 'string',dataIndex:'customerCode'},
				          {type: 'string',dataIndex:'customerName'}]
				}],


    columns: [	{text:'Sequence Number',hidden: true,flex:1,dataIndex:'sequenceNumber'},
				{text:'Product by Account Id',hidden:true,flex:1,dataIndex:'id'}, 
				{text:'Dealer Id',hidden:true,flex:1,dataIndex:'dealerId'}, 
				{text:'Deleted Flag',hidden:true,flex:1,dataIndex:'deleted'},
				{text:'Cust Code',width:60,sortable:true,dataIndex:'customerCode'},
				{text:'Customer Name',width:100,sortable:true,dataIndex:'customerName'},
				{text:'Sales Person Id',hidden:true,flex:1,sortable:false,dataIndex:'salesPersonId'},
				{text:'Sales Rep',width:90,sortable:true,dataIndex:'salesPerson',filterable:true},
				{text:'Status',width:130,sortable:true,dataIndex:'accountStatus',filterable:true},
				{text:'CCI Category',hidden:true,flex:1,sortable:true,dataIndex:'category'},
				{text:'Mgmt Grp',width:45,sortable:true,dataIndex:'managementGroup',filterable:false},
				{text:'Category',width:50,sortable:true,dataIndex:'categoryName',filterable:false},
				{text:'Code Number',width:110,sortable:true,dataIndex:'codeNumber',filterable:true},
				{text:'Item Code',width:70,sortable:true,dataIndex:'itemCode',filterable:true},
				{text:'Item Name',width:120,sortable:true,dataIndex:'itemName',filterable:true},
				{text:'Std M%',width:60,sortable:true,renderer: function(value){return (value+'%');},dataIndex:'defaultM'},
				{text:'Std M2%',width:60,sortable:true,renderer: function(value) {return (value+'%');},dataIndex:'defaultM2'	},
				{text:'Adj M%',width:60,sortable:true,renderer: function(value) {	return (value+'%');},dataIndex:'adjustedM',filterable:true},
				{text:'Adj M2%',width:60,sortable:true,renderer: function(value) {return (value+'%');},dataIndex:'adjustedM2',filterable:true},
				{text:'Cost',width:60,dataIndex:'calculatedCost'},
				{text:'Adj Comments',flex:1,sortable:true,dataIndex:'adjustedComments'},
				{text:'Approval Comments',hidden:true,flex:1,sortable:true,dataIndex:'approvalComments'}
				],
	
	initComponent: function() {
		
		this.dockedItems = [{
			xtype: 'toolbar',
            dock:'top',
            items: [
            {minWidth: 80,itemId:'SlsPrdAcctSelect',text: 'Select', iconCls: 'icon-check', action:'salesProductByAccountSelect'},
            {minWidth: 80,itemId:'SlsPrdAcctEdit',text: 'Edit', id: 'editBtn', iconCls: 'icon-modify', hidden: true,action:'salesProductByAccountEdit'},
            {minWidth: 80,itemId:'SlsPrdAcctNewItem',text: 'New Item',iconCls: 'icon-modify',action:'salesProductByAccountNewItem'},
            {minWidth: 80,itemId:'SlsPrdAcctDelist',text: 'Delist',iconCls: 'icon-delete',iconCls: 'icon-delete',action:'salesProductByAccountDelist'},
            {minWidth: 80,itemId:'SlsPrdAcctRptByPrd',text: 'SKU Report by Product',iconCls: 'icon-report',action:'salesProductByAccountReportByProduct'},
            {minWidth: 80,itemId:'SlsPrdAcctRptByAcc',text: 'SKU Report by Account', iconCls: 'icon-report',action:'salesProductByAccountReportByAccount'}]
        },
        {
            xtype: 'pagingtoolbar', dock:'bottom',
            store: 'sales.ProductByAccount',//localStore,
            displayInfo: true,
            displayMsg: 'Displaying ProductByAccount {0} - {1} of {2}',
            emptyMsg: "No ProductByAccount to display"
        }];
		this.callParent(arguments);
	}
});


