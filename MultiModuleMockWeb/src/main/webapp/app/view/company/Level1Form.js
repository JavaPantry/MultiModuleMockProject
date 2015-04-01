Ext.define('Fast.view.company.Level1Form', {
    extend: 'Ext.window.Window',
    alias : 'widget.Level1Form',

    requires: ['Ext.form.Panel','Ext.form.field.Text'],

    title : 'Edit Level1',
    layout: 'fit',
    autoShow: true,
    width: 280,
    
    iconCls: 'icon-user',

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                padding: '5 5 0 5',
                border: false,            
                fieldDefaults: {
                    anchor: '100%',
                    labelAlign: 'left',
                    allowBlank: false,
                    combineErrors: true,
                    msgTarget: 'side'
                },

                items: [
					{
					    xtype: 'textfield',
					    name : 'id',
					    fieldLabel: 'id',
					    hidden:true
					},    
                    {
                        xtype: 'textfield',
                        name : 'division',
                        fieldLabel: 'Division'
                    },
                    {
                        xtype: 'textfield',
                        name : 'mgmtGrp',
                        fieldLabel: 'Management Group'
                    },
                    {
                        xtype: 'textfield',
                        name : 'channelName',
                        fieldLabel: 'Channel Name'
                    },
                    {
                        xtype: 'textfield',
                        name : 'status',
                        fieldLabel: 'Status'
                    }
                ]
            }
        ];
        
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            id:'buttons',
            ui: 'footer',
            items: ['->',/* {
                iconCls: 'icon-save',
                itemId: 'save',
                text: 'Save',
                action: 'save'
            },*/{
            	iconCls: 'icon-cancel',
                text: 'Cancel',
                scope: this,
                handler: this.close
            }]
        }];

        this.callParent(arguments);
    }
});
