Ext.define('Fast.view.dealers.DealerHierarchyGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.DealerHierarchyGrid',
	columnLines: true,
    store: 'dealers.Hierarchy',

	columns:[{text:'Sequence Number',hidden:true,flex:1,sortable:false,dataIndex:'sequenceNumber'},
	 		{text:'Dealer Hierarchy Id',hidden:true,flex:1,sortable:false,dataIndex:'id'},
	 		{text:'Dealer Id',hidden:true,flex:1,sortable:false,dataIndex:'dealerId'}, 
	 		{text:'Deleted Flag',hidden:true,flex:1,sortable:false,dataIndex:'deleted'}, 
	 		{text:'Management Group',hidden:true,flex:1,sortable:false,dataIndex:'value1'}, 
	 		{text:'Management Group',flex:1,sortable:false,dataIndex:'smsValue1'}, 
	 		{text:'Channel',hidden:true,flex:1,sortable:false,dataIndex:'value2'},
	 		{text:'Channel',flex:1,sortable:false,dataIndex:'smsValue2'}, 
	 		{text:'Region',hidden:true,flex:1,sortable:false,dataIndex:'value3'}, 
	 		{text:'Region',flex:1,sortable:false,dataIndex:'smsValue3'}],
	 		
	initComponent: function() {
		this.dockedItems = [{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'dealers.Hierarchy',
            displayInfo: true,
            displayMsg: 'Displaying Dealer Hierarchies {0} - {1} of {2}',
            emptyMsg: "No Dealer Hierarchy to display"
		}];
		
		this.callParent(arguments);
	}
});
