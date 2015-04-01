Ext.define('Fast.controller.company.AccessLevelsController', {
    extend: 'Ext.app.Controller',

    stores: ['company.AccessLevels'],
    models: ['company.AccessLevelsModel'],
    views: [//'Viewer',
            'company.AccessLevelsForm'
    		,'company.CompanyAccessLevelsGrid'
    		//,'company.CompanyAccessOptionsTree'
    		,'company.CompanyAccessOptionsGroupGrid'
    		,'company.CompanyUserGroupAccessRightsDetails'
    		],
    refs: [{ref: 'AccessLevelsForm',selector: 'AccessLevelsForm'}
    		,{ref: 'CompanyAccessLevelsGrid',selector: 'CompanyAccessLevelsGrid'}
    		//,{ref: 'Viewer',selector: 'Viewer'}
    		//,{ref: 'CompanyAccessOptionsTree',selector: 'CompanyAccessOptionsTree'}
    		,{ref: 'CompanyAccessOptionsGroupGrid',selector: 'CompanyAccessOptionsGroupGrid'}
    		,{ref: 'CompanyUserGroupAccessRightsDetails',selector: 'CompanyUserGroupAccessRightsDetails'}
		],

    init: function() {
			this.control({
            'CompanyAccessLevelsGrid dataview': {itemdblclick: this.companyAccessLevelAdd}
            ,'CompanyAccessLevelsGrid button[action=companyAccessLevelAdd]': {click: this.companyAccessLevelAdd}
            ,'CompanyAccessLevelsGrid button[action=companyAccessLevelDelete]': {click: this.companyAccessLevelDelete}
            ,'CompanyAccessLevelsGrid button[action=companyAccessLevelEdit]': {click: this.companyAccessLevelEditWithGrid}
            ,'CompanyAccessLevelsGrid button[action=companyAccessLevelListUsersInGroup]': {click: this.companyAccessLevelListUsersInGroup}
            
			,'CompanyUserGroupAccessRightsDetails button[action=companyAccessLevelSave]': {click: this.companyAccessLevelSave}
			,'CompanyUserGroupAccessRightsDetails button[action=companyAccessLevelReset]': {click: this.companyAccessLevelReset}
            ,'CompanyUserGroupAccessRightsDetails button[action=companyAccessLevelBack]': {click: this.companyAccessLevelBack}
            
            ,'AccessLevelsForm button[action=companyAccessLevelUpdate]': {click: this.companyAccessLevelUpdate}
        });
        //console.log('AccessLevelsController:init() store = '+ this.getCompanyAccessLevelsStore());
    }

    ,companyAccessLevelUpdate: function(button){
		var wnd    = button.up('window'),
		form   = wnd.down('form'),
		record = form.getRecord(),
		values = form.getValues(),
		theStore = this.getCompanyAccessLevelsStore();
        
		if (values.id > 0){
			record.set(values);
		} else{
			record = Ext.create('Fast.model.company.AccessLevelsModel');
			record.set(values);
			record.setId(0);
			theStore.add(record);
		}

		var syncOptions = {	theStore:theStore,
							wnd:wnd,
							success:this.updateGroupSyncCallback,
							failure:this.updateGroupFailureSyncCallback};
        theStore.sync(syncOptions);
    }
	
    ,updateGroupSyncCallback:function (batch, syncOptions){
        syncOptions.theStore.load();
        syncOptions.wnd.close();
    }
	
	,updateGroupFailureSyncCallback:function (batch, syncOptions){
		syncOptions.theStore.load();
		// access to error message inside store's exception
	}

    
    
    ,companyAccessLevelReset: function(button){
		var theGrid = this.getCompanyAccessOptionsGroupGrid();
    	var theStore = theGrid.getStore();
		var size = theStore.getCount();
		for(var i=0; i < size; i++){
			var record = theStore.getAt(i);
			record.set('granted',false);
		}
        theGrid.getView().refresh();
		//console.log('companyAccessLevelReset');
	}

	,companyAccessLevelCheck: function(theGrid){
    	var theStore = theGrid.getStore();
		var size = theStore.getCount();
		for(var i=0; i < size; i++){
			var record = theStore.getAt(i);
			var checkValue = record.get('granted');
			if (checkValue == true)
				return true;
		}
		return false;
	}

    ,companyAccessLevelSave: function(button){
		var theGrid = this.getCompanyAccessOptionsGroupGrid();
		
		if(this.companyAccessLevelCheck(theGrid) != true){
			Ext.MessageBox.alert({	title: 'Warning:', 
        							msg: 'Please select at least one access option.',
    								icon: Ext.MessageBox.OK, buttons: Ext.Msg.OK});
			return;
		}
		
    	var theStore = theGrid.getStore();
		var form = this.getCompanyUserGroupAccessRightsDetails();
		var formRef= form.getForm();
		var groupIdField = formRef.findField('groupId');
		var groupId = groupIdField.getValue();

		var json = '{ groupId:'+groupId+', options:[';
		var size = theStore.getCount();
		var needComma = false; 
		for(var i=0; i < size; i++){
			var record = theStore.getAt(i);
			//console.log('{ '+record.get('optionId')+', '+record.get('section')+', '+record.get('name')+', '+record.get('granted')+'}');
			if(record.get('granted')){
				if(needComma){
					json += ', ';	
				}
				json += record.get('optionId');
				needComma = true;
			}
		}
		json += ']}';
		//console.log('json = ' + json);
		
		Ext.Ajax.request({
   	        method: 'POST',
   	        url: 'json/companyAccessDetailsAction?m=saveGroupAccessRights',
   	        jsonData: json,//requestData,
   	        timeout:120000,
   	        success: function (response,request){
	   	        	//console.log('AccessLevelsController:POST callback: response.responseText = '+response.responseText);
		   	 		//this trick to retrieve rootViewer through ANY grid
		   	 		//var theRootViewer = theGrid.up('rootViewer');
		   	 		//var theRootViewer = this.getViewerView(); //returns contructor()
		   	 		//theRootViewer = this.getViewer();// returns 'undefined'
		   	 		//console.log('AccessLevelsController:POST callback: theRootViewer = '+theRootViewer);
		   	 		//theRootViewer.updateTabs(response.responseText);
		   			Ext.Ajax.request({//chain request for group access rights
		   	   	        method: 'POST',
		   	   	        url: 'json/companyAccessDetailsAction?m=readGroupAccessRights',
		   	   	        jsonData: json,//requestData,
		   	   	        timeout:120000,
		   	   	        success: function (response,request){
		   	   	        	//console.log('AccessLevelsController:ChainRequest:POST callback: response.responseText = '+response.responseText);
		   		   	 		//this trick to retrieve rootViewer through ANY grid
		   		   	 		var theRootViewer = theGrid.up('rootViewer');
		   		   	 		//console.log('AccessLevelsController:POST callback: theRootViewer = '+theRootViewer);
		   		   	 		var groupAccessList = Ext.JSON.decode(response.responseText,false);
		   		   	 		theRootViewer.updateTabs(groupAccessList);
		   	   	        },
		   	   	        failure: function (response,request){
		   					Ext.MessageBox.show({
		   	                    title: 'AJAX FAILURE:',
		   	                    msg: 'Chain request for group access rights FAILED '+response.responseText,
		   	                    icon: Ext.MessageBox.ERROR,
		   	                    buttons: Ext.Msg.OK
		   	                });
		   	   	        } 
		   	   	    });
   	        },
   	        failure: function (response,request){
	   	        //console.log(response.responseText);
				Ext.MessageBox.show({
                    title: 'AJAX FAILURE:',
                    msg: 'Unable to change selected records for the reason: '+response.responseText,
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
   	        } 
   	    });
		this.companyAccessLevelBack(button);
	},

	/*
	 * switch back to CompanyAccessLevelsGrid card
	 */
	companyAccessLevelBack: function(button){
		//TODO - <AP> collapse grid
		var theGrid = this.getCompanyAccessOptionsGroupGrid();
		theGrid.features[0].collapseAll();
		
		var gridPanel = button.up('panel');
		var cardPanel = gridPanel.up('panel');
		var cardLayout = cardPanel.getLayout();
		cardLayout.setActiveItem(0);
	},
    companyAccessLevelAdd: function(grid, record) {
        var edit = Ext.create('Fast.view.company.AccessLevelsForm');
        if(record){
        	edit.down('form').loadRecord(record);
        }
    },
    
    
	companyAccessLevelListUsersInGroup: function( button ) {
	//TODO - <AP> companyAccessLevelListUsersInGroup implementation in progress
    	var theGrid = this.getCompanyAccessLevelsGrid();
    	var selectedRecord = theGrid.getSelectionModel().getSelection()[0];
    	if (selectedRecord==null || selectedRecord.length==0){
        	Ext.MessageBox.alert({	title: 'Warning:', msg: 'Please select Group to view.',
    					icon: Ext.MessageBox.OK, buttons: Ext.Msg.OK});
			return;
    	}
    	var wnd = Ext.create('Fast.view.company.ListUsersInGroupWnd');
    	theGrid = wnd.down('ListUsersInGroupGrid');
    	//var theStore = this.getCompanyAccessLevelsStore();
    	var theStore = theGrid.store;
		var groupId = selectedRecord.get('id');
		var proxy = theStore.proxy;
		var StoreUrlBackup = theStore.constantUrl;
		//proxy.url = theStore.constantUrl + '&groupId='+groupId;
		theStore.proxy.api.read = theStore.constantUrl + '&groupId='+groupId;
		theStore.load({ scope:this,
						callback: function(records, operation, success) {
							//alert('users in group loaded');
							//proxy.url = theStore.constantUrl;
							theStore.proxy.api.read = theStore.constantUrl;
						}
		});
	}
    ,companyAccessLevelEditWithGrid: function(button) {
		var gridPanel = button.up('panel');
		var cardPanel = gridPanel.up('panel');
		var cardLayout = cardPanel.getLayout();
		cardLayout.setActiveItem(1);

		
    	var theGrid = this.getCompanyAccessLevelsGrid();

    	var theStore = this.getCompanyAccessLevelsStore();
    	var selectedRecord = theGrid.getSelectionModel().getSelection()[0];
    	if (selectedRecord==null || selectedRecord.length==0){
        	Ext.MessageBox.alert({	title: 'Warning:', msg: 'Please select records for Edit!',
    					icon: Ext.MessageBox.OK, buttons: Ext.Msg.OK});
			return;
    	}
		// in IE cause error selectedRecord does NOT have property or method get.
		var groupId		= selectedRecord.get('id');
		var groupName	= selectedRecord.get('groupName');
		var groupDesc	= selectedRecord.get('groupDesc');
		
		//var groupId		= selectedRecord.data.id;
		//var groupName	= selectedRecord.data.groupName;
		//var groupDesc	= selectedRecord.data.groupDesc;

		var form = this.getCompanyUserGroupAccessRightsDetails();
		var formRef= form.getForm();
		
		var groupIdField = formRef.findField('groupId');
		groupIdField.setValue(groupId);
		var accessLevel = formRef.findField('accessLevel');
		accessLevel.setValue(groupName);
		var accessLevelDescription = formRef.findField('accessLevelDescription');
		accessLevelDescription.setValue(groupDesc);

		//reload store
		var theTree = Ext.getCmp('CompanyAccessOptionsGroupGrid');
		var theStore = theTree.store;
		var proxy = theStore.proxy; 
		proxy.url =  theStore.constantUrl + '&groupId='+groupId; 
		theStore.load({
						scope: this,
						callback: function(records, operation, success) {
							theTree.features[0].collapseAll();
				    		//console.log('loaded records');
							}}
						);
		
		//TODO - <AP> collapse grid
    	//var theGroupGrid = this.getCompanyAccessOptionsGroupGrid();
		//theTree.features[0].collapseAll();

    }//eof companyAccessLevelEditWithGrid

    ,companyAccessLevelDelete: function(button) {
    	var grid = this.getCompanyAccessLevelsGrid(),
    	record = grid.getSelectionModel().getSelection(),
        theStore = this.getCompanyAccessLevelsStore();

        if (record == undefined || record.length == 0) {
			Ext.MessageBox.show({title: 'ERROR',
                    			msg: "Please select record(s) to remove!",
                    			icon: Ext.MessageBox.ERROR,
                    			buttons: Ext.Msg.OK});
    		return;
    	}

        theStore.remove(record);
		var syncOptions = {	theStore:theStore, 
							success:this.deleteGroupSyncCallback,
							failure:this.deleteGroupFailureSyncCallback};
		this.getCompanyAccessLevelsStore().sync(syncOptions);
    },

    deleteGroupSyncCallback:function (batch, syncOptions){
        syncOptions.theStore.load();
    },
	//TODO - <AP> process all sync falure like this see ca\canon\fast\web\company\CompanyAccessLevelsController.java delete (line 106)
	deleteGroupFailureSyncCallback:function (batch, syncOptions){
		syncOptions.theStore.load();
		
		// batch.operations[0].error.statusText
		/* The error message shown by store fast-web/WebContent/app/store/company/AccessLevels.js
		 * The store already have error-listener
		 * listeners: {
            exception: function(proxy, response, operation){
            	var resp = Ext.JSON.decode(response.responseText,true);
            	
            	
		 * Ext.MessageBox.show({
		 * 		title: 'Remote Access Failed',
		 * msg: resp.msg,
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
		 * 		});
		 * }
		 * 
		Ext.MessageBox.alert({	title: 'Error:', 
        						msg: 'Can not remove group with users!',
    							icon: Ext.MessageBox.OK, buttons: Ext.Msg.OK});*/
	}

});

    //TODO - <AP> TBR not used use companyAccessLevelEditWithGrid
    /*companyAccessLevelEdit: function(button) {
		var gridPanel = button.up('panel');
		var cardPanel = gridPanel.up('panel');
		var cardLayout = cardPanel.getLayout();
		cardLayout.setActiveItem(1);

		
    	var theGrid = this.getCompanyAccessLevelsGrid();
    	var theStore = this.getCompanyAccessLevelsStore();
    	var selectedRecord = theGrid.getSelectionModel().getSelection()[0];
    	if (selectedRecord==null || selectedRecord.length==0){
        	Ext.MessageBox.alert({	title: 'Warning:', 
        							msg: 'Please select records for Submit!',
    								icon: Ext.MessageBox.OK, buttons: Ext.Msg.OK});
			return;
    	}
		groupId		= selectedRecord.get('id');
		groupName	= selectedRecord.get('groupName');
		groupDesc	= selectedRecord.get('groupDesc');
		
		var form = this.getCompanyUserGroupAccessRightsDetails();
		var formRef= form.getForm();
		
		var groupIdField = formRef.findField('groupId');
		groupIdField.setValue(groupId);
		var accessLevel = formRef.findField('accessLevel');
		accessLevel.setValue(groupName);
		var accessLevelDescription = formRef.findField('accessLevelDescription');
		accessLevelDescription.setValue(groupDesc);

		
		//reload store
		var theTree = Ext.getCmp('CompanyAccessOptionsTree');
		var theStore = theTree.store;
		var proxy = theStore.proxy; 
		proxy.url =  theStore.constantUrl + '&groupId='+groupId; 
		theStore.load();

		//sendPramsToServer(url,groupId, groupName,groupDesc);
		
    }
    ,updateUserSyncCallback:function (batch, syncOptions){
        syncOptions.controller.getCompanyAccessLevelsStore().load();
    	syncOptions.wnd.close();
    }*/
