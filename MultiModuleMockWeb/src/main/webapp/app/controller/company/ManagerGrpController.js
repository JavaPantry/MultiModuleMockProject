Ext.define('Fast.controller.company.ManagerGrpController', {
    extend: 'Ext.app.Controller',

    stores: ['company.ManagerGrp'],

    models: ['company.ManagerGrpModel'],

    views: ['company.ManagerGrpForm', 'company.ManagerGrpGrid'],

    refs: [{
            ref: 'ManagerGrpForm',
            selector: 'ManagerGrpForm'
        },{
            ref: 'ManagerGrpGrid',
            selector: 'ManagerGrpGrid'
        }
    ],

    init: function() {
        this.control({
            'ManagerGrpGrid dataview': {
                itemdblclick: this.editUser
            },
            'ManagerGrpGrid button[action=add]': {
            	click: this.editUser
            },
            'ManagerGrpGrid button[action=delete]': {
                click: this.deleteUser
            },
            'ManagerGrpForm button[action=save]': {
                click: this.updateUser
            }
            ,'ManagerGrpGrid button[action=goToHierarhy]':{click: this.goToHierarchy}
        });
    },

	goToHierarchy: function(button) {
		var gridPanel = button.up('panel');
		var cardPanel = gridPanel.up('panel');
		var cardLayout = cardPanel.getLayout();
		cardLayout.setActiveItem(0);
		//console.log('Company ManagerGrpGrid Controller goToHierarchy');		
	},

    editUser: function(grid, record) {
        var edit = Ext.create('Fast.view.company.ManagerGrpForm').show();
        
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
			record = Ext.create('Fast.model.company.ManagerGrpModel');
			record.set(values);
			record.setId(0);
			this.getCompanyManagerGrpStore().add(record);
			
			
		}
        
		win.close();
        this.getCompanyManagerGrpStore().sync();
        this.getCompanyManagerGrpStore().load();
    },
    
    deleteUser: function(button) {
    	
    	var grid = this.getManagerGrpGrid(),
    	record = grid.getSelectionModel().getSelection(), 
        store = this.getCompanyManagerGrpStore();

	    store.remove(record);
	    this.getCompanyManagerGrpStore().sync();
	    this.getCompanyManagerGrpStore().load();
    }
});
