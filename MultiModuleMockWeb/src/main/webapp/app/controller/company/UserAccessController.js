Ext.define('Fast.controller.company.UserAccessController', {
    extend: 'Ext.app.Controller',

    stores: ['company.SalesManager'],//'Users',

    models: ['company.UserDetailModel', 'company.SalesManagerModel'],

    views: ['company.CompanyUserSelectGrid'
    		,'company.CompanyUserDetailForm'
    		,'company.CompanySalesManagerGrid'
    		,'company.SalesManagerForm'
    		],

    refs: [	{ref: 'CompanyUserSelectGrid', selector: 'CompanyUserSelectGrid'}
			,{ref: 'CompanyUserDetailForm', selector: 'CompanyUserDetailForm'}
			,{ref: 'CompanySalesManagerGrid', selector: 'CompanySalesManagerGrid'}
			,{ref: 'SalesManagerForm', selector: 'SalesManagerForm'}
			],

    init: function() {
        this.control({
            'CompanyUserSelectGrid dataview':{itemdblclick: this.editUserDetailOnDblClk}
            ,'CompanyUserSelectGrid button[action=editUserDetail]': {click: this.editUserDetailBtn}
            ,'CompanyUserSelectGrid button[action=editUserDetailAdd]': {click: this.editUserDetailAdd}
            
            
            ,'CompanyUserDetailForm button[action=userDetailEditCancel]': {click: this.cancelEditUserDetail}
            ,'CompanyUserDetailForm button[action=userDetailEditSave]': {click: this.userDetailEditSave}
            ,'CompanyUserDetailForm button[action=userDetailEditNext]': {click: this.userDetailEditNext}

			//----buttons on Sales Manager---
			,'CompanySalesManagerGrid dataview': {itemdblclick: this.editSalesManager}
            ,'CompanySalesManagerGrid button[action=cancelEditUserDetail]': {click: this.cancelEditUserDetail}
            ,'CompanySalesManagerGrid button[action=backToUserDetailForm]': {click: this.backToUserDetailForm}
			,'CompanySalesManagerGrid button[action=addSalesManager]': {click: this.addSalesManager}
			,'CompanySalesManagerGrid button[action=deleteSalesManager]': {click: this.deleteSalesManager}
            
            ,'SalesManagerForm button[action=salesManagerFormSave]': {click: this.salesManagerFormSave}
        });
        //console.log('UserAccessController loaded');
    },

	editSalesManager: function(grid, record){
    	//console.log('editSalesManager');
        var editWnd = Ext.create('Fast.view.company.SalesManagerForm').show();
        var theForm = editWnd.down('form');
        if(record){
        	editWnd.down('form').loadRecord(record);
        }
        
        //get selected User id without Ext.getCmp("companyUserDetails");
		var userDetailForm		= this.getCompanyUserDetailForm();
		var formRef				= userDetailForm.getForm();
		var userId = formRef.findField('id').getValue();

        
        theForm.getForm().findField('userId').setValue(userId);
        var combx=Ext.getCmp('combxId');
        if (combx!=null)
        combx.store.load();
	},

	addSalesManager: function(button) {
        var editWnd = Ext.create('Fast.view.company.SalesManagerForm').show();
        var theForm = editWnd.down('form');
        //get selected User id without Ext.getCmp("companyUserDetails");
		var userDetailForm		= this.getCompanyUserDetailForm();
		var formRef				= userDetailForm.getForm();
		var userId = formRef.findField('id').getValue();

        theForm.getForm().findField('userId').setValue(userId);
        var combx=Ext.getCmp('combxId');
        if (combx!=null)
        combx.store.load();
	},
	
	deleteSalesManager: function(button) {
		//console.log('deleteSalesManager');
    	var grid = this.getCompanySalesManagerGrid(),
    	record = grid.getSelectionModel().getSelection(), 
        store = this.getCompanySalesManagerStore();

	    store.remove(record);
   		var syncOptions = {	store:store, 
							success:this.deleteManagerSyncCallback,
							failure:this.failureSyncCallback};
	    store.sync(syncOptions);
	}
	,deleteManagerSyncCallback:function (batch, syncOptions){
        syncOptions.store.load();
    }
    ,failureSyncCallback:function (batch, syncOptions){
        Ext.MessageBox.show({
                    title: 'Error:',
                    msg: 'Delete Sales Manager failed.',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
    }
    ,salesManagerFormSave: function(button) {
		//console.log('save SalesManager');
		var win    = button.up('window'),
		form   = win.down('form'),
		record = form.getRecord(),
		values = form.getValues();
        
		if (values.id > 0){
			record.set(values);
		}else{
			record = Ext.create('Fast.model.company.SalesManagerModel');
			record.set(values);
			record.setId(null);
			this.getCompanySalesManagerStore().add(record);
		}

		var theStore = this.getCompanySalesManagerStore();
		var syncOptions = {	theStore:theStore,
							wnd:win,
							success:this.updateCompanySalesManagerCallback,
							failure:this.updateCompanySalesManagerFailureSyncCallback};
		theStore.sync(syncOptions);
    }
    ,updateCompanySalesManagerCallback:function (batch, syncOptions){
        syncOptions.theStore.load();
        syncOptions.wnd.close();
    }
	,updateCompanySalesManagerFailureSyncCallback:function (batch, syncOptions){
		syncOptions.theStore.load();
		syncOptions.wnd.close();
		//TODO - <AP> should there be notification? alert("Saving Data, ignored if Manager Group duplicated");
		//exception listener in SalesManager already catch this error
		//console.log(batch.operations[0].getError());
		Ext.MessageBox.show({title: 'ERROR',
			msg: 'Either wrong Manager or Manager Group have been selected, record will not be added',//action.result.message,
			icon: Ext.MessageBox.ERROR,
			buttons: Ext.Msg.OK});
	}
    
    ,userDetailEditNext: function(button) {
		//console.log('userDetailEditNext');
		//TODO - <AP> save changes before go next (CODE DUBLICATION)
		var me					= this;
		var userDetailForm		= this.getCompanyUserDetailForm();
		var formRef				= userDetailForm.getForm();
		formRef.submit({
			url: 'json/companyUserDetailsAction?m=save'
			,submitEmptyText: false
			,failure: function(form, action){
											Ext.MessageBox.show({title: 'ERROR',
										    			msg: 'userDetailForm submit fail!',
										    			icon: Ext.MessageBox.ERROR,
										    			buttons: Ext.Msg.OK});
											}
			,success: function(form, action){
											//console.log('userDetailForm submit succeed');
									    	var gridPanel	= me.getCompanyUserSelectGrid();
											var cardPanel 	= gridPanel.up('panel');
											var cardLayout 	= cardPanel.getLayout();
											//TODO - <AP> try to find out how to set record back to store so it will not be require send request
											//reload grid so edited record will be refreshed in grid
											var store		= gridPanel.getStore();
											store.load();
											gridPanel.getView().refresh();
											//console.log('gridPanel.getView().refresh()');
											//console.log('userDetailForm Go Next to SalesManagerForm');
											
											//TODO - <AP> Load CompanySalesManagerGrid with managers for currend userId
											var formRef = form;//.getForm();
											var idField = formRef.findField('id');
											var userId	= idField.getValue();
											var salesManagerGrid = me.getCompanySalesManagerGrid();
											var salesManagerStore = salesManagerGrid.getStore();
											salesManagerStore.proxy.api.read = 'json/companySalesManagerAction?m=read&userId='+userId;
											salesManagerStore.load();
											cardLayout.setActiveItem(2);
											}
			//,waitMsg: 'Saving User Details...'
			});
	},

    cancelEditUserDetail : function(button) {
    	//console.log('cancelEditUserDetail');
    	var gridPanel	= button.up('panel');
		var cardPanel 	= gridPanel.up('panel');
		var cardLayout 	= cardPanel.getLayout();
		cardLayout.setActiveItem(0);
    },

    
    backToUserDetailForm: function(button) {
    	//console.log('backToUserDetailForm');
    	var gridPanel	= button.up('panel');
		var cardPanel 	= gridPanel.up('panel');
		var cardLayout 	= cardPanel.getLayout();
		// user detail form already loaded and saved
		cardLayout.setActiveItem(1);
    },
    
	userDetailEditSave: function(button) {
		var me					= this;
		var userDetailForm		= this.getCompanyUserDetailForm();
		var formRef				= userDetailForm.getForm();
		/*
		 * Take out validation by Scott's request
		var isProdApprover		= formRef.findField('prodApprover').getValue();
		var isFcastApprover		= formRef.findField('fcastApprover').getValue();
		var isSalesPerson		= formRef.findField('salesPerson').getValue();
		var isAccountApprover	= formRef.findField('accountApprover').getValue();
		var atLeastOneSelected=isProdApprover||isFcastApprover||isSalesPerson||isAccountApprover;
		if (atLeastOneSelected==false){
			alert("At least one of user roles need to be seleted !");
			Ext.MessageBox.show({title: 'ERROR',
		    			msg: "At least one of user roles need to be selected!",
		    			icon: Ext.MessageBox.ERROR,
		    			buttons: Ext.Msg.OK});
			return;
		}*/
		
		//TODO - <AP> Missing user Group will cause nullPointer exception
		var userGrp		= formRef.findField('userGrpId').getValue();
		if (userGrp == null || userGrp == undefined){
			Ext.MessageBox.show({title: 'ERROR',
		    			msg: "User Group should be selected!",
		    			icon: Ext.MessageBox.ERROR,
		    			buttons: Ext.Msg.OK});
			return;
		}
		formRef.submit({
			url: 'json/companyUserDetailsAction?m=save'
			,submitEmptyText: false
			,failure: function(form, action){
											Ext.MessageBox.show({title: 'ERROR',
										    			msg: 'userDetailForm submit fail!',
										    			icon: Ext.MessageBox.ERROR,
										    			buttons: Ext.Msg.OK});
											}
			,success: function(form, action){
											//console.log('userDetailForm submit succeed');
									    	var gridPanel	= me.getCompanyUserSelectGrid();
											var cardPanel 	= gridPanel.up('panel');
											var cardLayout 	= cardPanel.getLayout();
											cardLayout.setActiveItem(0);
											//TODO - <AP> try to find out how to set record back to store so it will not be require send request
											//reload grid so edited record will be refreshed in grid
											var store		= gridPanel.getStore();
											store.load();
											gridPanel.getView().refresh();
											//console.log('gridPanel.getView().refresh()');
											}
			//,waitMsg: 'Saving User Details...'
			});
	},
	
	editUserDetailAdd : function(button) {
		var gridPanel		= this.getCompanyUserSelectGrid();
		var userDetailForm	= this.getCompanyUserDetailForm();
		userDetailForm.newUserMode = true;

		var formRef			= userDetailForm.getForm();
		var selectedRecord = Ext.create('Fast.model.company.UserDetailModel');
		formRef.loadRecord(selectedRecord);
		
		var cardPanel = gridPanel.up('panel');
		var cardLayout = cardPanel.getLayout();
		cardLayout.setActiveItem(1);

		// In Add User mode show user combobox
		var userNameDis = formRef.findField('userNameDis');
		userNameDis.hide();
		var userNameComboField = formRef.findField('userNameCombo');
		userNameComboField.show();
		
		//button switch
		var salesManagerField = formRef.findField('salesManager');
		var isSalesManager= salesManagerField.getValue();
		if (isSalesManager){
			Ext.getCmp('nextBtn').enable();
			Ext.getCmp('saveBtn').disable();
		}else{ 
			Ext.getCmp('nextBtn').disable();
			Ext.getCmp('saveBtn').enable();
		}
	}

	,editUserDetailOnDblClk : function(gridPanel, selectedRecord) {
		var gridPanel2		= this.getCompanyUserSelectGrid();
		this.editUserDetail(gridPanel2, selectedRecord);
	}
    ,editUserDetailBtn : function(button) {
		var gridPanel		= this.getCompanyUserSelectGrid();
		var selectedRecord	= gridPanel.getSelectionModel().getSelection()[0];
		//console.log('editUserDetail = ' + selectedRecord);

		if (selectedRecord==null||selectedRecord=='' ){
			Ext.MessageBox.show({title: 'ERROR',
		    			msg: "Please select a User for edit!",
		    			icon: Ext.MessageBox.ERROR,
		    			buttons: Ext.Msg.OK});
			return;
		}
		this.editUserDetail(gridPanel, selectedRecord);
    }
    
	,editUserDetail : function(gridPanel, selectedRecord) {
		var userDetailForm	= this.getCompanyUserDetailForm();
		userDetailForm.newUserMode = false;

		var formRef			= userDetailForm.getForm();
		formRef.loadRecord(selectedRecord);
		var cardPanel = gridPanel.up('panel');
		var cardLayout = cardPanel.getLayout();
		cardLayout.setActiveItem(1);
		
		// In NOT "Add User mode" hide user combobox
		
		var userNameDis = formRef.findField('userNameDis');
		userNameDis.show();
		var userNameComboField = formRef.findField('userNameCombo');
		userNameComboField.hide();

		//button switch
		var salesManagerField = formRef.findField('salesManager');
		var isSalesManager= salesManagerField.getValue();
		if (isSalesManager){
			Ext.getCmp('nextBtn').enable();
			Ext.getCmp('saveBtn').disable();
		}else{ 
			Ext.getCmp('nextBtn').disable();
			Ext.getCmp('saveBtn').enable();
		}
	},//eof editUserDetail
	
/*	
    editUserDetail : function(button) {
    	//debugger;
    	var me = this;
		var gridPanel		= this.getCompanyUserSelectGrid();
		var selectedRecord	= gridPanel.getSelectionModel().getSelection()[0];
		//console.log('editUserDetail = ' + selectedRecord);

		if (selectedRecord==null||selectedRecord=='' ){
			Ext.MessageBox.show({title: 'ERROR',
		    			msg: "Please select a User for edit!",
		    			icon: Ext.MessageBox.ERROR,
		    			buttons: Ext.Msg.OK});
			return;
		}
		selectUserId= selectedRecord.get('userCode');
		selectUserName= selectedRecord.get('userName');
		status= selectedRecord.get('status');
		//TODO - <AP> why they do two calls this and form load: this.sendPramsToServer(url,selectUserId,selectUserName,status);
		var userDetailForm = this.getCompanyUserDetailForm();
		//TODO - <AP> because form.load failed, load CompanyUserSelectGrid with full record required by CompanyUserDetailForm
		//userDetailForm.getForm().loadRecord(selectedRecord);
		
		
		 //TODO - <AP> form.load  send proper POST request, receive proper JSON... and get to failed callback (on parse?)
		 //TODO - <AP> - try to insert "success":true into response next to "data":{} - DOES NOT WORK 
		  userDetailForm.getForm().load({	url: 'json/companyUserDetailsAction?m=read'
										,params :{pram1:selectUserId, pram2:selectUserName,pram3:status}
										,failure: function(form, action){
											var failureType = action.failureType;
											var response = action.response;
											var result = action.result;
											var type = action.type;

											Ext.MessageBox.show({title: 'userDetailForm load fail',
										    			msg: "failureType = "+ failureType+"\n response = "+response +"\nresult = "+result +"\ntype = "+type,
										    			icon: Ext.MessageBox.ERROR,
										    			buttons: Ext.Msg.OK});
										}

										,success: function(form, action){
																		alert('');
																		//console.log('userDetailForm load succeed');
																    	var gridPanel	= me.getCompanyUserSelectGrid();
																		var cardPanel 	= gridPanel.up('panel');
																		var cardLayout 	= cardPanel.getLayout();
																		cardLayout.setActiveItem(0);
																		//TODO - <AP> try to find out how to set record back to store so it will not be require send request
																		//reload grid so edited record will be refreshed in grid
																		var store		= gridPanel.getStore();
																		store.load();
																		gridPanel.getView().refresh();
																		//console.log('gridPanel.getView().refresh()');
																		}
										//,waitMsg: 'Loading User Details...'
										});
		
//TODO - <AP> move to callback
//		var cardPanel = gridPanel.up('panel');
//		var cardLayout = cardPanel.getLayout();
//		cardLayout.setActiveItem(1);
		
		//button switch
		var salesManagerField = userDetailForm.getForm().findField('salesManager')
		var isSalesManager= salesManagerField.getValue();
		if (isSalesManager){
			Ext.getCmp('nextBtn').enable();
			Ext.getCmp('saveBtn').disable();
		}else{ 
			Ext.getCmp('nextBtn').disable();
			Ext.getCmp('saveBtn').enable();
		}
	},//eof editUserDetail
*/
	sendPramsToServer: function(url,value1,value2,value3){
		Ext.Ajax.request({
			url : url,
			method: 'POST',
			params :{pram1:value1, pram2:value2,pram3:value3}               
	      });
	}

});
