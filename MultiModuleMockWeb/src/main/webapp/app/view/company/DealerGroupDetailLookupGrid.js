var dealersLookupGridFilters = {
    ftype: 'filters',
    encode: 'encode', // json encode the filter query
    filters: [{dataIndex:'dealerCode'}
    		,{dataIndex:'dealerName'}
    		,{dataIndex:'dealerType'}]
};
Ext.define('Fast.view.company.DealerGroupDetailLookupGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.DealerGroupDetailLookupGrid',
	columnLines: true,
    store: 'dealers.Lookup',
    features: [dealersLookupGridFilters],
    columns: [
		{text:'Dealer Id',hidden:true,flex:1,sortable:true,dataIndex:'id'}
		,{text:'Customer Code/Group',flex:1,sortable :true,filter:{type:'string'},dataIndex:'dealerCode'}
		,{text:'Customer Name',flex:1,sortable:true,filter:{type:'string'},dataIndex:'dealerName'}
		,{text:'Customer Type',flex:1,sortable :true,dataIndex:'dealerType'
			,renderer: function(value){
				if (value === 'B') {
				    return 'Bill To';
				}else if (value === 'S') {
				    return 'Sell To';
				}else if (value === 'G') {
				    return 'Group';
				}
				return '';
				}
		}
	],
	
	initComponent: function() {
		this.dockedItems = [{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'dealers.Lookup',
            displayInfo: true,
            displayMsg: 'Displaying Dealers {0} - {1} of {2}',
            emptyMsg: "No Dealer to display"
		}];
		this.callParent(arguments);
	}
});
