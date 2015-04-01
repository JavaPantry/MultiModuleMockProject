Ext.define('Fast.view.dealers.DetailForm', {
    extend: 'Ext.window.Window',
    alias : 'widget.DetailEdit',

    requires: ['Ext.form.Panel','Ext.form.field.Text'],

    title : 'Dealer Detail Edit',
    layout: 'fit',
    modal:true,
    autoShow: true,
    width: 300,
    y: 100,
    
    iconCls: 'icon-user',

    listeners:{
        destroy:function(win){
             //isWindowOpened = false;
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
                    combineErrors: true,
                    msgTarget: 'side'
                },

                items: [
					{
					    hidden:true,
					    xtype: 'textfield',
					    name : 'sequenceNumber',
					    fieldLabel: 'Sequence Number'
					},{
					    hidden:true,
					    xtype: 'textfield',
					    name : 'id',
					    fieldLabel: 'Dealer Detail Id'
					},{
					    hidden:true,
					    xtype: 'textfield',
					    inputId: 'dealerId',
					    name : 'dealerId',
					    fieldLabel: 'DealerId'
					},{
                        xtype: 'displayfield',
                        name : 'managementGroup',
                        fieldLabel: 'Management Group'
					},{
                        xtype: 'displayfield',
                        name : 'categoryName',
                        fieldLabel: 'category'
					},{
					    xtype: 'combo',
					    //id: 'detailFormSalesPersonId',
					    editable: false,
					    queryMode: 'local',
					    store: 'SalesPerson',
					    displayField: 'userName',
					    valueField: 'id',
						fieldLabel: 'Sales Person',
						emptyText: 'Select a Sales Person...',
					    name: 'salesPersonId'
					},{
					    xtype: 'combo',
					    //id: 'detailFormSalesManagerId',
					    editable: false,
					    queryMode: 'local',
					    store: 'SalesManager',
					    displayField: 'userName',
					    valueField: 'id',
						fieldLabel: 'Sales Manager',
						emptyText: 'Select a Sales Manager...',
					    name: 'salesManagerId'
					},{
					    xtype: 'combo',
					    //id: 'detailFormManagerGroupId',
					    editable: false,
					    queryMode: 'local',
					    store: 'ManagerGroup',
					    displayField: 'managerGroup',
					    valueField: 'id',
						fieldLabel: 'Manager Hierarchy',
						emptyText: 'Select a Manager Group...',
					    name: 'managerGrpId'
					},{
                        xtype: 'numberfield',
					    id: 'detailFormDealerMId',
                        maxValue: 99,
                        minValue: 0,
					    decimalPrecision: 1,
                        name : 'dealerM',
                        fieldLabel: 'Dealer M%'
					},{
					    xtype: 'numberfield',
					    id: 'detailFormDealerM2Id',
					    maxValue: 99,
                        minValue: 0,
					    decimalPrecision: 1,
					    name : 'dealerM2',
					    fieldLabel: 'Dealer M2%'
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
