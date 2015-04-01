Ext.define('Fast.view.dealers.BudgetView' ,{
    extend: 'Ext.Panel',
    alias : 'widget.BudgetView',
    columnLines: true,
    layout:'card'
    ,requires: [
    	'Fast.view.dealers.BudgetGrid'
    	,'Fast.view.dealers.BudgetDetailView'
    	,'Fast.view.dealers.BudgetDetailGrid'

	]

    ,items:[{xtype:'BudgetGrid'
 				, listeners: {
		             activate: function(tab){
		            	 var rootViewer = this.up('rootViewer');
		            	 rootViewer.setTitle("Fast: Dealer Quota");
		            	 //reload store
		            	 var theGrid = tab;
		            	 var theStore = theGrid.store;
						 if (theStore.isFiltered())
							theStore.clearFilter();
		            	 theStore.load();
						}
					}
    		}
    		,{xtype:'BudgetDetailView'}
    	]
});
