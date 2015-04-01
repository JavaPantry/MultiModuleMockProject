Ext.define('Fast.controller.company.Level1Controller', {
    extend: 'Ext.app.Controller',

    stores: ['company.Level1'],

    models: ['company.Level1Model'],

    views: ['company.Level1Form', 'company.Level1Grid'],

    refs: [{
            ref: 'Level1Form',
            selector: 'Level1Form'
        },{
            ref: 'Level1Grid',
            selector: 'Level1Grid'
        }
    ],

    init: function() {
        this.control({
            'Level1Grid dataview': {itemdblclick: this.editUser}
            ,'Level1Grid button[action=add]': {click: this.editUser}
            ,'Level1Grid button[action=delete]': {click: this.deleteUser}
            ,'Level1Grid button[action=goToLevelTwo]':{click: this.goToLevelTwo}
            ,'Level1Grid button[action=goToHierarhy]':{click: this.goToHierarchy}

            ,'Level1Form button[action=save]': {click: this.updateUser}
        });
    },

	goToLevelTwo: function(button) {
		var gridPanel = button.up('panel');
		var cardPanel = gridPanel.up('panel');
		var cardLayout = cardPanel.getLayout();
		cardLayout.setActiveItem(2);
		//console.log('Company Hierarchy Controller goToLevelOne');		
	},

	goToHierarchy: function(button) {
		var gridPanel = button.up('panel');
		var cardPanel = gridPanel.up('panel');
		var cardLayout = cardPanel.getLayout();
		cardLayout.setActiveItem(0);
		//console.log('Company Hierarchy Controller goToLevelOne');		
	},

    editUser: function(grid, record) {
        var edit = Ext.create('Fast.view.company.Level1Form').show();
        
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
		}else{
			record = Ext.create('Fast.model.company.Level1Model');
			record.set(values);
			record.setId(0);
			this.getCompanyLevel1Store().add(record);
		}
		win.close();
        this.getCompanyLevel1Store().sync();
        this.getCompanyLevel1Store().load();
    },
    
    deleteUser: function(button) {
    	
    	var grid = this.getLevel1Grid(),
    	record = grid.getSelectionModel().getSelection(), 
        store = this.getCompanyLevel1Store();

	    store.remove(record);
	    this.getCompanyLevel1Store().sync();
	    this.getCompanyLevel1Store().load();
    }
});
