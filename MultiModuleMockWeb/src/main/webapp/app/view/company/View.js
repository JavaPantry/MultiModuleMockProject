Ext.define('Fast.view.company.View', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.companyView',
    id:'companyView',
    requires: [
    	//'Fast.view.company.CompanyHierarchyView'
        'Fast.view.company.CompanyUserAccessView'
        //,'Fast.view.company.CompanyAccessLevelsView'
        //,'Fast.view.company.YearForecastGrid'
        //,'Fast.view.company.DealerGroupView'
        //,'Fast.view.company.CompanyAccessLevelsEditView'
	],
    
    activeItem: 0,
    margins: '1 1 1 1',
    

    initComponent: function() {
        this.items = [	
		/*{iconCls: 'tabs', xtype: 'CompanyHierarchyView',	title: 'Hierarchy',		id:	'CompanyHierarchyView'
		, listeners: {
             activate: function(tab){
            	 var rootViewer = this.up('rootViewer');
            	 rootViewer.setTitle("Fast: Company Hierarchy"); 
            	 //reload store
            	 var theGrid = tab.down('CompanyHierarchyGrid');
            	 // there no filters theGrid.filters.clearFilters();
            	 var theStore = theGrid.store;
				 if (theStore.isFiltered())
					theStore.clearFilter();
            	 theStore.load();
				}
         	}
		},*/
		{iconCls: 'tabs', /*disabled: true,*/ xtype: 'CompanyUserAccessView',title: 'User Access',	id:	'CompanyUserAccessView'
		, listeners: {
             activate: function(tab){
            	 var rootViewer = this.up('rootViewer');
            	 rootViewer.setTitle("Fast: Company User Access"); 
            	 //reload store
            	 var theGrid = tab.down('CompanyUserSelectGrid');
            	 // there no filters theGrid.filters.clearFilters();
            	 var theStore = theGrid.store;
				 if (theStore.isFiltered())
					theStore.clearFilter();
            	 theStore.load();
				}
         	}
         }
        /*,{iconCls: 'tabs', xtype: 'CompanyAccessLevelsView',	title: 'Access Levels',		id:	'CompanyAccessLevelsView'
		, listeners: {
			activate: function(tab){
            	 var rootViewer = this.up('rootViewer');
            	 rootViewer.setTitle("Fast: Company Access Levels"); 
            	 //reload store
            	 var theGrid = tab.down('CompanyAccessLevelsGrid');
            	 // there no filters theGrid.filters.clearFilters();
            	 var theStore = theGrid.store;
				 if (theStore.isFiltered())
					theStore.clearFilter();
            	 theStore.load();
            	 
            	//TODO - <AP> switch back to first page
				var cardPanel = theGrid.up('panel');
				var cardLayout = cardPanel.getLayout();
				cardLayout.setActiveItem(0);
				}
         	}}
        ,{iconCls: 'tabs', xtype: 'YearForecastGrid',	title: 'Year Forecast'
    		, listeners: {
    			activate: function(tab){
                	 var rootViewer = this.up('rootViewer');
                	 rootViewer.setTitle("Fast: Year Forecast"); 
                	 //reload store
                	 var theGrid = tab;//.down('YearForecastGrid');
                	 // there no filters theGrid.filters.clearFilters();
                	 var theStore = theGrid.store;
    				 if (theStore.isFiltered())
    					theStore.clearFilter();
                	 theStore.load();
    				}
             	}}
        ,{iconCls: 'tabs', xtype: 'DealerGroupView',	title: 'Dealer Group'
    		, listeners: {
    			activate: function(tab){
                	 var rootViewer = this.up('rootViewer');
                	 rootViewer.setTitle("Fast: Dealer Group"); 
                	 //reload store
                	 var theGrid = tab.down('DealerGroupGrid');
                	 // there no filters theGrid.filters.clearFilters();
                	 var theStore = theGrid.store;
    				 if (theStore.isFiltered())
    					theStore.clearFilter();
                	 theStore.load();
    				}
    		}}*/
        ];
        this.callParent(arguments);
    }
});