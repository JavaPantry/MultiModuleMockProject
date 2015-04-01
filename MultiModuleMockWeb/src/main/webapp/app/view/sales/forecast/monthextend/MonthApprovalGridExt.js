var localStoreSalesMonthFctApprovalExt = (function() {
	//evernote/extjs/javascript - How to send extra parameters when loading a store to a combobox in ExtJS 4?
	var s = Ext.create('Fast.store.sales.SalesMonthFctExt');
	  s.proxy.extraParams = {
	    select: 'approval'
	  }
	  return s;}
)();


Ext.define('Fast.view.sales.forecast.monthextend.MonthApprovalGridExt',
				{	extend : 'Fast.view.sales.forecast.monthextend.MonthBaseGridExt'//extend : 'Ext.grid.Panel',
					,alias : 'widget.MonthApprovalGridExt'
					,selModel : Ext.create('Ext.selection.CheckboxModel')
					,store: localStoreSalesMonthFctApprovalExt
					,features : [
					/*
					 * ,{ ftype: 'filters', encode: 'encode', // json encode the filter query 
					 *    filters: [{type:'string',dataIndex:'ProductId'}, 
					 *				{type:'string',dataIndex:'DealerId'}] }
					 */]

					,initComponent : function() {
						this.dockedItems = [
								{	xtype : 'toolbar',dock : 'top',
									items : [ 
									          //{text	: 'Back',minWidth: 80,iconCls: 'icon-prev',action: 'backToCurrentForecastHome'}
										       //  {text : 'Approve', minWidth : 80,iconCls : 'icon-check1',action : 'approveMonthForecast',actionCommand : 'Approving'}
										       //  ,{text : 'Rework', minWidth : 80,iconCls : 'icon-return',action : 'reworkMonthForecast',actionCommand : 'ReWork'}
										         {text : 'Approve', minWidth : 80,iconCls : 'icon-check1',action : 'Approving',actionCommand : 'Approving'}
										         ,{text : 'Rework', minWidth : 80,iconCls : 'icon-return',action : 'ReWork',actionCommand : 'ReWork'}
									        ]
								},
								{	xtype : 'pagingtoolbar',dock : 'bottom'
									,store : localStoreSalesMonthFctApprovalExt
									,displayInfo : true
									,displayMsg : 'Displaying ProductByAccount {0} - {1} of {2}'
									,emptyMsg : "No ProductByAccount to display"
								} ];
						this.callParent(arguments);
						this.store.grid = this;//see use in goApproving() getForecastsForSelectedDealers(approvalGrid); 
					}
				});
