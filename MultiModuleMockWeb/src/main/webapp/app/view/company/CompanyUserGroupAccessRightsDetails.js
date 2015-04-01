Ext.define('Fast.view.company.CompanyUserGroupAccessRightsDetails' ,{
		extend	: 'Ext.form.Panel',
		alias	: 'widget.CompanyUserGroupAccessRightsDetails',
		id		: 'CompanyUserGroupAccessRightsDetails',
		//timeout : 5,
		bodyPadding: 10,
		defaults: {anchor: '100%',labelWidth: 100},
        items   : [{
					xtype: 'fieldcontainer',
					fieldLabel: '',
					combineErrors: true,
					msgTarget : 'side',
					layout: 'hbox',
					defaults: {flex: 1,hideLabel: false},
					items: [
							{
								xtype: 'textfield',
								name: 'groupId',
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
								name: 'accessLevel',
								fieldLabel: 'Access Level'
							},{
								xtype: 'displayfield',
								name: 'accessLevelDescription',
								fieldLabel: 'Access Level Description'
							}
					    ]
			        	}
            ,
            {	xtype: 'fieldset',
						title: 'Group Access Rights',
						layout: 'anchor',
						//id: 'roleGrp',
						defaults: {anchor: '100%'},
						items: [
							//{xtype: 'CompanyAccessOptionsTree'}
							{xtype: 'CompanyAccessOptionsGroupGrid'}				
							]
			}
            
        ],
        
        // inline buttons
	dockedItems: [{
		xtype: 'toolbar',
		dock: 'top',
		layout: {pack: 'left'},
		items: [
		{text: 'Save',iconCls: 'icon-save',action:'companyAccessLevelSave'}
		,{text: 'Reset',iconCls: 'icon-reset',action:'companyAccessLevelReset'}
		,{text: 'Back',iconCls: 'icon-return',action:'companyAccessLevelBack'}
		]
	}]
    });//end of form panel definition
