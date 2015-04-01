/*Ext.define("forecastSpanModel", {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'ajax',
        url : 'json/SalesMonthFctController?m=getForecastTimeSpan',
        reader: {
            type: 'json'
            ,root: 'data'
            //,totalProperty: 'totalCount'
        }
    },

    fields: [
        {name: 'offsetCode', mapping: 'offsetCode'},
        {name: 'offsetDescription', mapping: 'offsetDescription'}
    ]
});

var forecastSpanStore = Ext.create('Ext.data.Store', {
    //pageSize: 10,
	autoLoad: true
    ,model:'forecastSpanModel'
});
*/

var forecastSpanStore = new Ext.data.JsonStore({
	autoLoad: true,
	proxy: {
			type: 'ajax',
			api: {
			 read : 'json/SalesMonthFctController?m=getForecastTimeSpan' 
			},
	reader: {
			type: 'json',
			root: 'data',//'select',
			successProperty: 'success'
			}
	},
	fields: [ 'offsetCode','offsetDescription']
});


Ext.define('Fast.view.sales.forecast.monthextend.MonthHomeGridExt',
				{	extend : 'Fast.view.sales.forecast.monthextend.MonthBaseGridExt'//extend : 'Ext.grid.Panel'
					,alias : 'widget.MonthHomeGridExt'
					,selModel : Ext.create('Ext.selection.CheckboxModel')
					,store : 'sales.SalesMonthFctExt'

 				,initComponent : function() {
						this.dockedItems = [
								{	xtype : 'toolbar',dock : 'top',
									items : [
									          {text : 'Select', minWidth: 80,  iconCls: 'icon-check', action:'selectMonthForecastExt'}
									         ,{text : 'Edit', minWidth: 80, iconCls: 'icon-modify',itemId:'editMonthForecastExtBtn',hidden: true,action:'editMonthForecastExt'}
									         //,{text : 'Approval', minWidth : 80,iconCls : 'icon-approve',action : 'gotoApproving'}
									         ,{fieldLabel:'Forecast offset:'
									        	,editable: false
									        	,xtype: 'combo'
									        	,itemId: 'forecastOffsetCBox'
									        	,store: forecastSpanStore
							                    ,displayField: 'offsetDescription'
							                    ,valueField: 'offsetCode'
									         	,value: '0'
									         	}
									        ]
								},
								{	xtype : 'pagingtoolbar',dock : 'bottom'
									,store : 'sales.SalesMonthFctExt'
									,displayInfo : true
									,displayMsg : 'Displaying ProductByAccount {0} - {1} of {2}'
									,emptyMsg : "No ProductByAccount to display"
								} ];
						this.callParent(arguments);
						this.store.grid = this;//see use in SalesMonthFctExt:load
					}
				});
