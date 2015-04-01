Ext.define('Fast.view.products.ProductSetupGrid' ,{
     extend:'Ext.grid.Panel',
     //id : 'ProductSetupGrid',
     alias :'widget.ProductSetupGrid',
     requires:['Ext.toolbar.Toolbar','Ext.toolbar.Paging'],
     columnLines: true,
     inquiryMode:false,
     //TODO why I can't see external store
     store : 'products.Products',//localStore,
     features: [{
		    ftype: 'filters',
		    encode: 'encode', // json encode the filter query
		    filters: [	{type: 'string',dataIndex: 'itemCategory'},
						{type: 'string',dataIndex: 'codeNumber'},
						{type: 'string',dataIndex: 'itemCode'},
						{type: 'string',dataIndex: 'itemName'},
						{type: 'string',dataIndex: 'status'}]
		     			}],
    
			columns: [	{text:'Product Id',		hidden:true,flex:1,sortable:true,dataIndex: 'id'}, 
						{text:'Management Groups',	flex: 1,sortable : true,dataIndex: 'mgmtGrp'},
						{text:'Category Code',		flex:1,sortable:true,dataIndex:'itemCategory'},
						{text:'Category Name',		flex:1,sortable:false,dataIndex:'categoryName'},
						{text:'Code Number',		flex:1,sortable:true,dataIndex: 'codeNumber'},
						{text:'Item Code',		flex:1,sortable:true,dataIndex: 'itemCode'},
						{text:'Item Name',		flex:1,sortable : true,dataIndex: 'itemName'},
						{text:'Item Setup Status',	flex:1,sortable : true,dataIndex: 'status'}
						],
						
	initComponent: function() {
		 Ext.apply(this, { 
			dockedItems:[
			{
			xtype: 'toolbar',
			dock:'top',
			items: [{iconCls: 'icon-add', itemId: 'productCreate',text: 'Create',action: 'addProduct'},
			        {iconCls: 'icon-copy',itemId: 'productCopy',text: 'Copy',action: 'copyProduct'}]
			},
       		{// paging bar on the bottom
			xtype: 'pagingtoolbar',
			dock:'bottom',
			store: 'products.Products',//localStore,
			displayInfo: true,
			displayMsg: 'Displaying Products {0} - {1} of {2}',
			emptyMsg: "No Product to display"
			}
			]
			});
		this.callParent(arguments);
	}
}
);
