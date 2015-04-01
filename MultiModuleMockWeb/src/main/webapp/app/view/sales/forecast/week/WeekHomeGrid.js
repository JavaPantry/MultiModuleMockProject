Ext.define('Fast.view.sales.forecast.week.WeekHomeGrid' ,{
		    extend:'Fast.view.sales.forecast.ForecastTypeColoredBaseGrid'//'Fast.view.sales.forecast.week.WeekBaseGrid'
		    ,alias :'widget.WeekHomeGrid'
		    ,selModel: Ext.create('Ext.selection.CheckboxModel')
		    ,store: 'sales.SalesWeekFct'
			/*,plugins:[Ext.create('Ext.grid.plugin.RowEditing', { clicksToMoveEditor: 1
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
			})]*/  
		    ,columns: [	{text: 'oddity',hidden:true,flex:1,dataIndex:'oddity'}
				,{text: 'id',hidden:true,flex:1,dataIndex:'id'}
				,{text:'Dealer',flex:2,dataIndex:'dealerName'}	
				,{text:'SalesByAcctId',flex:1,sortable:true,dataIndex:'salesByAcctId'}
				
				,{header: 'Sales Representative',width:50,sortable : true,dataIndex : 'salesByAcct.salesPerson.userName'}
				,{header: 'Category',width:50,sortable : true,dataIndex : 'itemCategory'}
				,{header: 'Item Code',width:50,sortable : true,dataIndex : 'itemCode'}
				,{header: 'Item Name',width:100,sortable : true,dataIndex : 'salesByAcct.product.itemName'}
				,{header: 'Mgmt. Group',width:50,sortable : true,dataIndex : 'mgmtGrp'}

				,{text:'firstHalf',hidden:true,flex:1,sortable:true,dataIndex:'firstHalf'}
				,{text:'secondHalf',hidden:true,flex:1,sortable:true,dataIndex:'secondHalf'}
				,{text: 'Year',flex:1,dataIndex:'year'}
				,{text: 'Month',flex:1,dataIndex:'month'
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
            	 }	
				}

				,{text:'status', flex:1,dataIndex:'statusDescription'}
				//{text:'status', hidden:true,flex:1,dataIndex:'status'},

				,{text: 'Actual Type',flex:1,dataIndex:'actualType'
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
				,{text: 'Original',flex:1,dataIndex:'original'}
				//,{text: 'Unit1',flex:1,dataIndex:'unit1',editor:{xtype: 'numberfield'}}
				,{text: 'Dollar1',flex:1,dataIndex:'dollar1',editor:{xtype: 'numberfield'}}
				//,{text: 'Unit2',flex:1,dataIndex:'unit2',editor:{xtype: 'numberfield'}}
				,{text: 'Dollar2',flex:1,dataIndex:'dollar2',editor:{xtype: 'numberfield'}}
				//,{text: 'Unit3',flex:1,dataIndex:'unit3',editor:{xtype: 'numberfield'}}
				,{text: 'Dollar3',flex:1,dataIndex:'dollar3',editor:{xtype: 'numberfield'}}
				//,{text: 'Unit4',flex:1,dataIndex:'unit4',editor:{xtype: 'numberfield'}}
				,{text: 'Dollar4',flex:1,dataIndex:'dollar4',editor:{xtype: 'numberfield'}}
				//,{text: 'Unit5',flex:1,dataIndex:'unit5',editor:{xtype: 'numberfield'}}
				,{text: 'Dollar5',flex:1,dataIndex:'dollar5',editor:{xtype: 'numberfield'}}
				//,{text: 'Comment1',flex:1,dataIndex:'comment1',editor:{xtype: 'textfield'}},
				//,{text: 'Comment2',flex:1,dataIndex:'comment2',editor:{xtype: 'textfield'}},
				//,{text: 'Comment3',flex:1,dataIndex:'comment3',editor:{xtype: 'textfield'}},
				//,{text: 'Comment4',flex:1,dataIndex:'comment4',editor:{xtype: 'textfield'}},
				//,{text: 'Comment5',flex:1,dataIndex:'comment5',editor:{xtype: 'textfield'}},
				,{text: 'IsActive',flex:1,dataIndex:'isActive'}
				//,{text: 'IsApproved',flex:1,dataIndex:'isApproved'},
				//,{text: 'Approver',flex:1,dataIndex:'Approver'},
				//,{text: 'Comments',flex:1,dataIndex:'comments'}
				]
			,features: [{
							ftype: 'filters', encode: 'encode',
							filters: [
										{type: 'string',dataIndex:'ProductId'}
										,{type: 'string',dataIndex:'DealerId'}
										]
							}]
			,dockedItems: [{xtype: 'toolbar', dock:'top',
				items: [
				        {text : 'View In Form',	action : 'viewWeekForecastInFormWnd',	minWidth : 80, iconCls : 'icon-search'}
						//,{text : 'Select', minWidth: 80,  iconCls: 'icon-check', action:'selectWeekForecast'}
						//,{text : 'Edit', minWidth: 80, iconCls: 'icon-modify',id:'editWeekForecastBtn',hidden: true,action:'editWeekForecast'}
						//,{text : 'Approval', minWidth : 80,iconCls : 'icon-approve',action : 'gotoApproving'}
				        ]}
			,{xtype: 'pagingtoolbar', dock:'bottom'
				,store: 'sales.SalesWeekFct'
				,displayInfo: true
				,displayMsg: 'Displaying Week Forecaasts {0} - {1} of {2}'
				,emptyMsg: "No Weekly Forecasts to display"}]

			,initComponent: function() {

				this.callParent(arguments);
			}
		});
