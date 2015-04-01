Ext.define('Fast.view.sales.forecast.weekActuals.SalesForecastWeekActualsView', {
    extend: 'Ext.Panel',
    alias: 'widget.SalesForecastWeekActualsView',
	layout:'card',
	items: [{xtype:'WeekActualsHomeGrid'}
	        ,{xtype:'WeekActualsEditGrid'}
	        ,{xtype:'WeekActualsApprovalGrid'}
	]
   });