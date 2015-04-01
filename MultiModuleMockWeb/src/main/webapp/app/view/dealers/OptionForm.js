Ext.define('Fast.view.dealers.OptionForm', {
    extend: 'Ext.window.Window',
    alias : 'widget.OptionEdit',
	modal:true,
    requires: ['Ext.form.Panel','Ext.form.field.Text'],

    title : 'Dealer Option Edit',
    layout: 'fit',
    autoShow: true,
    width: 300,
    y: 100,
    
    iconCls: 'icon-user',

    listeners:{
        destroy:function(win){
             isWindowOpened = false;
        }
    },
    
    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                padding: '5 5 0 5',
                border: false,
                style: 'background-color: #fff;',
                
                fieldDefaults: {
                    anchor: '100%',
                    labelAlign: 'left',
                    allowBlank: false,
                    combineErrors: true,
                    msgTarget: 'side'
                },

                items: [
					{
					    hidden:true,
					    xtype: 'textfield',
					    name : 'id',
					    fieldLabel: 'Dealer Id'
					},{
                        xtype:          'combo',
                        mode:           'local',
                        value:          'N',
                        triggerAction:  'all',
                        forceSelection: true,
                        editable:       false,
                        fieldLabel:     'Default Allocation',
                        name:           'hasDefaultAllocation',
                        displayField:   'name',
                        valueField:     'value',
                        queryMode: 'local',
                        store: Ext.create('Ext.data.Store', {
                            fields : ['name', 'value'],
                            data   : [
                                {name : 'Y',   value: 'Y'},
                                {name : 'N', value: 'N'}
                            ]
                        })					    	
					},{
                        xtype:          'combo',
                        mode:           'local',
                        value:          'Y',
                        triggerAction:  'all',
                        forceSelection: true,
                        editable:       false,
                        fieldLabel:     'Forecast',
                        name:           'hasForecast',
                        displayField:   'name',
                        valueField:     'value',
                        queryMode: 'local',
                        store: Ext.create('Ext.data.Store', {
                            fields : ['name', 'value'],
                            data   : [
                                {name : 'Y',   value: 'Y'},
                                {name : 'N', value: 'N'}
                            ]
                        })					    	
					},{
                        xtype:          'combo',
                        mode:           'local',
                        value:          'N',
                        triggerAction:  'all',
                        forceSelection: true,
                        editable:       false,
                        fieldLabel:     'Sell Thru/On Hand Inv',
                        name:           'hasSellHand',
                        displayField:   'name',
                        valueField:     'value',
                        queryMode: 'local',
                        store: Ext.create('Ext.data.Store', {
                            fields : ['name', 'value'],
                            data   : [
                                {name : 'Y',   value: 'Y'},
                                {name : 'N', value: 'N'}
                            ]
                        })					    	
					},{
                        xtype:          'combo',
                        mode:           'local',
                        value:          'Y',
                        triggerAction:  'all',
                        forceSelection: true,
                        editable:       false,
                        fieldLabel:     'Quota',
                        name:           'hasQuota',
                        displayField:   'name',
                        valueField:     'value',
                        queryMode: 'local',
                        store: Ext.create('Ext.data.Store', {
                            fields : ['name', 'value'],
                            data   : [
                                {name : 'Y',   value: 'Y'},
                                {name : 'N', value: 'N'}
                            ]
                        })					    	
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
