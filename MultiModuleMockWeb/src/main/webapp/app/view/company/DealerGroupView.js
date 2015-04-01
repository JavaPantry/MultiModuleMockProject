Ext.define('Fast.view.company.DealerGroupView' ,{
    extend: 'Ext.Panel',
    alias : 'widget.DealerGroupView',
    columnLines: true,
    layout:'card'
    ,requires: [
    	'Fast.view.company.DealerGroupGrid'
    	,'Fast.view.company.DealerGroupEdit'
    	,'Fast.view.company.DealerGroupDetailView'
    	,'Fast.view.company.DealerGroupDetailGrid'
    	,'Fast.view.company.DealerGroupDetailCreateWnd'
    	,'Fast.view.company.DealerGroupDetailLookupGrid'
	]

    ,items:[	{xtype:'DealerGroupGrid'
 				, listeners: {
		             activate: function(tab){
		            	 var rootViewer = this.up('rootViewer');
		            	 rootViewer.setTitle("Fast: DealerGroup"); 
		            	 //reload store
		            	 var theGrid = tab;
		            	 var theStore = theGrid.store;
						 if (theStore.isFiltered())
							theStore.clearFilter();
		            	 theStore.load();
						}
					}
    		}
    		,{xtype:'DealerGroupEdit'}
    		,{xtype:'DealerGroupDetailView'}
    	]
});
