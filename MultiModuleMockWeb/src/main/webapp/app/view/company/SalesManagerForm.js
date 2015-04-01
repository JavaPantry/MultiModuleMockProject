

var remoteManagerGrpStore= new Ext.data.JsonStore({
	autoLoad: true,
	proxy: {
	type: 'ajax',
	api: {
	 read : 'json/companySalesManagerAction?m=getManagerGroup' 
	},
	//url:'json/companyUserSelectAction?m=getUserGroup',
	reader: {
	type: 'json',
	//TODO - <AP> replace root: 'select' to data in companyUserSelectAction?m=getManagerGroup
	root: 'data',//'select',
	successProperty: 'success'
	}
	},
	fields: [ 'managerGroup','id']
	});

var remoteManagerStore= new Ext.data.JsonStore({
	autoLoad: true,
	proxy: {
	type: 'ajax',
	api: {
	 read : 'json/companySalesManagerAction?m=getSalesManagers' 
	},
	reader: {
	type: 'json',
	//TODO - <AP> replace root: 'select' to data in companyUserSelectAction?m=getUserGroup 
	root: 'data',//'select',
	successProperty: 'success'
	}
	},
	//fields: [ 'userName','id']
	fields: [ {name: 'manager', mapping:'userName'},'id'],
	sorters: [{
        property: 'manager',
        direction: 'ASC'
    }]
	});

Ext.define('Fast.view.company.SalesManagerForm', {
    extend: 'Ext.window.Window',
    alias : 'widget.SalesManagerForm',
    id: 'salesManagerForm',
    requires: ['Ext.form.Panel','Ext.form.field.Text'],

    title : 'Edit Sales Manager',
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
					{xtype: 'textfield',name : 'id',fieldLabel: 'id',hidden:true}
					,{xtype: 'textfield',name : 'userId',fieldLabel: 'User Id',hidden:true}
					,{xtype: 'textfield',name : 'manager',fieldLabel: 'Manager',hidden:true}
					,{xtype: 'textfield',name : 'company',fieldLabel: 'Company',hidden: true}
					,{xtype: 'textfield',name : 'division',fieldLabel: 'Division',hidden: true}
					,{
                    	xtype: 'combo',
                    	mode: 'remote',
                    	id: 'combxId',
                    	queryMode: 'local',                   	
                    	triggerAction: 'all',
                    	forceSelection: true,
                    	editable: false,
                    	fieldLabel: 'Manager',
                    	name: 'usmId',
                    	displayField: 'manager',
                    	valueField: 'id',
                    	store: remoteManagerStore,
                    	listeners : {
		                    		change: function(combo, newValue, oldValue){
		                    					//console.log('change listener newValue = '+newValue);
		                    					var form = combo.up('form');
		                    					var formRef = form.getForm();
		                    					var managerField = formRef.findField('manager');
		                    					//most likely lastSelection[0] == undefined in edit mode
		                    					//if(combo.lastSelection[0] == undefined)
		                    						//return;
		                    					var name = combo.lastSelection[0].data.manager;
		                    					managerField.setValue(name);
					                    		}
									}
                    },{
						xtype: 'combo',                
						mode: 'remote',
						queryMode: 'local',                   	
						triggerAction: 'all',
						forceSelection: true,
						editable: false,
						fieldLabel: 'Manager Group',
						name: 'managerGrpId',
						displayField: 'managerGroup',
						valueField: 'id',
						store: remoteManagerGrpStore
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
                action: 'salesManagerFormSave'
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



