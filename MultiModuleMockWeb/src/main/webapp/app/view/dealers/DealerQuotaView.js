Ext.define('Fast.view.dealers.DealerQuotaView' ,{
    extend: 'Ext.Panel',
    alias : 'widget.DealerQuotaView',
    columnLines: true,
    layout:'card'
    ,requires: [
    	'Fast.view.dealers.DealerQuotaGrid'
    	,'Fast.view.dealers.DealerQuotaDetailView'
    	,'Fast.view.dealers.DealerQuotaDetailGrid'
    	
	]

    ,items:[{xtype:'DealerQuotaGrid'
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
    		,{xtype:'DealerQuotaDetailView'}
    	]
});
