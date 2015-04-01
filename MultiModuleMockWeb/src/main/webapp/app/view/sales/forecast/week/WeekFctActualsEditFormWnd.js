 
	Ext.define('WeekActualForecastWithCommentsModel', {
        extend: 'Ext.data.Model',
        fields: ['week','unit','dollar', 'comments']
    });


var weekActualForecastWithCommentsStore = Ext.create('Ext.data.Store', {
	storeId: 'WeekActualForecastWithCommentsStore'
	,model: 'WeekActualForecastWithCommentsModel'
    ,data: [
            {week: '1st week', unit: 1, dollar:1, comments:'comments'}
           ,{week: '2nd week', unit: 2, dollar:2, comments:'comments'}
           ,{week: '3rd week', unit: 3, dollar:3, comments:'comments'}
           ,{week: '4th week', unit: 4, dollar:4, comments:'comments'}
           ,{week: '5th week', unit: 5, dollar:5, comments:'comments'}
       ] 
});

Ext.define('Fast.view.sales.forecast.week.WeekFctActualsEditFormWnd', {
    extend: 'Ext.window.Window'
    ,alias : 'widget.WeekFctActualsEditFormWnd'
	,modal:true
    ,requires: ['Ext.form.Panel','Ext.form.field.Text']
    ,title : 'Week Forecast Details'
    ,layout: 'fit'
    ,width: 1015,height:450
    ,iconCls: 'icon-chart'
    ,items:[
			{xtype: 'panel' ,layout: 'anchor'
			,tbar:[ {iconCls: 'icon-grid',text: 'Update in grid',action: 'weekActualsUpdateInGrid'} 
					,'->',{iconCls: 'icon-cancel',itemId: 'cancel',text: 'Cancel',
							handler: function(btn){
								var wnd = btn.up('window');
								wnd.close();
							}}]
			,items:	[
						{xtype: 'fieldcontainer',anchor: '100% 20%',layout:'column'
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
									,{fieldLabel: 'Month',itemId:'month',name:'month'
										,renderer: function(value){
				                	        if (value == 0) {
				                	            return 'Jan';
				                	        }else if (value == 1) {
				                	            return 'Feb';
				                	        }else if (value == 2) {
				                	            return 'Mar';
				                	        }else if (value == 3) {
				                	            return 'Apr';
				                	        }else if (value == 4) {
				                	            return 'May';
				                	        }else if (value == 5) {
				                	            return 'Jun';
				                	        }else if (value == 6) {
				                	            return 'Jul';
				                	        }else if (value == 7) {
				                	            return 'Aug';
				                	        }else if (value == 8) {
				                	            return 'Sept';
				                	        }else if (value == 9) {
				                	            return 'Oct';
				                	        }else if (value == 10) {
				                	            return 'Nov';
				                	        }else if (value == 11) {
				                	            return 'Dec';
				                	        }
				                	        return '';
				                	 }}
									//hidden service fields to control enable/disable edit forecast values
									,{hidden:true, itemId:'record1stHalf'}
									,{hidden:true, itemId:'record2ndHalf'}
									,{hidden:true, itemId:'secondYearFirstHalf'}
									,{hidden:true, itemId:'secondYearSecondHalf'}
									,{hidden:true, itemId:'startHalf'}
									]}
								]
						}
						,{	xtype: 'grid', itemId:'valueCommentsTable', anchor: '100% 80%'
							,store:weekActualForecastWithCommentsStore
							,plugins: [//TODO - <AP> need to allow edit only current week and two months before 
							           Ext.create('Ext.grid.plugin.CellEditing', {
							        	   	clicksToEdit: 1
							        	   	,pluginId : 'weekActualForecastEditGrid' // to find editor by grid.getPlugin('rowEditingMonthEditGridExt').editor.form.findField('name')
							        	   	,getWeekOfMonth: function() {
							        	   		var d = new Date();
							        	   		var date = d.getDate();
							        	   		var day = d.getDay();
							        	   		var weekOfMonth = Math.ceil((date - 1 - day) / 7);
							        	   		return weekOfMonth;
							        	   	}
							           		,listeners :{
							           			'beforeedit' : function(editor, e, eOpts) {
							           				var me = this;
							           				var record = e.record;
													var theGrid = e.grid;
													var currentDate = new Date();
													var weekOfMonth = this.getWeekOfMonth(); 
													var month	= currentDate.getMonth();
													var year	= currentDate.getFullYear();
													
													var weekFctActualsEditFormWnd = theGrid.up('WeekFctActualsEditFormWnd');
													var yearField  = weekFctActualsEditFormWnd.down('#year');
													var recordYear = eval(yearField.getValue());
													var recordMonth = eval(weekFctActualsEditFormWnd.down('#month').getValue());
													
													var record1stHalfField = weekFctActualsEditFormWnd.down('#record1stHalf');
													var record2ndHalfField = weekFctActualsEditFormWnd.down('#record2ndHalf');
													
													if(year > recordYear || (year == recordYear && recordMonth > month))
														return false;

													var clickedWeekIdx	= e.rowIdx;
													if(recordYear == year && recordMonth == month && clickedWeekIdx > weekOfMonth)
														return false;
													
													var recordHalfActive = (recordMonth<6)?record1stHalfField:record2ndHalfField;
													recordHalfActive = eval(recordHalfActive.getValue());
													
													if(
														(recordYear == year && recordMonth == month && clickedWeekIdx <= weekOfMonth && recordHalfActive == true) ||
														(recordYear == year && recordMonth < month && recordHalfActive == true) ||
														(recordYear < year && recordHalfActive == true)
													  ){
															return true;
														}
													return false;
											}
							           }//listeners
						           })]// plugins

							,columns:[
							         {header: 'Week',locked: true,width:120,dataIndex : 'week'}
							         ,{text: 'Units', flex:1,dataIndex : 'unit',editor : {xtype : 'numberfield'}}  
							         ,{text: 'Dollars', flex:1,dataIndex : 'dollar',editor : {xtype : 'numberfield'}}
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
