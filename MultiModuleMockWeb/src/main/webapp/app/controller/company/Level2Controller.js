Ext.define('Fast.controller.company.Level2Controller', {
    extend: 'Ext.app.Controller',

    stores: ['company.Level2'],

    models: ['company.Level2Model'],

    views: ['company.Level2Form', 'company.Level2Grid'],

    refs: [{
            ref: 'Level2Form',
            selector: 'Level2Form'
        },{
            ref: 'Level2Grid',
            selector: 'Level2Grid'
        }
    ],

    init: function() {
        this.control({
            'Level2Grid dataview': {itemdblclick: this.editUser}
            ,'Level2Grid button[action=add]': {click: this.editUser}
            ,'Level2Grid button[action=delete]': {click: this.deleteUser}
            ,'Level2Form button[action=save]': {click: this.updateUser}
            
            ,'Level2Grid button[action=goToLevelOne]':{click: this.goToLevelOne}
            ,'Level2Grid button[action=goToHierarhy]':{click: this.goToHierarchy}

        });
    },
	goToLevelOne: function(button) {
		var gridPanel = button.up('panel');
		var cardPanel = gridPanel.up('panel');
		var cardLayout = cardPanel.getLayout();
		cardLayout.setActiveItem(1);
		//console.log('Company Level 2 Controller goToLevelOne');		
	},

	goToHierarchy: function(button) {
		var gridPanel = button.up('panel');
		var cardPanel = gridPanel.up('panel');
		var cardLayout = cardPanel.getLayout();
		cardLayout.setActiveItem(0);
		//console.log('Company Level 2 Controller goToHierarchy');		
	},

    editUser: function(grid, record) {
        var edit = Ext.create('Fast.view.company.Level2Form').show();
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
			record = Ext.create('Fast.model.company.Level2Model');
			record.set(values);
			record.setId(0);
			this.getCompanyLevel2Store().add(record);
			
			
		}
        
		win.close();
        this.getCompanyLevel2Store().sync();
        this.getCompanyLevel2Store().load();
    },
    
    deleteUser: function(button) {
    	
    	var grid = this.getLevel2Grid(),
    	record = grid.getSelectionModel().getSelection(), 
        store = this.getCompanyLevel2Store();

	    store.remove(record);
	    this.getCompanyLevel2Store().sync();
	    this.getCompanyLevel2Store().load();
    }
});
