Ext.define('Fast.view.company.DealerGroupEdit', 
	{extend: 'Ext.Panel'
    ,alias : 'widget.DealerGroupEdit'
    ,layout: 'fit'
	,items : [{xtype: 'form'
			,padding: '5 5 0 5'
			,border: false
			,style: 'background-color: #fff;'
			,fieldDefaults: {
                 anchor: '100%'
                ,labelAlign: 'left'
                ,combineErrors: true
                ,msgTarget: 'side'
                //,allowBlank: false
            }
            ,items: [//
                  {xtype: 'textfield',name : 'id',fieldLabel: 'Group Id', hidden:true}
                 ,{xtype: 'textfield',name : 'groupCode',fieldLabel: 'Group Code',allowBlank: false}
                 ,{xtype: 'textfield',name : 'groupDescription',fieldLabel: 'Group Description',allowBlank: false}]
            }
          ]

    ,initComponent: function() {
        this.dockedItems = [{xtype: 'toolbar',dock: 'top'
				            ,items: [{iconCls:'icon-return',text: 'Cancel',scope: this,action: 'back'}
				                    ,{iconCls:'icon-save',text: 'Save',action: 'save'}
				            		,{iconCls:'icon-next',text: 'Next',scope: this,action: 'next'}
				            		]}];
        this.callParent(arguments);
    }
});
