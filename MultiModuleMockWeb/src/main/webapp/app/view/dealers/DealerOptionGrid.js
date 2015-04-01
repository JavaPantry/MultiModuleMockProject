Ext.define('Fast.view.dealers.DealerOptionGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.DealerOptionGrid',
    autoWidth: true,
	columnLines: true,
    iconCls: 'icon-grid',
    title : 'Additional Option',
    store: 'dealers.Option',
    columns: [{
		text     : 'Dealer Id',
		hidden   : true,
		flex     : 1,
		sortable : false,
		dataIndex: 'id'
	}, {
		text     : 'Default Allocation',
		flex     : 1,
		sortable : false,
		dataIndex: 'hasDefaultAllocation'
	}, {
		text     : 'Forecast',
		flex     : 1,
		sortable : false,
		dataIndex: 'hasForecast'
	},{
		text     : 'Sell Thru/On Hand Inv',
		flex     : 1,
		sortable : false,
		dataIndex: 'hasSellHand'
	},{
		text     : 'Quota',
		flex     : 1,
		sortable : false,
		dataIndex: 'hasQuota'
	}],

	initComponent: function() {
		
		this.callParent(arguments);
	}
});
