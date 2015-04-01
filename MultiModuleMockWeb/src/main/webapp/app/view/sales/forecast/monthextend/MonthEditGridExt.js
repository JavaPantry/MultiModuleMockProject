Ext.define('Fast.view.sales.forecast.monthextend.MonthEditGridExt',
				{	extend : 'Fast.view.sales.forecast.monthextend.MonthBaseGridExt'//extend : 'Ext.grid.Panel',
					,alias : 'widget.MonthEditGridExt'
					,selModel : Ext.create('Ext.selection.CheckboxModel')
					,store : 'sales.SalesMonthFctEditExt'//same as 'Fast.store.sales.SalesMonthFctExt'
					//@see ExtJS\"extjs4 - ExtJS extend grid RowEditor plugin (to edit array) - Stack Overflow" in EverNote
					,plugins : [ Ext.create('Ext.grid.plugin.RowEditing',{
										clicksToMoveEditor : 1,
										autoCancel : false,
										pluginId : 'rowEditingMonthEditGridExt' // to find editor by grid.getPlugin('rowEditingMonthEditGridExt').editor.form.findField('name')
										,fieldHelper : function(editorform,fieldPrefix, start, end,enableFlag) {
											for ( var i = start; i <= end; i++) {
												var field = editorform.findField(fieldPrefix + i)
												if (enableFlag)
													field.enable();
												else
													field.disable();
											}
										}
										,listeners : {//MonthEditGridExt.js
											'beforeedit' : function(editor, e, eOpts) {
												var me = this;
												var theGrid = e.grid;
												var prefix = 'CF';
												var currentDate = new Date();
												// month is zero-based
												var month	= currentDate.getMonth();
												var year	= currentDate.getFullYear();
												var record = e.record;
												// disable all month fields in year
												var editorform = me.editor.form;
												// Client side editability based on current status
												var status = record.data.statusType.data.id;
												if (!(status == 2|| status == 6 || status == 5)) {
													Ext.MessageBox.show({
																title : 'Warning:',
																msg : 'You can\'t edit forecast with : '
																		+ record.get('statusDescription') + ' status',
																icon : Ext.MessageBox.ERROR,
																buttons : Ext.Msg.OK
															});
													return false;
												}
												me.fieldHelper(editorform,prefix, 1, 18, false);
												
												// Client side editability based on current date
												var record1stHalf	= record.get('firstHalf');
												var record2ndHalf	= record.get('secondHalf');
												var secondYearFirstHalf	= record.get('secondYearFirstHalf');
 												var secondYearSecondHalf= record.get('secondYearSecondHalf');

												var startYear		= record.get('year');
												var startHalf		= record.get('startHalf');
												var startMonth		= startHalf*6; 
												for(var currentScreenMonth = 0; currentScreenMonth < 18; currentScreenMonth++){
													if(startYear == year && startMonth >= month){
														me.fieldHelper(editorform,prefix, currentScreenMonth+1, currentScreenMonth+1, true);
													}else if (startYear > year && startMonth<6 && secondYearFirstHalf){
														me.fieldHelper(editorform,prefix, currentScreenMonth+1, currentScreenMonth+1, true);
													}else if (startYear > year && startMonth>5 && secondYearSecondHalf){
														me.fieldHelper(editorform,prefix, currentScreenMonth+1, currentScreenMonth+1, true);
													}
													startMonth++;
													if(startMonth>11){
														startYear++;
														startMonth = 0;
													}
												}
											}
										}
									}) ]// pugins

					,initComponent : function() {
						this.dockedItems = [
								{	xtype : 'toolbar',dock : 'top',
									items : [
									         {text	: 'Back',			action : 'backToCurrentForecastHome', minWidth : 80, iconCls : 'icon-prev'}
									         ,{text : 'Edit In Form',	action : 'editMonthForecastExtInFormWnd',	minWidth : 80, iconCls : 'icon-modify'}
									         ,{text : 'Save Draft', 	action : 'saveForecast',		minWidth : 80, iconCls : 'icon-save'}
									         ,{text : 'Submit',			action : 'submitForecast',	minWidth : 80, iconCls : 'icon-submit'}
									        ]
								}
								,{	xtype : 'pagingtoolbar',dock : 'bottom'
									,store : 'sales.SalesMonthFctEditExt'
									,displayInfo : true
									,displayMsg : 'Displaying ProductByAccount {0} - {1} of {2}'
									,emptyMsg : "No ProductByAccount to display"
								} ];
						this.callParent(arguments);
						this.store.grid = this;//see use in SalesMonthFctEditExt:updateHeader
					}
				});
