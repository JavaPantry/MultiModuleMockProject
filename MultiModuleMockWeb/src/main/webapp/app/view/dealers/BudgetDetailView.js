Ext.define('Fast.view.dealers.BudgetDetailView' ,{
    extend: 'Ext.Panel',
    alias : 'widget.BudgetDetailView',
    layout: 'anchor',

    items:[
		{xtype: 'fieldcontainer',
		combineErrors: false,
		anchor: '100% 5%',
		layout:'hbox',
		defaults: {xtype: 'displayfield'
					,margin:'5'
					,labelPad:2
					,labelCls:'fast-label'
				}
		
		,items: [   {hidden:true,fieldLabel:'Id',itemId:'Id',labelWidth:40}
					,{fieldLabel:'Year',itemId:'Year',labelWidth:40}
					,{hidden:true,itemId:'Year1stHalf'}
					,{hidden:true,itemId:'Year2ndHalf'}
				]
		}
    	,{xtype:'BudgetDetailGrid',anchor: '100% 95%'}
    ]
});