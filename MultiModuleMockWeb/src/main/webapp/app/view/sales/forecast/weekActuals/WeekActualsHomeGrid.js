Ext.define('Fast.view.sales.forecast.weekActuals.WeekActualsHomeGrid' ,{
		    extend: 'Fast.view.sales.forecast.week.WeekBaseGrid'//extend: 'Ext.grid.Panel'
		    ,alias :'widget.WeekActualsHomeGrid'
		    ,selModel: Ext.create('Ext.selection.CheckboxModel')
		    ,store: 'sales.SalesWeekActualsFct'

		    ,features: [{
						ftype: 'filters', encode: 'encode',
						filters: [
									{type: 'string',dataIndex:'ProductId'}
									,{type: 'string',dataIndex:'DealerId'}
									]
						}]
			,dockedItems: [{xtype: 'toolbar', dock:'top',
							items: [
									{text : 'Select', minWidth: 80,  iconCls: 'icon-check', action:'selectWeekActualsForecast'}
									,{text : 'Edit', minWidth: 80, iconCls: 'icon-modify',itemId:'editWeekActualsForecastBtn',hidden: true,action:'editWeekActualsForecast'}
									//,{text : 'Approval', minWidth : 80,iconCls : 'icon-approve',action : 'gotoApproving'}
							        ]}
							,{xtype: 'pagingtoolbar', dock:'bottom'
								,store: 'sales.SalesWeekActualsFct'
								,displayInfo: true
								,displayMsg: 'Displaying Week Actuals Forecaasts {0} - {1} of {2}'
								,emptyMsg: "No Weekly Actuals Forecasts to display"
								//TODO - <AP> need to handle refresh from pagingtoolbar in all  forecast home grids  
								/*,doRefresh: function(){//http://stackoverflow.com/questions/13839444/how-to-override-refresh-action-in-pagingtoolbar
									var me = this, current = me.store.currentPage;
									if (me.fireEvent('beforechange', me, current) !== false) {
									     me.store.loadPage(current);
									}
								}*/
							}
							]
			,initComponent: function() {
				this.callParent(arguments);
			}
		});
