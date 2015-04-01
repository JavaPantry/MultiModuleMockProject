var dealerGroupDetailsControllerRef = null;
Ext.define('Fast.controller.company.DealerGroupController', {
    extend: 'Ext.app.Controller',
    stores: [ 'company.DealerGroup'
             ,'company.DealerGroupDetail']
    ,models: ['company.DealerGroupModel']
    ,views: ['company.DealerGroupView'
            ,'company.DealerGroupGrid'
            ,'company.DealerGroupEdit'
            ,'company.DealerGroupDetailView'
            ,'company.DealerGroupDetailGrid'
            ,'company.DealerGroupDetailCreateWnd'
            ,'company.DealerGroupDetailLookupGrid']


    ,refs: [ {ref:'DealerGroupGrid',selector:'DealerGroupGrid'}
    		,{ref:'DealerGroupEdit',selector:'DealerGroupEdit'}
    		,{ref:'DealerGroupDetailView',selector:'DealerGroupDetailView'}
    		,{ref:'DealerGroupDetailGrid',selector:'DealerGroupDetailGrid'}
    		,{ref:'DealerGroupDetailCreateWnd',selector:'DealerGroupDetailCreateWnd'}
    		,{ref:'DealerGroupDetailLookupGrid',selector:'DealerGroupDetailLookupGrid'}]

    ,init: function() {
        this.control({
        				'DealerGroupGrid dataview': {itemdblclick: this.dealerGroupEdit}
			            ,'DealerGroupGrid button[action=dealerGroupCreate]': {click: this.dealerGroupCreate}
			            ,'DealerGroupGrid button[action=dealerGroupDelete]': {click: this.dealerGroupDelete}
			            ,'DealerGroupGrid button[action=dealerGroupEditDetails]': {click: this.dealerGroupEditDetails}
			            
			            ,'DealerGroupEdit button[action=back]': {click: this.dealerGroupEditBack}
			            ,'DealerGroupEdit button[action=save]': {click: this.dealerGroupEditSave}
			            ,'DealerGroupEdit button[action=next]': {click: this.dealerGroupEditNext}
			            
			            ,'DealerGroupDetailGrid button[action=dealerGroupDetailsAdd]': {click: this.dealerGroupDetailsAdd}
			            ,'DealerGroupDetailGrid button[action=dealerGroupDetailsDelete]': {click: this.dealerGroupDetailsDelete}
			            ,'DealerGroupDetailGrid button[action=dealerGroupDetailsCancel]': {click: this.dealerGroupDetailsCancel}

			            ,'DealerGroupDetailCreateWnd button[action=dealerGroupDetailCreateWndCancel]': {click: this.dealerGroupDetailCreateWndCancel}
			            ,'DealerGroupDetailCreateWnd button[action=dealerGroupDetailCreateWndSave]': {click: this.dealerGroupDetailCreateWndSave}
			            ,'DealerGroupDetailCreateWnd button[action=dealerGroupDetailCreateWndLookup]': {click: this.dealerGroupDetailCreateWndLookup}
						,'DealerGroupDetailLookupGrid dataview' :	{itemdblclick: this.selectDealerCCI}

			        });
    }
//************* DealerGroupDetailCreateWnd Action Handlers *************

,dealerGroupDetailCreateWndCancel : function(button){
	var wnd			= button.up('window');
	var cardPanel	=	button.up('panel');
	var cardLayout	=	cardPanel.getLayout();
	
	var saveBtn		= wnd.down('#dealerGroupDetailCreateWndSave');
	var cancelBtn	= wnd.down('#dealerGroupDetailCreateWndCancel');
	var lookupBtn	= wnd.down('#dealerGroupDetailCreateWndLookup');
	saveBtn.setDisabled(false);
	cancelBtn.setDisabled(false);
	lookupBtn.setDisabled(false);

	var idx = cardPanel.items.indexOf(cardLayout.getActiveItem());
	if(idx == 0){
		var wnd = button.up('window');
		wnd.close();
	}else{
		cardLayout.setActiveItem(0);
	}
}

,dealerGroupDetailCreateWndSave : function(button){
    var wnd				= button.up('window');
    var form			= wnd.down('form');
    var formRef			= form.getForm();
    if (!formRef.isValid()) 
		return;
    var values			= form.getValues();
	var dealerGroupDetailStore = this.getCompanyDealerGroupDetailStore();
	var dealerGroupDetailRecord = Ext.create('Fast.model.company.DealerGroupDetailModel');
	dealerGroupDetailRecord.set(values);
	dealerGroupDetailStore.add(dealerGroupDetailRecord);
	var syncOptions = {	theStore:dealerGroupDetailStore,
						wnd:wnd,
						success:this.saveDealerGroupDetailSyncCallback,
						failure:this.saveDealerGroupDetailFailureSyncCallback};
	dealerGroupDetailStore.sync(syncOptions);
}

,saveDealerGroupDetailSyncCallback:function (batch, syncOptions){
	syncOptions.theStore.load();
	syncOptions.wnd.close();
}

,saveDealerGroupDetailFailureSyncCallback:function (batch, syncOptions){
	syncOptions.theStore.load();
}

,dealerGroupDetailCreateWndLookup : function(button){
    var wnd    = button.up('window');
    var form   = wnd.down('form');
    var values = form.getValues();
	
	var cardPanel	=	button.up('panel');
	var cardLayout	=	cardPanel.getLayout();
	
	var saveBtn		= wnd.down('#dealerGroupDetailCreateWndSave');
	var cancelBtn	= wnd.down('#dealerGroupDetailCreateWndCancel');
	var lookupBtn	= wnd.down('#dealerGroupDetailCreateWndLookup');

	var idx = cardPanel.items.indexOf(cardLayout.getActiveItem());

	cardLayout.setActiveItem(1);
	saveBtn.setDisabled(true);
	lookupBtn.setDisabled(true);
	
	var lookupGrid	= this.getDealerGroupDetailLookupGrid()  
	var lookupStore	= lookupGrid.getStore();
	var filterStr ='';
	lookupStore.clearFilter(true);
	if (!(values.dealerCode == null || values.dealerCode == undefined || values.dealerCode == '')){
		//lookupStore.filter([{property:"dealerCode", value: values.dealerCode, type:'string'}]);
		filterStr+="{property:'dealerCode',value: values.dealerCode}";
	}
	if (!(values.dealerType == null || values.dealerType == undefined || values.dealerType == '')){
		if(filterStr.length > 0) filterStr+=',';
		//lookupStore.filter('dealerType', values.dealerType);
		filterStr+="{property:'dealerType',value: values.dealerType}";
	}
	if(filterStr.length > 0){
		var filters = eval('['+filterStr+']');
		lookupStore.filter(filters);
	}
	lookupStore.load();//.filter([{field:"dealerCode", value: values.dealerCode, type:'string'}]);
}

,selectDealerCCI: function(grid, record) {
    if(record == 'undefined' || record ==null)
    	return;
    var wnd				= grid.up('window');
    var form			= wnd.down('form');
    var values			= form.getValues();
	var formRef			= form.getForm();
	var dealerGroupIdField	= formRef.findField('dealerGroupId');
	var dealerCodeField	= formRef.findField('dealerCode');
	var dealerNameField	= formRef.findField('dealerName');
	var dealerTypeField	= formRef.findField('dealerType');
	//dealerGroupIdField.setValue(null);
	dealerCodeField.setValue(record.get('dealerCode'));
	dealerNameField.setValue(record.get('dealerName'));
	dealerTypeField.setValue(record.get('dealerType'));
	//after select dealer fill form 1st page and switch back to 1st card 
	this.dealerGroupDetailCreateWndCancel(wnd.down('#dealerGroupDetailCreateWndCancel'));
}

// ************* DealerGroupDetailGrid Action  Handlers *************
,dealerGroupDetailsAdd : function(button){
	var dealerGroupDetailView = button.up('DealerGroupDetailView');
	var dealerGroupIdField	= dealerGroupDetailView.down('#dealerGroupId');
	var dealerGroupId = dealerGroupIdField.getValue();

	var wnd		= Ext.create('Fast.view.company.DealerGroupDetailCreateWnd');
    var form	= wnd.down('form');
	var formRef	= form.getForm();
	dealerGroupIdField = formRef.findField('dealerGroupId');
	dealerGroupIdField.setValue(dealerGroupId);
}

,dealerGroupDetailsDelete : function(button){
	dealerGroupDetailsControllerRef = this;
	var dealerGroupDetailGrid =  button.up('DealerGroupDetailGrid');;
	var dealerGroupDetailStore = dealerGroupDetailGrid.getStore();
	var record = dealerGroupDetailGrid.getSelectionModel().getSelection()[0];
	if (record){
		Ext.MessageBox.confirm('Confirm', 'Are you sure to delete this record?', this.deleteDealerGroupDetailConfirm);
	}
},
    
deleteDealerGroupDetailConfirm: function(btn) {
	if (btn != "yes") return;
	//this point to  MessageBox.confirm Window
	var dealerGroupDetailGrid =  dealerGroupDetailsControllerRef.getDealerGroupDetailGrid();
	var dealerGroupDetailStore = dealerGroupDetailGrid.getStore();
	var records = dealerGroupDetailGrid.getSelectionModel().getSelection()[0];
	dealerGroupDetailStore.remove(records);
	var syncOptions = {	theStore:dealerGroupDetailStore, 
						success:this.deleteDealerGroupDetailSyncCallback,
						failure:this.deleteDealerGroupDetailFailureSyncCallback};
	dealerGroupDetailStore.sync(syncOptions);
}

,deleteDealerGroupDetailSyncCallback:function (batch, syncOptions){
    syncOptions.theStore.load();
}

,deleteDealerGroupDetailFailureSyncCallback:function (batch, syncOptions){
	syncOptions.theStore.load();
}



,dealerGroupDetailsCancel : function(button){
	var cardPanel = button.up('DealerGroupView');
	var cardLayout = cardPanel.getLayout();
	cardLayout.setActiveItem(0);
}


//************* DealerGroupEdit Action  Handlers *************
	,dealerGroupEditBack : function(button){
		var cardPanel = button.up('DealerGroupView');
		var cardLayout = cardPanel.getLayout();
		cardLayout.setActiveItem(0);
	}
	,dealerGroupEditSave : function(button){
        var dealerGroupEditPanel = button.up('DealerGroupEdit');
		var form   = dealerGroupEditPanel.down('form');
		var formRef= form.getForm();
		if (!formRef.isValid()) 
			return;

        var theStore = this.getCompanyDealerGroupStore();
		var cardPanel = button.up('DealerGroupView');
		var cardLayout = cardPanel.getLayout();
        
        formRef.submit({
     		url: 'json/DealerGroupController?m=updateDealerGroup'
     		,success: function(form, action) {
     			theStore.load();
     			cardLayout.setActiveItem(0);
	        }
	        ,failure: function(form, action) {
	        	theStore.load();
				Ext.MessageBox.show({title: 'ERROR',
									msg: 'Server side Error',//action.result.messa
									icon: Ext.MessageBox.ERROR,
									buttons: Ext.Msg.OK});
			}
        });//eof formRef.submit
        }
	
	/* save action return dealerGroup
	 * action.response.responseText
	 *  {'success':true, 'data':{"groupCode":"whatsup","groupDescription":"test next","dirty":false,"ordinal":0,"id":28,"idx":0,"version":0},'message':'Ok'}
	 * 
	 */
	,dealerGroupEditNext : function(button){
		var cardPanel = button.up('DealerGroupView');
        var dealerGroupEditPanel = button.up('DealerGroupEdit');
		var form   = dealerGroupEditPanel.down('form');
		var formRef= form.getForm();
		if (!formRef.isValid()) 
			return;
		var me = this;
		//save record (see dealerGroupEditSave) if Ok
        formRef.submit({
     		url: 'json/DealerGroupController?m=updateDealerGroup'
     		,success: function(form, action) {
     			var response = Ext.JSON.decode(action.response.responseText,false);
     			var dealerGroup = response.data; 
     			var record = Ext.create('Fast.model.company.DealerGroupModel');
     			record.set('id',dealerGroup.id);
     			record.set('groupCode',dealerGroup.groupCode);
     			record.set('groupDescription',dealerGroup.groupDescription);
     			me.fillAndShowDealerGroupDetailView(cardPanel, record);
	        }
	        ,failure: function(form, action) {
	        	var response	= Ext.JSON.decode(action.response.responseText,false);
	        	var msg			= (response.message == undefined || response.message == null)?'Server side Error':response.message;
	        	
				Ext.MessageBox.show({title: 'ERROR',
									msg: msg,
									icon: Ext.MessageBox.ERROR,
									buttons: Ext.Msg.OK});
			}
        });//eof formRef.submit
		//this.fillAndShowDealerGroupDetail(cardPanel, records[0]);
		//var cardLayout = cardPanel.getLayout();
		//cardLayout.setActiveItem(2);
	}

	// ************* DealerGroupGrid Action  Handlers *************
	,dealerGroupEditDetails : function(button){
		var dealerGroupGrid = button.up('DealerGroupGrid');
    	var records = dealerGroupGrid.getSelectionModel().getSelection();
    	var theStore = this.getCompanyDealerGroupStore();

        if (records == undefined || records.length == 0) {
			Ext.MessageBox.show({title: 'ERROR',
                    			msg: "Please select record(s) to edit!",
                    			icon: Ext.MessageBox.ERROR,
                    			buttons: Ext.Msg.OK});
    		return;
    	}
		
		var cardPanel = button.up('DealerGroupView');
		this.fillAndShowDealerGroupDetailView(cardPanel, records[0]);
	}
	,fillAndShowDealerGroupDetailView : function(cardPanel, record){
		var dealerGroupDetailView = cardPanel.down('DealerGroupDetailView');
		var dealerGroupIdField	= dealerGroupDetailView.down('#dealerGroupId');
		var dealerGroupDealerCodeField	= dealerGroupDetailView.down('#dealerCode');
		var dealerGroupDealerNameField	= dealerGroupDetailView.down('#dealerName');
		var dealerGroupId = record.get('id');
		
		dealerGroupIdField.setValue(dealerGroupId);
		dealerGroupDealerCodeField.setValue(record.get('groupCode'));
		dealerGroupDealerNameField.setValue(record.get('groupDescription'));
		var cardLayout = cardPanel.getLayout();
		cardLayout.setActiveItem(2); //DealerGroupDetailGrid
		
		var theStore = this.getCompanyDealerGroupDetailStore();
		theStore.proxy.extraParams = {dealerGroupId:dealerGroupId};
		theStore.load();
	}
	
	,dealerGroupEdit : function(grid, record) {
		var cardPanel = grid.up('DealerGroupView');
		var cardLayout = cardPanel.getLayout();
		cardLayout.setActiveItem(1);
		
		var dealerGroupEditPanel = cardPanel.down('DealerGroupEdit');
		var form   = dealerGroupEditPanel.down('form');
		var formRef= form.getForm();
		if(record){
			 formRef.loadRecord(record);
	    }
		//TODO - <AP> disable dealerCode form field
	}
    ,dealerGroupCreate : function(button){
		var cardPanel = button.up('DealerGroupView');
		var cardLayout = cardPanel.getLayout();
		cardLayout.setActiveItem(1);
		//TODO - <AP> clear form fields for new Group
		var dealerGroupEditPanel = cardPanel.down('DealerGroupEdit');
		var form   = dealerGroupEditPanel.down('form');
		var formRef= form.getForm();
		formRef.reset();
	}
    ,dealerGroupDelete : function(button){
    	dealerGroupDetailsControllerRef = this;
    	var grid = this.getDealerGroupGrid();
    	var record = grid.getSelectionModel().getSelection()[0];
    	var theStore = this.getCompanyDealerGroupStore();

        if (record == undefined ) {
			Ext.MessageBox.show({title: 'ERROR',
                    			msg: "Please select record(s) to remove!",
                    			icon: Ext.MessageBox.ERROR,
                    			buttons: Ext.Msg.OK});
    		return;
    	}
    	if (record){
    		Ext.MessageBox.confirm('Confirm', 'Are you sure to delete this record?', this.deleteDealerGroupConfirm);
    	}
    },
        
    deleteDealerGroupConfirm: function(btn) {
    	if (btn != "yes") return;
    	//this point to  MessageBox.confirm Window
    	var dealerGroupGrid =  dealerGroupDetailsControllerRef.getDealerGroupGrid();
    	var dealerGroupStore = dealerGroupGrid.getStore();
    	var record = dealerGroupGrid.getSelectionModel().getSelection()[0];
    	dealerGroupStore.remove(record);
    	var syncOptions = {	theStore:dealerGroupStore, 
    						success:this.deleteDealerGroupSyncCallback,
    						failure:this.deleteDealerGroupFailureSyncCallback};
    	dealerGroupStore.sync(syncOptions);
    }

    ,deleteDealerGroupSyncCallback:function (batch, syncOptions){
        syncOptions.theStore.load();
    }

	,deleteDealerGroupFailureSyncCallback:function (batch, syncOptions){
		syncOptions.theStore.load();
	}
    
});

