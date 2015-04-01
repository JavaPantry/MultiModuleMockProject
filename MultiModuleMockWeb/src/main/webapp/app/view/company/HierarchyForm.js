Ext.define('Fast.view.company.HierarchyForm', {
    extend: 'Ext.window.Window',
    alias : 'widget.HierarchyForm',

    requires: ['Ext.form.Panel','Ext.form.field.Text'],

    title : 'Edit Company Hierarchy',
    layout: 'fit',
    autoShow: true,
    modal: true,
    width: 280,
    
    iconCls: 'icon-user',
//fields: ['id','company','division','mgmtGroup', 'smsGroup', 'level1Name', 'level2Name','level3Name','level4Name','level5Name']        	    
    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                padding: '5 5 0 5',
                border: false,            
                fieldDefaults: {
                    anchor: '100%',
                    labelAlign: 'left',
                    //allowBlank: false,
                    combineErrors: true,
                    msgTarget: 'side'
                },
               //fields: ['id','company','division','mgmtGroup', 'CCImgmtGroup','SMSGrp', 'level1', 'level2','level13','level4','level5'] 
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
                            fieldLabel: 'Division'
                        },
                        {
                            xtype: 'textfield',
                            name : 'mgmtGrp',
                            allowBlank: false,
                            fieldLabel: 'Management Group'
                        }
                        ,
                        {
                            xtype: 'textfield',
                            name : 'CCImgmtGrp',
                            allowBlank: false,
                            fieldLabel: 'CCI Management Group'
                        }
                        ,                        
                        {
                            xtype: 'textfield',
                            name : 'SMSGrp',
                            allowBlank: false,
                            fieldLabel: 'SMS Group'
                        }
                        ,
                        {
                            xtype: 'textfield',
                            name : 'level1',
                            allowBlank:true,
                            fieldLabel: 'Level1 Name'
                        },
                        {
                            xtype: 'textfield',
                            name : 'level2',
                            allowBlank:true,
                            fieldLabel: 'Level2 Name'
                        },
                        {
                            xtype: 'textfield',
                            name : 'level3',
                            allowBlank:true,
                            fieldLabel: 'Level3 Name'
                        },
                        {
                            xtype: 'textfield',
                            name : 'level4',
                            allowBlank:true,
                            fieldLabel: 'Level4 Name'
                        },
                        {
                            xtype: 'textfield',
                            name : 'level5',
                            allowBlank:true,
                            fieldLabel: 'Level5 Name'
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
