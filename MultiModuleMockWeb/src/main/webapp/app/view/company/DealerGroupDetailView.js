Ext.define('Fast.view.company.DealerGroupDetailView' ,{
    extend: 'Ext.Panel',
    alias : 'widget.DealerGroupDetailView',
    layout: 'anchor',

    items:[	
    	{xtype: 'fieldcontainer',
		combineErrors: false,
		anchor: '100% 5%',
		layout:'hbox'
		,defaults: {xtype: 'displayfield'
					,margin:'5'
					,labelPad:2
					,labelCls:'fast-label'
					,labelWidth:120}

		,items: [	{hidden:true,fieldLabel: 'Group Id',itemId:'dealerGroupId'}
					,{flex: 1,fieldLabel: 'Group Code',itemId:'dealerCode'}
					,{flex: 1,fieldLabel:'Group Description',itemId:'dealerName'}]
		}
    	,{xtype:'DealerGroupDetailGrid',anchor: '100% 95%'}
    ]
});
