Ext.define('Fast.view.sales.forecast.monthextend.SalesForecastMonthlyViewExt', {
    extend: 'Ext.Panel',
    alias: 'widget.SalesForecastMonthlyViewExt',
	layout:'card',
	items: [{xtype:'MonthHomeGridExt'}
	        ,{xtype:'MonthEditGridExt'}
	        ,{xtype:'MonthApprovalGridExt'}
	]
   });	