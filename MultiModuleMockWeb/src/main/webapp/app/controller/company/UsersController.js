//TODO - <AP> Could find Fast.controller.company.UsersController in old project only in companyExample
Ext.define('Fast.controller.company.UsersController', {
    extend: 'Ext.app.Controller',

    stores: ['Users'],

    models: ['company.UserModel'],

    views: ['company.UserForm', 'company.UserGrid'],

    refs: [{
            ref: 'UserForm',
            selector: 'UserForm'
        },{
            ref: 'UserGrid',
            selector: 'UserGrid'
        }
    ],

    init: function() {
        this.control({
            'UserGrid dataview': {
                itemdblclick: this.editUser
            },
            'UserGrid button[action=add]': {
            	click: this.editUser
            },
            'UserGrid button[action=delete]': {
                click: this.deleteUser
            },
            'UserForm button[action=save]': {
                click: this.updateUser
            }
        });
    },

    editUser: function(grid, record) {
    	//TODO - <AP> Could NOT find Fast.view.company.UserForm in old project
        var edit = Ext.create('Fast.view.company.UserForm').show();
        
        if(record){
        	edit.down('form').loadRecord(record);
        }
    },
    
    updateUser: function(button) {
        var win    = button.up('window'),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();
        
        
		if (values.id > 0){
			record.set(values);
		} else{
			record = Ext.create('Fast.model.company.UserModel');
			record.set(values);
			record.setId(0);
			this.getUsersStore().add(record);
			
			
		}
        
		win.close();
        this.getUsersStore().sync();
        this.getUsersStore().load();
    },
    
    deleteUser: function(button) {
    	
    	var grid = this.getUserGrid(),
    	record = grid.getSelectionModel().getSelection(), 
        store = this.getUsersStore();

	    store.remove(record);
	    this.getUsersStore().sync();
	    this.getUsersStore().load();
    }
});
