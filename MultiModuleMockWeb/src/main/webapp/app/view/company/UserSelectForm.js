
var statusStore = Ext.create('Ext.data.Store', {
        fields: [{type: 'string', name: 'status'}],                              
        data: [{"status":"Active"},{"status":"Inactive"}]
    });

var remoteUserGrpStore= new Ext.data.JsonStore({
autoLoad: true,
proxy: {
type: 'ajax',
api: {
 read : 'json/companyUserSelectAction?m=getUserGroup' 
},
//url:'json/companyUserSelectAction?m=getUserGroup',
reader: {
type: 'json',
root: 'select',
successProperty: 'success'
}
},
fields: [ 'groupName','id']
});

var remoteSMSUserList= new Ext.data.JsonStore({
	autoLoad: true,
	proxy: {
	type: 'ajax',
	api: {
	 read : 'json/companyUserSelectAction?m=getSMSUsers' 
	},
	//url:'json/companyUserSelectAction?m=getUserGroup',
	reader: {
	type: 'json',
	root: 'select',
	successProperty: 'success'
	}
	},
	fields: ['userCode','userName']
	});

Ext.define('Fast.view.company.UserSelectForm', {
    extend: 'Ext.window.Window',
    alias : 'widget.UserSelectForm',

    requires: ['Ext.form.Panel','Ext.form.field.Text'],

    title : 'Edit User Select',
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
                //fields: ['id', 'userCode','userName', 'status']
                items: [
                       {
                        xtype: 'textfield',
                        name : 'id',
                        fieldLabel: 'id',
                        hidden:true
                        },   
				
                   /* {
                        xtype: 'textfield',
                        name : 'status',
                        fieldLabel: 'Status'
                    },*/{
                    	xtype: 'combo',
                    	mode: 'remote',
                    	queryMode: 'local',                   	
                    	triggerAction: 'all',
                    	forceSelection: true,
                    	editable: false,
                    	fieldLabel: 'User Name',
                    	name: 'userCode',
                    	displayField: 'userName',
                    	valueField: 'userCode',
                    	editable: false,
                    	store: remoteSMSUserList

                    	},
                    {
                    	xtype: 'combo',
                    	mode: 'remote',
                    	queryMode: 'local',                   	
                    	triggerAction: 'all',
                    	forceSelection: true,
                    	editable: false,
                    	fieldLabel: 'User Group',
                    	name: 'userGrpId',
                    	displayField: 'groupName',
                    	valueField: 'id',
                    	store: remoteUserGrpStore

                    	},
                    	 {
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
