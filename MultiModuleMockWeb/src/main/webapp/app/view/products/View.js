Ext.define('Fast.view.products.View', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.productsView',
    id:'productsView',
    requires: [
    	'Fast.view.products.ProductSetupGrid',
        'Fast.view.products.ProductApprovalGrid',
        'Fast.view.products.ReplacementGrid',
        'Fast.view.products.AllocationGrid'
	],
    
    activeItem: 0,
    margins: '1 1 1 1',
    
    //cls: 'preview',

    initComponent: function() {
        this.items = [	
	{iconCls: 'tabs', xtype: 'ProductSetupGrid', title:'SetUp',
		 listeners: {
             activate: function(tab){
            	 var rootViewer = this.up('rootViewer');
            	 rootViewer.setTitle("FaST: SetUp Products"); 
            	 var theGrid = tab;//Ext.getCmp('ProductSetupGrid');
            	 var theStore = theGrid.store;
            	 theGrid.filters.clearFilters();
				 if (theStore.isFiltered())
					theStore.clearFilter();
            	 theStore.load();
             }
         }
		}
	,{iconCls: 'tabs', xtype: 'ProductApprovalGrid', title:'Approvals',
		 listeners: {
             activate: function(tab){
            	 var rootViewer = this.up('rootViewer'); 
            	 rootViewer.setTitle("FaST: Approve or rework Products");
            	 var theGrid = tab;//Ext.getCmp('ProductApprovalGrid');
            	 theGrid.filters.clearFilters();
            	 var theStore = theGrid.store;
				 if (theStore.isFiltered())
					theStore.clearFilter();
            	 theStore.load();
             }
         }}
	,{iconCls: 'tabs', xtype: 'ReplacementGrid', title: 'Replacemet'}
	,{iconCls: 'tabs', xtype: 'AllocationGrid',	title: 'Allocation'}
	
	];
        this.callParent(arguments);
    }
});