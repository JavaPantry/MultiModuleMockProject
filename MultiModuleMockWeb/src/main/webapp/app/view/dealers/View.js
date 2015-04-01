Ext.define('Fast.view.dealers.View', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.dealersView',
    id:'dealersView',
    /*requires: [
    	'Fast.view.dealers.DealerSetupGrid'
    	,'Fast.view.dealers.DealerAllocationGrid'
        ,'Fast.view.dealers.DealerQuotaGrid'
        ,'Fast.view.dealers.DealerBudgetGrid'
	],*/
    
    activeItem: 0,
    margins: '1 1 1 1',
    
    //cls: 'preview',

    initComponent: function() {
        this.items = [	
		/*{iconCls: 'tabs', xtype: 'DealerSetupGrid',	title: 'SetUp',		id:	'dealersSetUp'
			, listeners: {
             activate: function(tab){
            	 var rootViewer = this.up('rootViewer');
            	 rootViewer.setTitle("FaST: SetUp Dealer"); 
            	 //reload store
            	 var theGrid = tab;
            	 theGrid.filters.clearFilters();
            	 var theStore = theGrid.store;
				 if (theStore.isFiltered())
					theStore.clearFilter();
            	 theStore.load();
             	}
         	}
		},*/
		{iconCls: 'tabs', xtype: 'DealerQuotaView', title: 'Quota'
			, listeners: {
	             activate: function(tab){
	            	 var rootViewer = this.up('rootViewer');
	            	 rootViewer.setTitle("FaST: Dealer Quota"); 
					 var cardLayout = tab.getLayout();
					 cardLayout.setActiveItem(0);
	            	 //reload store
	            	 var theGrid = tab.down('DealerQuotaGrid');
	            	 theGrid.filters.clearFilters();
	            	 var theStore = theGrid.store;
					 if (theStore.isFiltered())
						theStore.clearFilter();
	            	 theStore.load();
	             	}
	         	}}
		,{iconCls: 'tabs', xtype: 'BudgetView',	title: 'Budget'
			, listeners: {
	             activate: function(tab){
	            	 var rootViewer = this.up('rootViewer');
	            	 rootViewer.setTitle("FaST: Budget"); 
					 var cardLayout = tab.getLayout();
					 cardLayout.setActiveItem(0);
	            	 //reload store
	            	 var theGrid = tab.down('BudgetGrid');
	            	 //theGrid.filters.clearFilters();
	            	 var theStore = theGrid.store;
					 if (theStore.isFiltered())
						theStore.clearFilter();
	            	 theStore.load();
	             	}
	         	}
		}
		//,{iconCls: 'tabs', disabled: true, xtype: 'DealerAllocationGrid',title: 'Allocation',	id:	'dealersAllocation'}
        ];
        this.callParent(arguments);
    }
});