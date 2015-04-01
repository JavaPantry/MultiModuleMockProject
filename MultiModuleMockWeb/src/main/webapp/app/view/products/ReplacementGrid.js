//TODO - <AP> TBR Used nowhere
Ext.define('Fast.view.products.ReplacementGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.ReplacementGrid',
	columnLines: true,
    //iconCls: 'icon-grid',
    //title : 'Product Replacement',
	//store: 'products.Products',
	columns: []
/*
	columns: [{text: 'End of Life',
	columns: [{text     : 'Code Number',width    : 206,sortable : true,dataIndex: 'codeNumber'}
		,{text     : 'Item Code',width    : 206,sortable : true,dataIndex: 'itemCode'}
		,{text     : 'Item Name',width    : 206,sortable : true,dataIndex: 'itemName'}]}
	,{text: 'Replacement',
	columns: [{text     : 'Code Number',width    : 206,sortable : true,dataIndex: 'codeNumber2'}
		,{text     : 'Item Code',width    : 206,sortable : true,dataIndex: 'itemCode2'}
		,{text     : 'Item Name',width    : 206,sortable : true,dataIndex: 'itemName2'}]}
	]
	,initComponent: function() {
		
		this.dockedItems = [{
            xtype: 'toolbar',
            dock:'top',
            items: [{
                text:'Item Lookup',
                tooltip:'go to lookup page',
                iconCls: 'icon-search',
                handler : function() {
                   
                  	goToDiv("productItemLookup");
   					}
            }]
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'products.Products',
            displayInfo: true,
            displayMsg: 'Displaying Products {0} - {1} of {2}',
            emptyMsg: "No Product to display"
		}];
		//goToDiv('productSetup');
		this.callParent(arguments);
	}*/
});
