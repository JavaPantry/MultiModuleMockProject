Ext.define('Fast.view.sales.forecast.monthextend.MonthBaseGridExt',
				{	extend : 'Fast.view.sales.forecast.ForecastTypeColoredBaseGrid'
					
				    ,features: [{
						ftype: 'filters', encode: 'encode', // json encode the filter query
						filters: [{type: 'string',dataIndex:'dealerName'}
						          ,{type: 'string',dataIndex:'salesByAcctId'}
						          //,{type: 'string',dataIndex:'salesPerson'}
						          ,{type: 'string',dataIndex:'salesByAcct.salesPerson.userName'}
						          
						          ,{type: 'string',dataIndex:'itemCategory'}
						          
						          ,{type: 'string',dataIndex:'itemCode'}
						          ,{type: 'string',dataIndex:'salesByAcct.product.itemName'}
						]
					}]

					
					,columns : [ {header: 'Dealer',locked: true, width:100,dataIndex : 'dealerName'}
								//,{header: 'id',hidden : true,dataIndex : 'id'}
								,{header: 'SalesByAcctId',locked: true,width:50,sortable : true,dataIndex : 'salesByAcctId'}

								//>,{header: 'Sales Representative',locked: true,width:50,sortable : true,dataIndex : 'salesPerson'}
								,{header: 'Sales Representative',locked: true,width:50,sortable : true,dataIndex : 'salesByAcct.salesPerson.userName'}
								
								,{header: 'Category',locked: true,width:50,sortable : true,dataIndex : 'itemCategory'}
								,{header: 'Item Code',locked: true,width:50,sortable : true,dataIndex : 'itemCode'}

								//>,{header: 'Item Name',locked: true,width:100,sortable : true,dataIndex : 'itemName'}
								,{header: 'Item Name',locked: true,width:100,sortable : true,dataIndex : 'salesByAcct.product.itemName'}
								
								,{header: 'Mgmt. Group',locked: true,width:50,sortable : true,dataIndex : 'mgmtGrp'}
								
								//>,{header: 'firstHalf',hidden : true,flex : 1,sortable : true,dataIndex : 'firstHalf'}
								//>,{header: 'secondHalf',hidden : true,flex : 1,sortable : true,dataIndex : 'secondHalf'}
								//>,{header: 'year',locked: true,flex : 1,sortable : true,dataIndex : 'year'}
								,{header: 'Actual Type',locked: true,width:50,dataIndex : 'actualType'
									,renderer:function(value) {
									    if (value === 'R') {
									        return 'Forecast';
									    }else if (value === 'P') {
									        return 'Purchased';
									    }else if (value === 'FT') {
									        return 'Fct Sell Through';
									    }else if (value === 'T') {
									        return 'Sell Through';
									    }else if (value === 'H') {
									        return 'On Hands';
									    }
									}//actualTypeRenderer
								}
								,{header: 'status',locked: true,width:50,dataIndex : 'statusDescription'}
								//>,{header: 'status',locked: true,hidden : true,flex : 1,dataIndex : 'status'}
								//>,{header: 'isActive',locked: true,flex : 1,xtype : 'checkcolumn',dataIndex : 'isActive'}
								//>,{header: 'isApproved',locked: true,flex : 1,xtype : 'checkcolumn',dataIndex : 'isApproved'}
								//>,{header: 'Approver',locked: true,hidden : true,flex : 1,dataIndex : 'approver'}

								// column's fastItemId:'#/##' for header text access see onLoad handler in store
								,{text: 'Jan', width:50,fastItemId:'0/0', dataIndex : 'CF1',editor : {xtype : 'numberfield'}}
								//,{text: 'Comment1',hidden : true, dataIndex : 'comment1'}

								,{text: 'Feb', width:50,fastItemId:'0/1', dataIndex : 'CF2',editor : {xtype : 'numberfield'}}
								//,{text: 'Comment2',hidden : true, dataIndex : 'comment2'}
								
								,{text: 'Mar', width:50,fastItemId:'0/2', dataIndex : 'CF3',editor : {xtype : 'numberfield'}}
								//,{text: 'Comment3',hidden : true, dataIndex : 'comment3'}
								
								,{text: 'Apr', width:50,fastItemId:'0/3', dataIndex : 'CF4',editor : {xtype : 'numberfield'}}
								//,{text: 'Comment4',hidden : true, dataIndex : 'comment4'}
								
								,{text: 'May', width:50,fastItemId:'0/4', dataIndex : 'CF5',editor : {xtype : 'numberfield'}}
								//,{text: 'Comment5',hidden : true, dataIndex : 'comment5'}
								
								,{text: 'Jun', width:50,fastItemId:'0/5', dataIndex : 'CF6',editor : {xtype : 'numberfield'}}
								//,{text: 'Comment6',hidden : true, dataIndex : 'comment6'}
								
								,{text: 'Jul', width:50,fastItemId:'0/6', dataIndex : 'CF7',editor : {xtype : 'numberfield'}}
								//,{text: 'Comment7',hidden : true, dataIndex : 'comment7'}
								
								,{text: 'Aug', width:50,fastItemId:'0/7', dataIndex : 'CF8',editor : {xtype : 'numberfield'}}
								//,{text: 'Comment8',hidden : true, dataIndex : 'comment8'}
								
								,{text: 'Sept', width:50,fastItemId:'0/8', dataIndex : 'CF9',editor : {xtype : 'numberfield'}}
								//,{text: 'Comment9',hidden : true, dataIndex : 'comment9'}
								
								,{text: 'Oct', width:50,fastItemId:'0/9', dataIndex : 'CF10',editor : {xtype : 'numberfield'}}
								//,{text: 'Comment10',hidden : true, dataIndex : 'comment10'}
								
								,{text: 'Nov', width:50,fastItemId:'0/10', dataIndex : 'CF11',editor : {xtype : 'numberfield'}}
								//,{text: 'Comment11',hidden : true, dataIndex : 'comment11'}
								
								,{text: 'Dec', width:50,fastItemId:'0/11', dataIndex : 'CF12',editor : {xtype : 'numberfield'}}
								//,{text: 'Comment12',hidden : true, dataIndex : 'comment12'}

								,{text: 'Jan', width:50,fastItemId:'0/12', dataIndex : 'CF13',editor : {xtype : 'numberfield'}}
								//,{text: 'Comment13', hidden : true, dataIndex : 'comment13'}

								,{text: 'Feb', width:50,fastItemId:'0/13', dataIndex : 'CF14',editor : {xtype : 'numberfield'}}
								//,{text: 'Comment14', hidden : true, dataIndex : 'comment14'}
								
								,{text: 'Mar', width:50,fastItemId:'0/14', dataIndex : 'CF15',editor : {xtype : 'numberfield'}}
								//,{text: 'Comment15',hidden : true, dataIndex : 'comment15'}
								
								,{text: 'Apr', width:50,fastItemId:'0/15', dataIndex : 'CF16',editor : {xtype : 'numberfield'}}
								//,{text: 'Comment16',hidden : true, dataIndex : 'comment16'}
								
								,{text: 'May', width:50,fastItemId:'0/16', dataIndex : 'CF17',editor : {xtype : 'numberfield'}}
								//,{text: 'Comment17',hidden : true, dataIndex : 'comment17'}
								
								,{text: 'Jun', width:50,fastItemId:'0/17', dataIndex : 'CF18',editor : {xtype : 'numberfield'}}
								//,{text: 'Comment18',hidden : true, dataIndex : 'comment18'}
								
								//,{header: 'Comments',flex : 1, dataIndex : 'comments'} 
							]

								
				});
