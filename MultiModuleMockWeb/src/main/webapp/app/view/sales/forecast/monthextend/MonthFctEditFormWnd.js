 
	Ext.define('ForecastWithCommentsModel', {
        extend: 'Ext.data.Model',
        fields: ['month','CF', 'comments']
    });


var forecastWithCommentsStore = Ext.create('Ext.data.Store', {
	storeId: 'ForecastWithCommentsStore'
	,model: 'ForecastWithCommentsModel'
    ,data: [
           {month: 'month/year',   CF: 0, comments:''}
           ,{month: 'month/year',   CF: 0, comments:''}
           ,{month: 'month/year',   CF: 0, comments:''}
           ,{month: 'month/year',   CF: 0, comments:''}
           ,{month: 'month/year',   CF: 0, comments:''}
           ,{month: 'month/year',   CF: 0, comments:''}

           ,{month: 'month/year',   CF: 0, comments:''}
           ,{month: 'month/year',   CF: 0, comments:''}
           ,{month: 'month/year',   CF: 0, comments:''}
           ,{month: 'month/year',   CF: 0, comments:''}
           ,{month: 'month/year',   CF: 0, comments:''}
           ,{month: 'month/year',   CF: 0, comments:''}

           ,{month: 'month/year',   CF: 0, comments:''}
           ,{month: 'month/year',   CF: 0, comments:''}
           ,{month: 'month/year',   CF: 0, comments:''}
           ,{month: 'month/year',   CF: 0, comments:''}
           ,{month: 'month/year',   CF: 0, comments:''}
           ,{month: 'month/year',   CF: 0, comments:''}
       ] 
});

