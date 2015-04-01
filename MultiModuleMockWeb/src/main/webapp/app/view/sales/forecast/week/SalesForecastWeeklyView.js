Ext.define('Fast.view.sales.forecast.week.SalesForecastWeeklyView', {
    extend: 'Ext.Panel',
    alias: 'widget.SalesForecastWeeklyView',
	layout:'card',  
	items: [{xtype:'WeekHomeGrid'}
	        ,{xtype:'WeekEditGrid'}
	        ,{xtype:'WeekApprovalGrid'}
	]
   });