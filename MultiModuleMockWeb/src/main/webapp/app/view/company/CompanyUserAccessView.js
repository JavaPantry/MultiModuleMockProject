Ext.define('Fast.view.company.CompanyUserAccessView' ,{
    extend: 'Ext.Panel',
    alias : 'widget.CompanyUserAccessView',
    iconCls: 'icon-grid',
    columnLines: true,
    //title : 'Company User Details',
    layout:'card',
    
    requires: [
    'Fast.view.company.CompanyUserSelectGrid'
    ,'Fast.view.company.CompanyUserDetailForm'
    ,'Fast.view.company.CompanySalesManagerGrid'
    ],
    
    items:[	{xtype:'CompanyUserSelectGrid'
    		, listeners: {
             activate: function(tab){
            	 var rootViewer = this.up('rootViewer');
            	 rootViewer.setTitle("Fast: Company Hierarchy."); 
             }
    		}}
    		,{xtype:'CompanyUserDetailForm'
    		, listeners: {
             activate: function(tab){
            	// Added to refresh combobox
            	 var theStore = userGroupRemoteStore;
            	 theStore.reload();
            	 var rootViewer = this.up('rootViewer');
            	 rootViewer.setTitle("Fast: User Access - Details."); 
             }
    		}}
    		,{xtype:'CompanySalesManagerGrid'
    		, listeners: {
             activate: function(tab){
            	 var rootViewer = this.up('rootViewer');
            	 rootViewer.setTitle("Fast: User Access - Senior Manager."); 
             }
    		}}
    		
			]
});
