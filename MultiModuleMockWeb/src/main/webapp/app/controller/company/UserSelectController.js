Ext.define('Fast.controller.company.UserSelectController', {
    extend: 'Ext.app.Controller',

    stores: ['company.UserSelect'],
    models: ['company.UserSelectModel'],
    views: ['company.UserSelectForm', 'company.CompanyUserSelectGrid'],
    refs:	[{ref: 'UserSelectForm',selector: 'UserSelectForm'},
    		{ref: 'UserSelectGrid',selector: 'UserSelectGrid'}],

    init: function() {
        this.control({
            'UserSelectGrid dataview': {itemdblclick: this.editUser}
            ,'UserSelectGrid button[action=add]': {click: this.editUser}
            ,'UserSelectGrid button[action=delete]': {click: this.deleteUser}
            ,'UserSelectForm button[action=save]': {click: this.updateUser}
        });
        //console.log('UserSelectController loaded');
    },

    editUser: function(grid, record) {
        var edit = Ext.create('Fast.view.company.UserSelectForm').show();
        if(record){
        	edit.down('form').loadRecord(record);
        }
    },

    updateUser: function(button) {
		var win    = button.up('window');
		var form   = win.down('form');
		var record = form.getRecord();
		var values = form.getValues();
        
        
		if (values.id > 0){
			record.set(values);
		} else{
			record = Ext.create('Fast.model.company.UserSelectModel');
			record.set(values);
			record.setId(0);
			this.getCompanyUserSelectStore().add(record);
		}
		win.close();
        this.getCompanyUserSelectStore().sync();
        //waitMsg: 'Saving Data...';
        this.getCompanyUserSelectStore().load();
    },

    deleteUser: function(button) {
		var grid	= this.getUserSelectGrid();
		var record	= grid.getSelectionModel().getSelection(); 
		var store	= this.getCompanyUserSelectStore();
		store.remove(record);
		this.getCompanyUserSelectStore().sync();
		// waitMsg: 'Delete Data...';
		this.getCompanyUserSelectStore().load();
    }
});
