Ext.define('Fast.view.sales.forecast.weekActuals.WeekActualsEditGrid' ,{
			extend: 'Fast.view.sales.forecast.week.WeekBaseGrid'//extend: 'Ext.grid.Panel'
		    ,id : 'WeekActualsEditGrid'
		    ,alias :'widget.WeekActualsEditGrid'
		    ,selModel: Ext.create('Ext.selection.CheckboxModel')
		    ,store: 'sales.SalesWeekActualsFctEdit'
			,plugins:[Ext.create('Ext.grid.plugin.RowEditing', { clicksToMoveEditor: 1
					,autoCancel: false
					,pluginId: 'weeklyActualsRowEditing' // to find editor by  grid.getPlugin('rowEditing').editor.form.findField('name')
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
					,getWeekOfMonth: function() {
						var d = new Date();
						var date = d.getDate();
						var day = d.getDay();
						var weekOfMonth = Math.ceil((date - 1 - day) / 7);
						return weekOfMonth;
					}
		         ,listeners: {
		        	  //'validateedit': function(editor, e) {
		        		// var editorform = this.editor.form;//why editor.form is undefined and this.editor.form works fine?!
		        		// var editedField = editorform.findField('W'+this.weekNumber);
		        		// for (var i = this.weekNumber+1; i<= 5; i++){
		        		//	 e.record.set('W'+i,editedField.value);
		        		// }
		        	 //},
		            'beforeedit': function(editor, e, eOpts) {
						var me = this;
						var theGrid = e.grid;
						var record = e.record;
						var recordYear = eval(record.get('year'));
						var recordMonth = eval(record.get('month'));

						var currentDate = new Date();
						var day = currentDate.getDate();
						var month = currentDate.getMonth();
						var year  = currentDate.getFullYear();
						var weekOfMonth = me.getWeekOfMonth();
						
						var record1stHalfField = record.get('firstHalf');
						var record2ndHalfField = record.get('secondHalf');
						var recordHalfActive = (recordMonth<6)?record1stHalfField:record2ndHalfField;
						recordHalfActive = eval(recordHalfActive);

						var currentHalf = (month<6) ? 0:1;
						var editorform = me.editor.form;
						
						me.fieldHelper(editorform,'unit', 1, 5, false);
						me.fieldHelper(editorform,'dollar', 1, 5, false);

						for(var weekIdx=0;weekIdx<5;weekIdx++){
							if(recordYear == year && recordMonth == month && weekIdx > weekOfMonth)
								continue;
							if(
									(recordYear == year && recordMonth == month && weekIdx <= weekOfMonth && recordHalfActive == true) ||
									(recordYear == year && recordMonth < month && recordHalfActive == true) ||
									(recordYear < year && recordHalfActive == true)
							  ){
								me.fieldHelper(editorform,'unit', weekIdx+1, weekIdx+1, true);
								me.fieldHelper(editorform,'dollar', weekIdx+1, weekIdx+1, true);
								}
						}//eo for weeks
		            }
		          }
			})]

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
										{text	: 'Back',		action : 'backToCurrentForecastHome',							minWidth : 80, iconCls : 'icon-prev'}
								        ,{text : 'View/Edit In Form',action : 'viewWeekForecastInFormWnd',	minWidth : 80, iconCls : 'icon-search'}
										,{text : 'Save Draft',	action : 'saveForecast',	minWidth : 80, iconCls : 'icon-save'}
										//,{text : 'Submit',		action : 'submitForecast',	minWidth : 80, iconCls : 'icon-submit'}
										]}
									,{xtype: 'pagingtoolbar', dock:'bottom'
										,store: 'sales.SalesWeekActualsFctEdit'
										,displayInfo: true
										,displayMsg: 'Displaying Week Actuals Forecaasts {0} - {1} of {2}'
										,emptyMsg: "No Weekly Actuals Forecasts to display"}];
				this.callParent(arguments);
			}
		});