Ext.define('Fast.view.sales.forecast.monthextend.MonthFctEditFormWnd', {
    extend: 'Ext.window.Window'
    ,alias : 'widget.MonthFctEditFormWnd'
	,modal:true
    ,requires: ['Ext.form.Panel','Ext.form.field.Text']
    ,title : 'Monthly Forecast Details'
    ,layout: 'fit'
    ,width: 1015,height:650
    ,iconCls: 'icon-chart'
    //edited record
    ,record:null
    
    ,listeners:{
        destroy:function(win){
        }
    }

    ,items:[
			{xtype: 'panel' ,layout: 'anchor'
			,tbar:[ {iconCls: 'icon-grid',text: 'Update in grid',action: 'monthUpdateInGrid'}
					,'->',{iconCls: 'icon-cancel',itemId: 'cancel',text: 'Cancel',
							handler: function(btn){
								var wnd = btn.up('window');
								wnd.close();
							}}]
			,items:	[
						{xtype: 'fieldcontainer',anchor: '100% 13%',layout:'column'
						//,defaults: {xtype: 'displayfield',margin:'5',labelPad:2,labelCls:'fast-label',labelWidth:100}
						,items: [
								{xtype:'container', columnWidth: 1/3//,padding: '5 0 5 5'
									,defaults: {xtype: 'displayfield',margin:'1',labelPad:2,labelCls:'fast-label',labelWidth:100}
									,items:[
									{fieldLabel: 'Dealer Name',itemId:'dealerName',name:'dealerName'}
									,{fieldLabel: 'Sales Person',itemId:'salesPerson',name:'salesByAcct.salesPerson.userName'}
									,{fieldLabel: 'Management Group',itemId:'mgmtGrp',name:'mgmtGrp'}
									]}
								,{xtype:'container', columnWidth: 1/3//,padding: '5 0 5 5'
									,defaults: {xtype: 'displayfield',margin:'1',labelPad:2,labelCls:'fast-label',labelWidth:100}
									,items:[
									{fieldLabel: 'Item Category',itemId:'itemCategory',name:'itemCategory'}
									,{fieldLabel: 'Item Code',itemId:'itemCode',name:'itemCode'}
									,{fieldLabel: 'Item Name',itemId:'itemName',name:'salesByAcct.product.itemName'}
									]}
								,{xtype:'container', columnWidth: 1/3//,padding: '5 0 5 5'
									,defaults: {xtype: 'displayfield',margin:'1',labelPad:2,labelCls:'fast-label',labelWidth:100}
									,items:[
									,{fieldLabel: 'Status',itemId:'statusDescription',name:'statusDescription'}
									,{fieldLabel: 'Year',itemId:'year',name:'year'}
									//hidden service fields to control enable/disable edit forecast values
									,{hidden:true, itemId:'record1stHalf'}
									,{hidden:true, itemId:'record2ndHalf'}
									,{hidden:true, itemId:'secondYearFirstHalf'}
									,{hidden:true, itemId:'secondYearSecondHalf'}
									,{hidden:true, itemId:'startHalf'}
									]}
								]
						}
						,{	xtype: 'grid', itemId:'valueCommentsTable', anchor: '100% 87%'
							,store: forecastWithCommentsStore
							,plugins: [
							           Ext.create('Ext.grid.plugin.CellEditing', {
							        	   	clicksToEdit: 1
							        	   	,pluginId : 'forecastFullEditGridExt' // to find editor by grid.getPlugin('rowEditingMonthEditGridExt').editor.form.findField('name')
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
							           				var record = e.record;
													var theGrid = e.grid;
													var currentDate = new Date();
													// month is zero-based
													var month	= currentDate.getMonth();
													var year	= currentDate.getFullYear();
													
													var monthFctEditFormWnd = theGrid.up('MonthFctEditFormWnd');
													
													var record1stHalfField = monthFctEditFormWnd.down('#record1stHalf');
													var record2ndHalfField = monthFctEditFormWnd.down('#record2ndHalf');
													var secondYearFirstHalfField = monthFctEditFormWnd.down('#secondYearFirstHalf');
													var secondYearSecondHalfField = monthFctEditFormWnd.down('#secondYearSecondHalf');
													var startHalfField = monthFctEditFormWnd.down('#startHalf');
													var yearField = monthFctEditFormWnd.down('#year');
													
													
													var year1stHalf = (record1stHalfField.getValue() == 'true')?true:false;
													var year2ndHalf = (record2ndHalfField.getValue() == 'true')?true:false;

													var secondYear1stHalf = (secondYearFirstHalfField.getValue() == 'true')?true:false;
													var secondYear2ndHalf = (secondYearSecondHalfField.getValue() == 'true')?true:false;
													
													var recordYear	= eval(yearField.getValue());
													var startHalf	= eval(startHalfField.getValue());
													var startMonth	= startHalf*6;
													var clickedIdx	= e.rowIdx;
													
													if(year>recordYear){
														month +=12;
													}
													month -= startMonth;
													
													
													var currentHalf;
													var clickedMonthIdx = clickedIdx - startMonth;  
													if(clickedMonthIdx<6){
														if(startHalf==0)
															currentHalf = year1stHalf;
														else
															currentHalf = year2ndHalf;
													}
													if(clickedMonthIdx>5 && clickedMonthIdx<12){
														if(startHalf==0)
															currentHalf = year2ndHalf;
														else
															currentHalf = secondYear1stHalf;
													}
													if(clickedMonthIdx>11 && clickedMonthIdx<18){
														if(startHalf==0)
															currentHalf = secondYear1stHalf;
														else
															currentHalf = secondYear2ndHalf;
													}	
													if(clickedIdx < month || currentHalf == false ){
														return false;
													}
											}
							           }//listeners

							           })]// plugins
							,columns:[
							         {header: 'Month',locked: true,width:120,dataIndex : 'month'}
							         ,{text: 'Value', flex:1,dataIndex : 'CF',editor : {xtype : 'numberfield'}}
							         ,{text: 'Comments', flex:9,dataIndex : 'comments',editor : {xtype : 'textfield'}}
							]
						}
						
					]
			}
	]
    
    ,initComponent: function() {
		 this.callParent(arguments);
    }
});
