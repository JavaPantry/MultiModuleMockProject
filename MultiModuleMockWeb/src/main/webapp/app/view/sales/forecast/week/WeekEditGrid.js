Ext.define('Fast.view.sales.forecast.week.WeekEditGrid' ,{
	extend:'Fast.view.sales.forecast.week.WeekBaseGrid'//extend:'Ext.grid.Panel'
		    ,id : 'WeekEditGrid'
		    ,alias :'widget.WeekEditGrid'
		    ,selModel: Ext.create('Ext.selection.CheckboxModel')
		    ,store: 'sales.SalesWeekFctEdit'

		    /*,features: [{
						ftype: 'filters', encode: 'encode',
						filters: [
									{type: 'string',dataIndex:'ProductId'}
									,{type: 'string',dataIndex:'DealerId'}
									]
						}]*/

			,initComponent: function() {
				this.dockedItems = [{xtype: 'toolbar', dock:'top',
										items: [
												{text  : 'Back',		action : 'backToCurrentForecastHome',							minWidth : 80, iconCls : 'icon-prev'}
												//,{text : 'Save Draft',	action : 'saveForecast',	minWidth : 80, iconCls : 'icon-save'}
												//,{text : 'Submit',		action : 'submitForecast',	minWidth : 80, iconCls : 'icon-submit'}
										       ]} 
									,{xtype: 'pagingtoolbar', dock:'bottom'
										,store: 'sales.SalesWeekFct'
										,displayInfo: true
										,displayMsg: 'Displaying ProductByAccount {0} - {1} of {2}'
										,emptyMsg: "No Weekly Forecasts to display"}];
				this.callParent(arguments);
			}
		});
