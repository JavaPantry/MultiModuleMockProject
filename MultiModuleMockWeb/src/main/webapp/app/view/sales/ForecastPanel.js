Ext.define('Fast.view.sales.ForecastPanel' ,{
    extend: 'Ext.tab.Panel',
    alias : 'widget.ForecastPanel',
    iconCls: 'icon-grid',
	requires: [
				'Fast.view.sales.SalesForecastDealersGrid'
				,'Fast.view.sales.forecast.monthextend.SalesForecastMonthlyViewExt'
				,'Fast.view.sales.forecast.monthextend.MonthHomeGridExt'
				,'Fast.view.sales.forecast.monthextend.MonthEditGridExt'
				,'Fast.view.sales.forecast.monthextend.MonthApprovalGridExt'

				,'Fast.view.sales.forecast.week.SalesForecastWeeklyView'
				,'Fast.view.sales.forecast.week.WeekHomeGrid'
				,'Fast.view.sales.forecast.week.WeekEditGrid'
				,'Fast.view.sales.forecast.week.WeekApprovalGrid'				
				
				,'Fast.view.sales.forecast.weekActuals.SalesForecastWeekActualsView'
				,'Fast.view.sales.forecast.weekActuals.WeekActualsHomeGrid'
				,'Fast.view.sales.forecast.weekActuals.WeekActualsEditGrid'
				,'Fast.view.sales.forecast.weekActuals.WeekActualsApprovalGrid'
				
				,'Fast.view.sales.UploadReviewActualsGrid'
				],

    items:[	
           	{xtype:'SalesForecastDealersGrid', title:'Forecast by Dealers', iconCls: 'icon-grid'}
           	,{xtype:'UploadReviewActualsGrid', title:'Upload/Review Actuals forecasts', iconCls: 'icon-grid'}
           	,{xtype:'MonthApprovalGridExt', title:'Monthly Forecasts for approval', iconCls: 'icon-grid'}
		    ,{xtype:'SalesForecastMonthlyViewExt', title:'Ext Monthly Forecasts', iconCls: 'icon-grid'}
		    ,{xtype:'SalesForecastWeeklyView', title:'Weekly Forecasts', iconCls: 'icon-grid'}
		    ,{xtype:'SalesForecastWeekActualsView', title:'Weekly Actual Forecasts', iconCls: 'icon-grid'}
    		],

initComponent: function() {
	this.dockedItems = [];
	this.callParent(arguments);
}

});