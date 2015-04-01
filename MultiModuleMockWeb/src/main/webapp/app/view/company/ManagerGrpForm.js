var statusStore = Ext.create('Ext.data.Store', {
        fields: [{type: 'string', name: 'status'}],                              
        data: [{"status":"Active"},{"status":"Inactive"}]
    });

Ext.define('Fast.view.company.ManagerGrpForm', {
    extend: 'Ext.window.Window',
    alias : 'widget.ManagerGrpForm',

    requires: ['Ext.form.Panel','Ext.form.field.Text'],

    title : 'Edit Manager Group',
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
                        name : 'company',
                        hidden:true,
                        fieldLabel: 'Company'
                    },    
                    {
                        xtype: 'textfield',
                        name : 'division',
                        hidden:true,
                        fieldLabel: 'division'
                    },
                    {
                        xtype: 'textfield',
                        name : 'mgmtGrp',
                        fieldLabel: 'Management Group'
                    },
                    {
                        xtype: 'textfield',
                        name : 'managerGroup',
                        fieldLabel: 'Manager Group'
                    },
                    /*{
                        xtype: 'textfield',
                        name : 'status',
                        fieldLabel: 'Status'
                    },*/{
                    	xtype: 'combo',
                    	mode: 'local',
                    	queryMode: 'local',                   	
                    	triggerAction: 'all',
                    	forceSelection: true,
                    	editable: true,
                    	fieldLabel: 'Status',
                    	name: 'status',
                    	displayField: 'status',
                    	valueField: 'status',
                    	store: statusStore

                   }
                ]
            }
        ];
        
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            id:'buttons',
            ui: 'footer',
            items: ['->', {
                iconCls: 'icon-save',
                itemId: 'save',
                text: 'Save',
                action: 'save'
            },{
            	iconCls: 'icon-cancel',
                text: 'Cancel',
                scope: this,
                handler: this.close
            }]
        }];

        this.callParent(arguments);
    }
});
