Ext.define('Fast.view.company.YearForecastForm', {
    extend: 'Ext.window.Window',
    alias : 'widget.YearForecastForm',
    requires: ['Ext.form.Panel','Ext.form.field.Text'],

    title : 'Edit Year Forecast',
    layout: 'fit',
    autoShow: true,
    modal: true,
    width: 280,
    iconCls: 'icon-user',
//fields: ['id','company','division','mgmtGroup', 'smsGroup', 'level1Name', 'level2Name','level3Name','level4Name','level5Name']        	    
    initComponent: function() {
        this.items = [{
                xtype: 'form',
                padding: '5 5 5 5',
                border: false,
                timeout:60,
                fieldDefaults: {anchor: '100%', labelAlign: 'left', combineErrors: true, msgTarget: 'side'},
               //fields: ['id','company','division','mgmtGroup', 'CCImgmtGroup','SMSGrp', 'level1', 'level2','level13','level4','level5'] 
                items: [
    					 {xtype: 'textfield', name: 'id',			fieldLabel: 'id',hidden:true}
                        ,{xtype: 'textfield', name: 'year',			fieldLabel: 'Year'}
                        ,{xtype: 'checkbox',  name: 'firstHalf',	fieldLabel: 'First Half', inputValue:true}
                        ,{xtype: 'checkbox',  name: 'secondHalf',	fieldLabel: 'Second Half', inputValue:true}
                    ]
            }];
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            id:'buttons',
            ui: 'footer',
            items: ['->',	{iconCls: 'icon-save',text: 'Save',action: 'yearForecastSave'}
            				,{iconCls: 'icon-cancel',text: 'Cancel',scope: this, handler: this.close}]
        }];
        this.callParent(arguments);
    }
});
