Ext.define('Fast.view.dealers.DealerDetailGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.DealerDetailGrid',
    autoWidth: true,
	columnLines: true,
    store: 'dealers.Detail',

    columns: [{text:'Sequence Number',hidden  :true,flex:1,sortable:true,dataIndex:'sequenceNumber'}
			,{text:'Dealer Detail Id',hidden  :true,flex:1,sortable:true,dataIndex:'id'}
			,{text:'Dealer Id',hidden  :true,flex:1,sortable:true,dataIndex:'dealerId'}
			,{text:'Deleted Flag',hidden  :true,flex:1,sortable:true,dataIndex:'deleted'}
			,{text:'CCI Category',hidden  :true,flex:1,sortable:true,dataIndex:'category'}
			,{text:'Management Group',flex:1,sortable:true,dataIndex:'managementGroup'}
			,{text:'Category',flex:1,sortable:true,dataIndex:'categoryName'}
			,{text:'Dealer M%',flex:1,sortable:true,dataIndex:'dealerM'}
			,{text:'Dealer M2%',flex:1,sortable:true,dataIndex:'dealerM2'}
			,{text:'Sales Person Id',hidden:true,flex:1,sortable:true,dataIndex:'salesPersonId'}
			,{text:'Sales Person',flex:1,sortable:true,dataIndex:'salesPerson'}
			,{text:'Sales Mananger Id',flex:1,hidden:true,sortable:true,dataIndex:'salesManagerId'}
			,{text:'Sales Mananger',flex:1,sortable:true,dataIndex:'salesManager'}
			,{text:'Manager Hierarchy Id',flex:1,hidden:true,sortable:true,dataIndex:'managerGrpId'}
			,{text:'Manager Hierarchy',flex:1,sortable:true,dataIndex:'managerGroup'}],

	initComponent: function() {
		
		/*this.dockedItems = [{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'dealers.Detail',
            displayInfo: true,
            displayMsg: 'Displaying Dealer Details {0} - {1} of {2}',
            emptyMsg: "No Dealer Detail to display"
			}];*/
		
		this.callParent(arguments);
	}
});
