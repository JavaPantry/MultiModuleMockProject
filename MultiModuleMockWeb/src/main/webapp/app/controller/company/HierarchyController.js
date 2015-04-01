Ext.define('Fast.controller.company.HierarchyController', {
    extend: 'Ext.app.Controller',

    stores: ['company.Hierarchy'],

    models: ['company.HierarchyModel'],

    views: ['company.CompanyHierarchyGrid'
    		,'company.HierarchyForm'
    		],

    refs: [	{ref: 'HierarchyForm',selector: 'HierarchyForm'}
    		,{ref: 'CompanyHierarchyGrid',selector: 'CompanyHierarchyGrid'}
    ],

    init: function() {
    	//debugger;
    	//console.log('Company Hierarchy Controller: stores = '+this.stores);
    	//console.log('Company Hierarchy Controller: getCompanyCompanyHierarchyGridView = ' + this.getCompanyCompanyHierarchyGridView());
        this.control({
            'CompanyHierarchyGrid dataview': {itemdblclick: this.editUser}
            ,'CompanyHierarchyGrid button[action=add]': {click: this.createUser}
            ,'CompanyHierarchyGrid button[action=delete]': {click: this.deleteUser}
            ,'CompanyHierarchyGrid button[action=goToLevelOne]': {click: this.goToLevelOne}
            ,'CompanyHierarchyGrid button[action=goToCompanyManagerGroup]': {click: this.goToCompanyManagerGroup}
            ,'HierarchyForm button[action=save]': {click: this.updateUser}
        });
    },
    
	goToLevelOne: function(button) {
		var gridPanel = button.up('panel');
		var cardPanel = gridPanel.up('panel');
		var cardLayout = cardPanel.getLayout();
		cardLayout.setActiveItem(1);
		//console.log('Company Hierarchy Controller goToLevelOne');		
	},

	goToCompanyManagerGroup: function(button) {
		var gridPanel = button.up('panel');
		var cardPanel = gridPanel.up('panel');
		var cardLayout = cardPanel.getLayout();
		cardLayout.setActiveItem(3);
		//console.log('Company Hierarchy Controller goToCompanyManagerGroup');		
	},

	editUser: function(grid, record) {
        var edit = Ext.create('Fast.view.company.HierarchyForm');
        if(record){
        	edit.down('form').loadRecord(record);
        }
    },

   	createUser: function(button) {
        var edit = Ext.create('Fast.view.company.HierarchyForm');
    },

    updateUser: function(button) {
        var win    = button.up('window');
		var form   = win.down('form');
		var formRef= form.getForm();
//		var record = form.getRecord();
//		var values = form.getValues();
        var theStore = this.getCompanyHierarchyStore();
        
/* TODO - <AP> store doesn't recognize new record and always use proxy.api.update		
 * var syncOptions = {	controller:this,
							win:win,
							theStore:theStore,
							success:this.createManagementHierarchySyncCallback,
							failure:this.failureCreateManagementHierarchySyncCallback};        
        theStore.sync(syncOptions);*/
        
        formRef.submit({
     		url: 'json/companyHierarchyAction?m=update'
     		//,submitEmptyText: false
     		,success: function(form, action) {
     			theStore.load();
     			win.close();
	        }
	        ,failure: function(form, action) {
	        		theStore.load();
					Ext.MessageBox.show({title: 'ERROR',
										msg: action.result.message,
										icon: Ext.MessageBox.ERROR,
										buttons: Ext.Msg.OK});
	        		return;
			}
        });//eof submit
    }
    
    ,deleteUser: function(button) {
    	var grid = this.getCompanyHierarchyGrid(),
    	record = grid.getSelectionModel().getSelection(), 
        theStore = this.getCompanyHierarchyStore();
	    theStore.remove(record);
	    
	    var syncOptions = {	controller:this,
							theStore:theStore,
							success:this.deleteManagementHierarchySyncCallback,
							failure:this.failureDeleteManagementHierarchySyncCallback};        
        theStore.sync(syncOptions);
    }
    
    ,deleteManagementHierarchySyncCallback:function (batch, syncOptions){
    	syncOptions.theStore.load();
    }
    ,failureDeleteManagementHierarchySyncCallback:function (batch, syncOptions){
    	//console.log('error in delete op.')
    }
});
