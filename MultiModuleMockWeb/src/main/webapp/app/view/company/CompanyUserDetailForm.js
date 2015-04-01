var statusStore = Ext.create('Ext.data.Store', {
        fields: [{type: 'string', name: 'status'}],                              
        data: [{"status":"Active"},{"status":"Inactive"}]
    });

var remoteSMSUserList= new Ext.data.JsonStore({
	autoLoad: true,
	proxy: {
	type: 'ajax',
	api: {
		read : 'json/companyUserSelectAction?m=getSMSUsers' 
	},
	reader: {
		type: 'json',
		root: 'data',//'select',
		successProperty: 'success'
	}
	},
	fields: ['userCode','userName']
	});
    
var userGroupRemoteStore= new Ext.data.JsonStore({
	autoLoad: true,
	proxy: {
			type: 'ajax',
			api: {
			 read : 'json/companyUserSelectAction?m=getUserGroup' 
			},
	reader: {
			type: 'json',
			root: 'data',//'select',
			successProperty: 'success'
			}
	},
	fields: [ 'groupName','id']
});

Ext.require([
    'Ext.form.*'
    ,'Ext.data.*'
    ,'Ext.tip.QuickTipManager'
]);

Ext.define('Fast.view.company.CompanyUserDetailForm' ,{
		extend	: 'Ext.form.Panel',
		alias	: 'widget.CompanyUserDetailForm',
		id		: 'CompanyUserDetailForm',
		timeout : 5,
		newUserMode: false,

		//title	: 'Company User Details',
		autoHeight: true,
		bodyPadding: 10,
		defaults: {anchor: '100%',labelWidth: 100},
        // configure how to read the json data
	    reader : new Ext.data.JsonReader({
					root : 'data',
					model : 'UserDetailModel'
					//,successProperty : 'success'
				}),
        items   : [{xtype: 'fieldcontainer',
					fieldLabel: '',
					combineErrors: true,
					msgTarget : 'side',
					layout: 'hbox',
					defaults: {flex: 1,hideLabel: false},
					items: [
							{
								xtype: 'textfield',
								name: 'id',
								hidden: true,
								fieldLabel: 'userTableID'
							},{
								xtype: 'textfield',
								name: 'userCode',
								hidden: true,
								fieldLabel: 'User ID'
							},{
								xtype: 'textfield',
								name: 'userName',
								hidden: true,
								fieldLabel: 'User Name'
							},{
								xtype: 'displayfield',
								name: 'userCodeDis',
								fieldLabel: 'User ID'
							},{
								xtype: 'displayfield',
								name: 'userNameDis',
								fieldLabel: 'User Name'
							},{
		                    	xtype: 'combo',
		                    	queryMode: 'remote',//'local',
		                    	id:'userNameCombo',
		                    	forceSelection: true,
		                    	fieldLabel: 'User Name',
		                    	name: 'userNameCombo',
		                    	displayField: 'userName',
		                    	valueField: 'userCode',
		                    	editable: false,
		                    	store: remoteSMSUserList,
		                    	listeners : {
		                    		 //TODO - <AP> add user existence ajax call here 
		                    		change: function(combo, newValue, oldValue){
		                    			var form = combo.up('form');
		                    			if (!form.newUserMode)//activate existence check only in newUser mode 
		                    				return;
		                    			Ext.Ajax.request({
		                    	   	        method: 'POST',
		                    	   	        url: 'json/companyUserDetailsAction?m=checkExistence&userCode='+newValue,
		                    	   	   
		                    	   	        jsonData: '{}',//json,//requestData,
		                    	   	        timeout:10000,
		                    	   	        success: function (response,request){
		                    					var form = combo.up('form');
		                    					var formRef = form.getForm();
		                    					var userCodeComboField = formRef.findField('userNameCombo');

		                    	   	        	var resp = Ext.JSON.decode(response.responseText,true);
		                    	   	        	if (resp.success == false){
			                    					Ext.MessageBox.show({
			                    	                    title: 'AJAX FAILURE:',
			                    	                    msg: resp.msg, //'User already exists.',
			                    	                    icon: Ext.MessageBox.ERROR,
			                    	                    buttons: Ext.Msg.OK
			                    	                });
			                    					userCodeComboField.clearValue();
			                    					//userCodeField.reset();
		                    	   	        		return;
		                    	   	        	}
		                    	   	        	// Old code
		                    					var form = combo.up('form');
		                    					var formRef = form.getForm();
		                    					var userCodeField = formRef.findField('userCode');
		                    					var userCodeDisField = formRef.findField('userCodeDis');
		                    					var userNameField = formRef.findField('userName');
		                    					userCodeField.setValue(newValue);
		                    					userCodeDisField.setValue(newValue);
		                    					//most likely lastSelection[0] == undefined in edit mode
		                    					if(combo.lastSelection[0] == undefined)
		                    						return;
		                    					var name = combo.lastSelection[0].data.userName;
		                    					userNameField.setValue(name);
		                    					// Old code ends
		                    	   	        },
		                    	   	        failure: function (response,request)
		                    	   	        {
		                    	   	        	var resp = Ext.JSON.decode(response.responseText,true);
		                    					Ext.MessageBox.show({
		                    	                    title: 'AJAX FAILURE:',
		                    	                    msg: resp.msg, //'User already exists.',
		                    	                    icon: Ext.MessageBox.ERROR,
		                    	                    buttons: Ext.Msg.OK
		                    	                });
		                    	   	        } 
		                    	   	    });
		                    			
		                    			
		                    			
		                    			
					                    		}
					                    	}
								}
					    ]
			        	},{
			                xtype: 'fieldcontainer',
			                fieldLabel: '',
			                combineErrors: true,
			                msgTarget : 'side',
			                layout: 'hbox',
			                defaults: {
			                    flex: 1,
			                    hideLabel: false
			                },
			                items: [
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
				                    store: userGroupRemoteStore
				                    },{
			                        xtype     : 'textfield',
			                        name      : 'division',
			                       // emptyText : 'CIG',                        
			                        fieldLabel: 'Division',
			                        value : 'CIG',
			                        disabled: true,
			                        allowBlank: false
			                    	}
			                ]
			            }//eof 'fieldcontainer',
			            ,{
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
            ,{	xtype: 'fieldset',
				title: 'User Roles',
				layout: 'anchor',
				//id: 'roleGrp',
				defaults: {anchor: '100%'},//labelStyle: 'padding-left:4px;'
            
           
            items: [{
					xtype: 'checkboxgroup',
					// fieldLabel: 'User Roles',
					// cls: 'x-check-group-alt',
					// Specify exact column widths (could also include float values for %)
					columns: ['10%', '10%','10%','10%'],
					columns: 4,
					vertical: false,
					items: [
							{boxLabel: 'Product Approver', name: 'prodApprover'},
							{boxLabel: 'Forecast Approver', name: 'fcastApprover'},                   
							{boxLabel: 'Product by Account Approver', name: 'accountApprover'},
							{boxLabel: 'Sales Person', name: 'salesPerson'}
						]
	            	},{
	                xtype: 'checkboxgroup',
					// fieldLabel: 'User Roles',
					// cls: 'x-check-group-alt',
					// Specify exact column widths (could also include float values for %)
	                columns: ['10%', '10%','10%','10%'],
	                columns: 4,
	                vertical: false,
	                items: [
							{boxLabel: 'Product Bypass', name: 'prdBypass'},                    
							{boxLabel: 'Forecast Bypass', name: 'fctBypass'},
							{boxLabel: 'Product by Account Bypass', name: 'apBypass'},
							{boxLabel: 'Sales Manager', name: 'salesManager',
							handler : function() {
									var myForm=Ext.getCmp("CompanyUserDetailForm");
									isSalesManager= myForm.getForm().findField('salesManager').getValue();
									if (isSalesManager){
										Ext.getCmp('nextBtn').enable();
										Ext.getCmp('saveBtn').disable();
									}else{
										Ext.getCmp('nextBtn').disable();
										Ext.getCmp('saveBtn').enable();
									}
									}//eof handler
							}
	                	]
					},{
					xtype: 'checkboxgroup',
					// fieldLabel: 'User Roles',
					// cls: 'x-check-group-alt',
					// Specify exact column widths (could also include float values for %)
					columns: ['10%', '10%','10%','10%'],
					columns: 4,
					vertical: false,
	                items: [
	                    {boxLabel: 'Product EmailExempt', name: 'prdEmailExempt'},                    
	                    {boxLabel: 'Forecast EmailExempt', name: 'fctEmailExempt'},
	                    {boxLabel: 'Product by Account EmailExempt', name: 'apEmailExempt'}                                                           
					]
				}
          ]
        }
            
        ],
        
        // inline buttons
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            layout: {pack: 'left'},
            items: [{
                minWidth: 80,
                text: 'Next',
                iconCls: 'icon-next',
                id:"nextBtn",
                action:'userDetailEditNext'
            },{
                minWidth: 80,
                text: 'Save',
                iconCls: 'icon-save',
                id:"saveBtn",
                action:'userDetailEditSave'
            },
            {
                minWidth: 80,
                text: 'Cancel',
                iconCls: 'icon-cancel',
                action:'userDetailEditCancel'
            }]
        } ]
    });//end of UserDetail


Ext.onReady(function() {
    Ext.QuickTips.init();
});

//TODO - <AP> remove if not used
function filterById(store, userId) {
	store.filter([{
	    fn: function(record) {
	    	var rId=record.get('userId');
	    	return rId==userId;
	    }
	}]);
};