Ext.define('Fast.view.sales.View', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.salesView',
    id:'salesView',
    requires: [
    	'Fast.view.sales.SalesProductByAccountGrid',
        'Fast.view.sales.SalesApprovalGrid',
        'Fast.view.sales.ForecastPanel'
         ],
    activeItem: 0,
    margins: '1 1 1 1'
    
    ,initComponent: function() {
        this.items = [	
			{xtype: 'SalesProductByAccountGrid',title:'Product By Account',
			 listeners: {
		             activate: function(tab){
		            	 var rootViewer = this.up('rootViewer');
		            	 rootViewer.setTitle("FaST: Sales -> Product By Account"); 
		            	 //reload store
		            	 var theGrid = tab;//Ext.getCmp('SalesProductByAccountGrid');
		            	 theGrid.filters.clearFilters();
		            	 var theStore = theGrid.store;
						 if (theStore.isFiltered())
							theStore.clearFilter();
		            	 theStore.load();
		             }
		         }
			}
			,{xtype: 'SalesApprovalGrid',title:'Approvals',id:'salesApproval',
			 listeners: {
		             activate: function(tab){
		            	 var rootViewer = this.up('rootViewer');
		            	 rootViewer.setTitle("Fast: Sales -> Product by Account Approval"); 
		            	 //reload store
		            	 var theGrid = tab;//Ext.getCmp('SalesApprovalGrid');
		            	 theGrid.filters.clearFilters();
		            	 var theStore = theGrid.store;
						 if (theStore.isFiltered())
							theStore.clearFilter();
		            	 theStore.load();
		             }
		         }
			}
			,{xtype: 'ForecastPanel', title: 'Forecast'
				,listeners: {
		            activate: function(tab){
						var rootViewer = this.up('rootViewer');
						rootViewer.setTitle("Fast: Sales -> Forecast"); 
						//set first page with dealers lookup
						var forecastPanel = tab;
						forecastPanel.getLayout().setActiveItem(0);
						
						var theDealersGrid					= forecastPanel.down('SalesForecastDealersGrid');
						var theSalesForecastMonthlyViewExt	= forecastPanel.down('SalesForecastMonthlyViewExt');
						var theSalesForecastWeeklyView		= forecastPanel.down('SalesForecastWeeklyView');
						var theSalesForecastWeekActualsView	= forecastPanel.down('SalesForecastWeekActualsView');
						
						theSalesForecastMonthlyViewExt.setDisabled(true);
						theSalesForecastWeeklyView.setDisabled(true);
						theSalesForecastWeekActualsView.setDisabled(true);
						
						//reload store
						theDealersGrid.getSelectionModel().deselectAll(true);//True to suppress any deselect events
						//theGrid.filters.clearFilters();
						var theStore = theDealersGrid.store;
						if (theStore.isFiltered())
							theStore.clearFilter();
						theStore.load();
		            }
		        }
			}
			];
    this.callParent(arguments);
    }
});