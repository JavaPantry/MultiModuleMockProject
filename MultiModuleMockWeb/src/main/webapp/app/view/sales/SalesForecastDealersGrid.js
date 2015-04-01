var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToMoveEditor: 1,
        autoCancel: false
    });

Ext.define('Fast.view.sales.SalesForecastDealersGrid' ,{
    extend:'Ext.grid.Panel',
    alias :'widget.SalesForecastDealersGrid',
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    requires:['Ext.toolbar.Paging'],
    columnLines: true,
    store: 'sales.SalesForecastDealers',

    columns: [{text:'Dealer Id',hidden:true,flex:1,dataIndex:'dealerId'}, 
			  {text:'Customer Name',flex:1,sortable:true,dataIndex:'dealerName'},
			  {text:'Sales Ids',hidden:true,flex:1,sortable:false,dataIndex:'salesIds'}],
	
	initComponent: function() {
		
		this.dockedItems = [{xtype: 'pagingtoolbar', dock:'bottom',
					            store: 'sales.SalesForecastDealers',
					            displayInfo: true,
					            displayMsg: 'Displaying ProductByAccount {0} - {1} of {2}',
					            emptyMsg: "No ProductByAccount to display"
					        }];
		this.callParent(arguments);
	}
});


