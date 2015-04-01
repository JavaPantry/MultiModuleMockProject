Ext.define('Fast.view.company.CompanyHierarchyView' ,{
    extend: 'Ext.Panel',
    alias : 'widget.CompanyHierarchyView',
    iconCls: 'icon-grid',
    columnLines: true,
    //title : 'Company Hierarchy CIG Admin',
    layout:'card',
    
    requires: [
		    'Fast.view.company.CompanyHierarchyGrid'
		    ,'Fast.view.company.Level1Grid'
		    ,'Fast.view.company.Level2Grid'
		    ,'Fast.view.company.ManagerGrpGrid'
		    ],
    
    items:[	{xtype:'CompanyHierarchyGrid'
 				, listeners: {
		             activate: function(tab){
		            	 var rootViewer = this.up('rootViewer');
		            	 rootViewer.setTitle("Fast: Company Hierarchy"); 
		            	 //reload store
		            	 var theGrid = tab;//Ext.getCmp('CompanyHierarchyGrid');
		            	 var theStore = theGrid.store;
						 if (theStore.isFiltered())
							theStore.clearFilter();
		            	 theStore.load();
						}
         	}
    		}
    		,{xtype:'Level1Grid'
 				, listeners: {
		             activate: function(tab){
		            	 var rootViewer = this.up('rootViewer');
		            	 rootViewer.setTitle("Fast: Company Hierarchy Level 1"); 
		            	 //reload store
		            	 var theGrid = Ext.getCmp('Level1Grid');
		            	 var theStore = theGrid.store;
						 if (theStore.isFiltered())
							theStore.clearFilter();
		            	 theStore.load();
						}
    		}
    		}
    		,{xtype:'Level2Grid'
 				, listeners: {
		             activate: function(tab){
		            	 var rootViewer = this.up('rootViewer');
		            	 rootViewer.setTitle("Fast: Company Hierarchy Level 2"); 
		            	 //reload store
		            	 var theGrid = Ext.getCmp('Level2Grid');
		            	 var theStore = theGrid.store;
						 if (theStore.isFiltered())
							theStore.clearFilter();
		            	 theStore.load();
						}
    		}
    		}
    		,{xtype:'ManagerGrpGrid'
 				, listeners: {
		             activate: function(tab){
		            	 var rootViewer = this.up('rootViewer');
		            	 rootViewer.setTitle("Fast: Company Manager Group"); 
		            	 //reload store
		            	 var theGrid = Ext.getCmp('ManagerGrpGrid');
		            	 var theStore = theGrid.store;
						 if (theStore.isFiltered())
							theStore.clearFilter();
		            	 theStore.load();
						}
    		}
    		}
    	]
});
