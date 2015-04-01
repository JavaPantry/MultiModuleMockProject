Ext.define('Fast.view.sales.forecast.week.WeekApprovalGrid' ,{
			extend:'Fast.view.sales.forecast.week.WeekBaseGrid'//extend:'Ext.grid.Panel'
		    ,id : 'WeekApprovalGrid'
		    ,alias :'widget.WeekApprovalGrid'
		    ,selModel: Ext.create('Ext.selection.CheckboxModel')
		    ,store: 'sales.SalesWeekFct'
			,plugins:[Ext.create('Ext.grid.plugin.RowEditing', { clicksToMoveEditor: 1
					,autoCancel: false
					,pluginId: 'rowEditing' // to find editor by  grid.getPlugin('rowEditing').editor.form.findField('name')
					,weekNumber:0	
					,fieldHelper:function(editorform,fieldPrefix, start, end, enableFlag){
						for(var i = start;i<=end;i++){
							var field = editorform.findField(fieldPrefix+i);
							if (enableFlag)
									field.enable();
								else
									field.disable();
						}
					}
			})
		]  

		    ,features: [{
						ftype: 'filters', encode: 'encode',
						filters: [
									{type: 'string',dataIndex:'ProductId'}
									,{type: 'string',dataIndex:'DealerId'}
									]
						}]

			,initComponent: function() {
				this.dockedItems = [{xtype: 'toolbar', dock:'top',
										items: [
												{text	: 'Back',minWidth: 80,iconCls: 'icon-prev',action: 'backToCurrentForecastHome'}
												,{text : 'Approve', minWidth : 80,iconCls : 'icon-check1',action : 'approveWeekForecast',actionCommand : 'Approving'}
												,{text : 'Rework', minWidth : 80,iconCls : 'icon-return',action : 'reworkWeekForecast',actionCommand : 'ReWork'}
										        ]}
									,{xtype: 'pagingtoolbar', dock:'bottom'
										,store: 'sales.SalesWeekFct'
										,displayInfo: true
										,displayMsg: 'Displaying ProductByAccount {0} - {1} of {2}'
										,emptyMsg: "No Weekly Forecasts to display"}];
				this.callParent(arguments);
			}
		});
