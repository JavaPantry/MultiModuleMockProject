Ext.define('Fast.controller.sales.SalesForecastController', {
    extend: 'Ext.app.Controller',

    selectedMonthSalesForecasts:new Array()
	,selectedWeekSalesForecasts:new Array()
    ,selectedWeekActualsSalesForecasts:new Array()
    
	,stores: [
              'sales.SalesForecastDealers'
             ,'sales.UploadActuals'
             
             ,'sales.SalesMonthFctExt'
             ,'sales.SalesMonthFctEditExt'
             
             ,'sales.SalesWeekFct'
             ,'sales.SalesWeekFctEdit'
             
             ,'sales.SalesWeekActualsFct'
             ,'sales.SalesWeekActualsFctEdit'//cause loading white screen error
             ]
             
    ,models: ['sales.SalesWeekFctModel']
    
    ,views: ['sales.ForecastPanel'
            ,'sales.SalesForecastDealersGrid'
            ,'sales.UploadReviewActualsGrid'
            
            ,'sales.forecast.monthextend.SalesForecastMonthlyViewExt'
            ,'sales.forecast.monthextend.MonthHomeGridExt'
            ,'sales.forecast.monthextend.MonthEditGridExt'
            ,'sales.forecast.monthextend.MonthApprovalGridExt'
            ,'sales.forecast.monthextend.MonthFctEditFormWnd'
            
            ,'sales.forecast.week.SalesForecastWeeklyView'
            ,'sales.forecast.week.WeekHomeGrid'
            ,'sales.forecast.week.WeekEditGrid'
            ,'sales.forecast.week.WeekApprovalGrid'
            ,'sales.forecast.week.WeekFctEditFormWnd'
            ,'sales.forecast.week.WeekFctActualsEditFormWnd'//TODO - <AP> should be moved to sales.forecast.weekActuals? 
            
            ,'sales.forecast.weekActuals.SalesForecastWeekActualsView'
            ,'sales.forecast.weekActuals.WeekActualsHomeGrid'
            ,'sales.forecast.weekActuals.WeekActualsEditGrid'
            ,'sales.forecast.weekActuals.WeekActualsApprovalGrid'
            
            ,'sales.EnterCommentWnd']
            
    ,refs: [{ref: 'ForecastPanel',selector: 'ForecastPanel'}
   		,{ref: 'SalesForecastDealersGrid',selector: 'SalesForecastDealersGrid'}
   		,{ref: 'UploadReviewActualsGrid',selector: 'UploadReviewActualsGrid'}
   		,{ref: 'SalesForecastMonthlyViewExt',	selector: 'SalesForecastMonthlyViewExt'}
        ,{ref: 'MonthHomeGridExt',				selector: 'MonthHomeGridExt'}
		,{ref: 'MonthEditGridExt',				selector: 'MonthEditGridExt'}
		,{ref: 'MonthApprovalGridExt',			selector: 'MonthApprovalGridExt'}
		,{ref: 'MonthFctEditFormWnd',		selector: 'MonthFctEditFormWnd'}
   		,{ref: 'SalesForecastWeeklyView',	selector: 'SalesForecastWeeklyView'}
        ,{ref: 'WeekHomeGrid',				selector: 'WeekHomeGrid'}
		,{ref: 'WeekEditGrid',				selector: 'WeekEditGrid'}
		,{ref: 'WeekApprovalGrid',			selector: 'WeekApprovalGrid'}
		,{ref: 'WeekFctEditFormWnd',		selector: 'WeekFctEditFormWnd'}
		
   		,{ref: 'SalesForecastWeekActualsView',		selector: 'SalesForecastWeekActualsView'}
   		,{ref: 'WeekActualsHomeGrid',		selector: 'WeekActualsHomeGrid'}
		,{ref: 'WeekActualsEditGrid',		selector: 'WeekActualsEditGrid'}
		,{ref: 'WeekFctActualsEditFormWnd',	selector: 'WeekFctActualsEditFormWnd'}
		/*,{ref: 'WeekActualsApprovalGrid',	selector: 'WeekActualsApprovalGrid'}
		
		,{ref: 'EnterCommentWnd',selector: 'EnterCommentWnd'}*/
		]

	,init: function() {
        this.control({
        'SalesForecastDealersGrid': {selectionchange: this.dealerSelectionChanged}
        
        ,'UploadReviewActualsGrid': {activate: this.updateUploadReviewActualsGrid}
        ,'UploadReviewActualsGrid button[action=getForecastSpreadsheetTemplate]': {click: this.getForecastSpreadsheetTemplate}
        //,'UploadReviewActualsGrid button[action=uploadForecastSpreadsheet]': {click: this.uploadForecastSpreadsheet}
        ,'UploadReviewActualsGrid button[action=uploadReviewActualsDelete]': {click: this.uploadReviewActualsDelete}
        
        // - Monthly extended
        ,'SalesForecastMonthlyViewExt': {activate: this.updateForecastHomePage}
        ,'MonthHomeGridExt button[action=selectMonthForecastExt]': {click: this.selectMonthForecastExt}
        ,'MonthHomeGridExt button[action=editMonthForecastExt]': {click: this.editMonthForecastExt}
        ,'MonthHomeGridExt button[action=gotoApproving]': {click: this.gotoApproving}
        ,'MonthHomeGridExt combobox[itemId=forecastOffsetCBox]': {change: this.changeForecastOffset}
        
        ,'MonthEditGridExt button[action=backToCurrentForecastHome]': {click: this.backToCurrentForecastHome}
        ,'MonthEditGridExt button[action=editMonthForecastExtInFormWnd]': {click: this.editMonthForecastExtInFormWnd}
        ,'MonthFctEditFormWnd button[action=monthUpdateInGrid]': {click: this.monthUpdateInGrid}
        
        
        ,'MonthEditGridExt button[action=saveForecast]': {click: this.submitMonthForecastExt}//saveMonthForecast
        ,'MonthEditGridExt button[action=submitForecast]': {click: this.submitMonthForecastExt}
        
        ,'MonthApprovalGridExt': {activate: this.updateForecastAproovalPage}
        ,'MonthApprovalGridExt button[action=Approving]': {click: this.submitMonthForecastExt}
        ,'MonthApprovalGridExt button[action=ReWork]': {click: this.submitMonthForecastExt}
        
        // - Weekly
        //,'WeekHomeGrid': {activate: this.forecastWeekPanelBtnAction}
        ,'SalesForecastWeeklyView': {activate: this.updateForecastHomePage}
        ,'WeekHomeGrid button[action=selectWeekForecast]': {click: this.selectWeekForecast}
        ,'WeekHomeGrid button[action=editWeekForecast]': {click: this.editWeekForecast}
        ,'WeekHomeGrid button[action=viewWeekForecastInFormWnd]': {click: this.viewWeekForecastInFormWnd}
        //,'WeekHomeGrid button[action=gotoApproving]': {click: this.gotoApproving}
        
        ,'WeekEditGrid button[action=backToCurrentForecastHome]': {click: this.backToCurrentForecastHome}
        ,'WeekEditGrid button[action=saveWeekForecast]': {click: this.saveWeekForecast}
        ,'WeekEditGrid button[action=submitWeekForecast]': {click: this.submitWeekForecast}
        
        // - Weekly Actuals
        ,'SalesForecastWeekActualsView': {activate: this.updateForecastHomePage}
        ,'WeekActualsHomeGrid button[action=selectWeekActualsForecast]': {click: this.selectWeekActualsForecast}
        ,'WeekActualsHomeGrid button[action=editWeekActualsForecast]': {click: this.editWeekActualsForecast}
        //,'WeekActualsHomeGrid button[action=gotoApproving]': {click: this.gotoApproving}
        
        ,'WeekActualsEditGrid button[action=backToCurrentForecastHome]': {click: this.backToCurrentForecastHome}
        ,'WeekActualsEditGrid button[action=saveForecast]': {click: this.submitWeekActualsForecast}//{click: this.saveWeekActualsForecast}
        ,'WeekActualsEditGrid button[action=submitForecast]': {click: this.submitWeekActualsForecast}
        ,'WeekActualsEditGrid button[action=viewWeekForecastInFormWnd]': {click: this.viewWeekForecastInFormWnd}        
        ,'WeekFctActualsEditFormWnd button[action=weekActualsUpdateInGrid]': {click: this.weekActualsUpdateInGrid}

        //,'WeekActualsApprovalGrid button[action=backToCurrentForecastHome]': {click: this.backToCurrentForecastHome}
        //,'WeekActualsApprovalGrid button[action=approveWeekActualsForecast]': {click: this.submitWeekActualsForecast}
        //,'WeekActualsApprovalGrid button[action=reworkWeekActualsForecast]': {click: this.submitWeekActualsForecast}
        
        // - Common
        ,'EnterCommentWnd button[action=submitApproveCommentSave]': {click: this._submitApproveCommentSave}
        });
    }
	
	,updateUploadReviewActualsGrid:function(theGrid) {
       	 var theStore = theGrid.getStore();
			 if (theStore.isFiltered())
				theStore.clearFilter();
       	 theStore.load();
     }

	//app/controller/sales/SalesForecastController.js
	,getForecastSpreadsheetTemplate: function(button){
	    var hiddenIFrameID = 'hiddenDownloader',
        iframe = document.getElementById(hiddenIFrameID);
	    if (iframe === null) {
	        iframe = document.createElement('iframe');
	        iframe.id = hiddenIFrameID;
	        iframe.style.display = 'none';
	        document.body.appendChild(iframe);
	    }
	    iframe.src = '/fast-web/resources/ForecastTemplate.xls';
	}
	
	/* implemented inline in grid
	,uploadForecastSpreadsheet: function(){}*/
	
	,uploadReviewActualsDelete: function(button){
    	var theGrid = button.up('UploadReviewActualsGrid');
    	var theStore = theGrid.getStore();
    	var records = theGrid.getSelectionModel().getSelection();
    	if (records == null || records.length == 0){
    		Ext.MessageBox.alert('Warning', 'You need to select records to delete them.');
    	}else{
    		//TODO - <AP> find all MessageBox where you pass ref to controller via global variable and FIX IT (RTFM!!!)
    		Ext.MessageBox.confirm('Confirm', 'Are you sure to delete this record?', this.deleteUploadedErrorConfirm, this);
		}
	},

    deleteUploadedErrorConfirm: function(button) {
    	if (button != "yes") return;
    	var theGrid		= this.getUploadReviewActualsGrid();
    	var theStore	= theGrid.getStore();
    	var records		= theGrid.getSelectionModel().getSelection();
    	theStore.remove(records);
    	theStore.sync();
    }
	
	,changeForecastOffset: function(field, newValue, oldValue){
		//console.log('MVC changeForecastOffset:'+newValue +',' +oldValue);
		var theGrid		= this.getMonthHomeGridExt();
		var theStore	= theGrid.getStore(); 
		theStore.proxy.api.read = 'json/SalesMonthFctController?m=readForecastForSalesExt&offset='+newValue;
		//same var theStore1	= this.getSalesSalesMonthFctExtStore();
		//this.updateForecastHomePage(this.getSalesForecastMonthlyViewExt());//also reset offsetForecastCBox
		this.getForecastsForSelectedDealers(this.getSalesForecastMonthlyViewExt().items.items[0]);
		
		theStore.proxy.api.read = 'json/SalesMonthFctController?m=readForecastForSalesExt';
	}

	
	,selectMonthForecastExt: function(button) {
		//console.log('selectMonthForecastExt');
		var theGrid =  button.up('panel');
		var theStore = theGrid.getStore();

		var selected	= this.getValidSelectRecords(theGrid); 
		if (selected==null || selected.length==0){
		 	Ext.MessageBox.alert({
		            title: 'Warning:', msg: 'Please select records with Active/ReWork status for Edit!',
		            icon: Ext.MessageBox.OK,
		            buttons: Ext.Msg.OK
		    	});
			return;
		}
		this.selectedMonthSalesForecasts.push.apply(this.selectedMonthSalesForecasts, selected);
		theGrid.getStore().remove(selected);
		//clean selection in those removed
		theGrid.getSelectionModel().deselectAll();
		var btn = this.getSalesForecastMonthlyViewExt().down('#editMonthForecastExtBtn');
		btn.enable();
		btn.show();
	}
	
	,selectWeekForecast: function(button) {
		//console.log('selectWeekForecast');
		var theGrid =  button.up('panel');
		var theStore = theGrid.getStore();

		var selected	= this.getValidSelectRecords(theGrid); 
		if (selected==null || selected.length==0){
		 	Ext.MessageBox.alert({
		            title: 'Warning:', msg: 'Please select records with Active/ReWork status for Edit!',
		            icon: Ext.MessageBox.OK,
		            buttons: Ext.Msg.OK
		    	});
			return;
		}
		this.selectedWeekSalesForecasts.push.apply(this.selectedWeekSalesForecasts, selected);
		theGrid.getStore().remove(selected);
		//clean selection in those removed
		theGrid.getSelectionModel().deselectAll();
	    //Ext.getCmp('editWeekForecastBtn').enable();
		//Ext.getCmp('editWeekForecastBtn').show();		
	}
	,selectWeekActualsForecast: function(button) {
		//console.log('selectWeekActualsForecast');
		var theGrid =  button.up('panel');
		var theStore = theGrid.getStore();

		var selected	= this.getValidSelectRecords(theGrid); 
		if (selected==null || selected.length==0){
		 	Ext.MessageBox.alert({
		            title: 'Warning:', msg: 'Please select records with Active/ReWork status for Edit!',
		            icon: Ext.MessageBox.OK,
		            buttons: Ext.Msg.OK
		    	});
			return;
		}
		this.selectedWeekActualsSalesForecasts.push.apply(this.selectedWeekActualsSalesForecasts, selected);
		theGrid.getStore().remove(selected);
		//clean selection in those removed
		theGrid.getSelectionModel().deselectAll();
 		var btn = this.getSalesForecastWeekActualsView().down('#editWeekActualsForecastBtn');
		btn.enable();
		btn.show();
	}
	,getValidSelectRecords : function(grid){
		var listValues = new Array();
		var selectedRecords = grid.getSelectionModel().getSelection();
		var size = selectedRecords.length;
	
		for (var i=0;i<size;i++){
			var status = selectedRecords[i].get('accountStatus');
			//if (status == "Active" || status == "ReWork"){ 
				listValues.push(selectedRecords[i]);
			//}
		}
		return listValues;
	}

	,backToCurrentForecastHome: function(button) {
		//console.log('backToCurrentForecastHome');
		
	    this.selectedMonthSalesForecasts		= new Array();
		this.selectedWeekSalesForecasts			= new Array();
	    this.selectedWeekActualsSalesForecasts	= new Array();

		
		//Ext.getCmp('editWeekForecastBtn').hide();
		//Ext.getCmp('editWeekActualsForecastBtn').hide();

		this.getSalesForecastMonthlyViewExt().down('#editMonthForecastExtBtn').hide();
		this.getSalesForecastWeekActualsView().down('#editWeekActualsForecastBtn').hide();

		this.updateForecastHomePage(this.getSalesForecastMonthlyViewExt());
		this.updateForecastHomePage(this.getSalesForecastWeeklyView());
		this.updateForecastHomePage(this.getSalesForecastWeekActualsView());
		
		var theGrid =  button.up('panel');
		var cardPanel = theGrid.up('panel');
		var cardLayout = cardPanel.getLayout();
		cardLayout.setActiveItem(0);
	}

	,editMonthForecastExt : function(button) {
		//console.log('editMonthForecastExt');
		var theGrid =  button.up('panel');
		var cardPanel = theGrid.up('panel');
		var cardLayout = cardPanel.getLayout();
		
		var editGrid = this.getMonthEditGridExt();
		var editStore	= editGrid.getStore();
		editStore.removeAll();
		editStore.add(this.selectedMonthSalesForecasts);
		editStore.updateHeader(this.selectedMonthSalesForecasts);
		this.selectedMonthSalesForecasts = new Array();
		cardLayout.setActiveItem(1);
	}

	,editWeekForecast: function(button) {
		//console.log('editWeekForecast');
		var theGrid =  button.up('panel');
		var cardPanel = theGrid.up('panel');
		var cardLayout = cardPanel.getLayout();
		
		var editGrid = this.getWeekEditGrid();
		var editStore	= editGrid.getStore();
		editStore.removeAll();
		editStore.add(this.selectedWeekSalesForecasts);//TODO - <AP> selectedWeekSalesForecasts
		this.selectedWeekSalesForecasts = new Array();
		cardLayout.setActiveItem(1);
	}
	,editWeekActualsForecast: function(button) {
		//console.log('editWeekActualsForecast');
		var theGrid =  button.up('panel');
		var cardPanel = theGrid.up('panel');
		var cardLayout = cardPanel.getLayout();
		
		var editGrid = this.getWeekActualsEditGrid();
		var editStore	= editGrid.getStore();
		editStore.removeAll();
		editStore.add(this.selectedWeekActualsSalesForecasts);//TODO - <AP> selectedWeekActualsSalesForecasts
		this.selectedWeekActualsSalesForecasts = new Array();
		cardLayout.setActiveItem(1);		
	}
	,updateForecastAproovalPage: function(tab){
		//console.log('Controller\'s updateForecastAproovalPage ');
		var theGrid = tab;
		var theStore = theGrid.getStore();
		theStore.load();
	}
	,gotoApproving: function(button) {
		//console.log('gotoApproving2');
		var theGrid =  button.up('panel');
		var cardPanel = theGrid.up('panel');//this is View with card layout
		//var approvalGrid = cardPanel.down('MonthApprovalGridExt');//selector by xtype (by itemId would use ('#id'))
		//more generic
		var approvalGrid = cardPanel.items.items[2];
		this.getForecastsForSelectedDealers(approvalGrid);//this.getSalesForecastMonthlyViewExt().items.items[0]);
		//var approvalStore = approvalGrid.getStore();
		//approvalStore.load();
		var cardLayout = cardPanel.getLayout();
		cardLayout.setActiveItem(2);
	}
	
	

	,monthUpdateInGrid : function(button) {
		var wnd = button.up('window');
		var record	= wnd.record;
		var theGrid = wnd.down('#valueCommentsTable');
		var theStore= theGrid.getStore(); 
		var storeRecords = theStore.data.items;
		for(var i = 0;i<storeRecords.length;i++){
    		var editRecord = storeRecords[i];
    		var value = editRecord.get('CF');
    		record.set('CF'+(i+1),value);
    		value = editRecord.get('comments');
    		record.set('comment'+(i+1),value );
		}
		wnd.close();
	}
	//TODO - <AP> implelment weekActualsUpdateInGrid
	,weekActualsUpdateInGrid: function(button) {
		var wnd = button.up('window');
		var record	= wnd.record;
		var theGrid = wnd.down('#valueCommentsTable');
		var theStore= theGrid.getStore(); 
		var storeRecords = theStore.data.items;
		for(var i = 0;i<storeRecords.length;i++){
    		var editRecord = storeRecords[i];
    		var value = editRecord.get('unit');
    		record.set('unit'+(i+1),value);
    		value = editRecord.get('dollar');
    		record.set('dollar'+(i+1),value);
    		value = editRecord.get('comments');
    		record.set('comment'+(i+1),value );
		}
		wnd.close();
	}
	,viewWeekForecastInFormWnd: function(button) {
		var theForecastGrid = button.up('panel');
		var notActuals;
		if (theForecastGrid.xtype == 'WeekHomeGrid'){
			notActuals = true;
		}else{
			notActuals = false;
		}
		var theForecastStore = theForecastGrid.getStore();
		var records		= theForecastGrid.getSelectionModel().getSelection();
		if (records == null || records.length == 0 ){
			this.alertMsg('FAILURE:', 'Select records for edit');
			return;
		}
		var record = records[0];
		var wnd;
		if(notActuals == true){
			wnd = Ext.create('Fast.view.sales.forecast.week.WeekFctEditFormWnd');
		}else{
			wnd = Ext.create('Fast.view.sales.forecast.week.WeekFctActualsEditFormWnd');
		}
		
		wnd.record = record; 
		
		//console.log('dealer name = '+ record.get('dealerName'));
		wnd.down('#dealerName').setValue(record.get('dealerName'));
		wnd.down('#salesPerson').setValue(record.get('salesByAcct.salesPerson.userName'));
		wnd.down('#mgmtGrp').setValue(record.get('mgmtGrp'));
		wnd.down('#itemCategory').setValue(record.get('itemCategory'));
		wnd.down('#itemCode').setValue(record.get('itemCode'));
		wnd.down('#itemName').setValue(record.get('salesByAcct.product.itemName'));
		wnd.down('#statusDescription').setValue(record.get('statusDescription'));
		wnd.down('#year').setValue(record.get('year'));
		wnd.down('#month').setValue(record.get('month'));
		
		wnd.down('#record1stHalf').setValue(record.get('firstHalf'));
		wnd.down('#record2ndHalf').setValue(record.get('secondHalf'));
		//wnd.down('#secondYearFirstHalf').setValue(record.get('secondYearFirstHalf'));
		//wnd.down('#secondYearSecondHalf').setValue(record.get('secondYearSecondHalf'));
		//wnd.down('#startHalf').setValue(record.get('startHalf'));
		 
		
		var theGrid = wnd.down('#valueCommentsTable');
		var theStore= theGrid.getStore(); 
		//Ext.data.Record
		var storeRecords = theStore.data.items;
		 for (var j=0; j< 5;j++){
    		var editRecord = storeRecords[j];
    		var value;
    		if (notActuals ==false){
        		value = record.get('unit'+(j+1));
        		editRecord.set('unit', value );
    		}
    		value = record.get('dollar'+(j+1));
    		editRecord.set('dollar', value );
    		value = record.get('comment'+(j+1));
    		editRecord.set('comments',value);
    	}
		wnd.show();
	}
	,editMonthForecastExtInFormWnd: function(button) {
		var theForecastGrid = button.up('panel');
		var theForecastStore = theForecastGrid.getStore();
		var records		= theForecastGrid.getSelectionModel().getSelection();
		if (records == null || records.length == 0 ){
			this.alertMsg('FAILURE:', 'Select records for edit');
			return;
		}
		var record = records[0];
		
		var wnd = Ext.create('Fast.view.sales.forecast.monthextend.MonthFctEditFormWnd');
		wnd.record = record; 
		
		//console.log('dealer name = '+ record.get('dealerName'));
		wnd.down('#dealerName').setValue(record.get('dealerName'));
		wnd.down('#salesPerson').setValue(record.get('salesByAcct.salesPerson.userName'));
		wnd.down('#mgmtGrp').setValue(record.get('mgmtGrp'));
		wnd.down('#itemCategory').setValue(record.get('itemCategory'));
		wnd.down('#itemCode').setValue(record.get('itemCode'));
		wnd.down('#itemName').setValue(record.get('salesByAcct.product.itemName'));
		wnd.down('#statusDescription').setValue(record.get('statusDescription'));
		wnd.down('#year').setValue(record.get('year'));

		wnd.down('#record1stHalf').setValue(record.get('firstHalf'));
		wnd.down('#record2ndHalf').setValue(record.get('secondHalf'));
		wnd.down('#secondYearFirstHalf').setValue(record.get('secondYearFirstHalf'));
		wnd.down('#secondYearSecondHalf').setValue(record.get('secondYearSecondHalf'));
		wnd.down('#startHalf').setValue(record.get('startHalf'));
		 
		
		var theGrid = wnd.down('#valueCommentsTable');
		var theStore= theGrid.getStore(); 
		//Ext.data.Record
		var storeRecords = theStore.data.items;
		 for (var j=0; j< theForecastGrid.columns.length;j++){
    		var c = theForecastGrid.columns[j];
    		if(c.fastItemId == undefined) continue;
    		var monthId = c.fastItemId.split('/');// months columns have ids in format '0/##'
    		
    		var monthColumnIdx = eval(monthId[1]);
    		var editRecord = storeRecords[monthColumnIdx];
    		var value = c.text;
    		editRecord.set('month',value);
    		value = record.get('CF'+(monthColumnIdx+1));
    		editRecord.set('CF', value );
    		value = record.get('comment'+(monthColumnIdx+1));
    		editRecord.set('comments',value);
    	}
		wnd.show();
	}
	,submitMonthForecastExt: function(button) {
		var theGrid = button.up('panel');
		var requestData		= new Object;
		requestData.className	= 'ca.canon.fast.model.impl.SalesMonthFct';//'SalesMonthFctExt' - 
	    requestData.command = button.action;//button.actionCommand;
	    requestData.url		= 'json/SalesMonthFctController?m=submitForecast';//submitForecastExt';
	    if(button.action!='ReWork' && button.action != 'Approving'){
	    	requestData.gridToUpdate = 'month';//this.getSalesForecastMonthlyViewExt();// set reference to UI in object marshaled to JSON cause recursive error
	    }else{
	    	requestData.gridToUpdate = 'approvalForecast'; 	
	    }
		this._submitForecast(theGrid, requestData);
	}

	,submitWeekActualsForecast: function(button) {
		var theGrid = button.up('panel');
		var requestData		= new Object;
		requestData.className	= 'ca.canon.fast.model.impl.SalesWeekFct';
	    requestData.command = button.action;//button.actionCommand;
	    requestData.url		= 'json/SalesWeekFctController?m=submitForecast';//'json/SalesWeekFctController?m=submitForecast';
	    requestData.gridToUpdate = 'weekActuals';//this.getSalesForecastWeekActualsView(); // set reference to UI in object marshaled to JSON cause recursive error
	    this._submitForecast(theGrid, requestData);		
	}
	
	/*,submitWeekForecast: function(button) {
	//console.log('submitWeekForecast');
	var theGrid = button.up('panel');
	var requestData		= new Object;
	requestData.className	= 'ca.canon.fast.model.impl.SalesWeekFct';		
    requestData.command = button.action;//button.actionCommand;
    requestData.url		= 'json/SalesMonthFctController?m=submitForecast';
    requestData.gridToUpdate = 'week';//this.getSalesForecastWeeklyView();// set reference to UI in object marshaled to JSON cause recursive error
    this._submitForecast(theGrid, requestData);		
	}*/


	
	/*
	 * Right now Product and Sales send array of ids for approval/rework. this doesn't work with composite 18-months forecast because such forecast contains 2 actual records from database
	 * to send ids in same fashion we need to retrieve 2nd id from composite 18-months forecast
	 * 
	 * Current fix: - send secondSalesMonthFctId along with main month forecast id (see below)
	 */
	,_submitForecast: function(theGrid, requestData) {
		var theStore = theGrid.getStore();
		
		var records		= theGrid.getSelectionModel().getSelection();
		if (records == null || records.length == 0 ){
			this.alertMsg('FAILURE:', 'Select records to submit, approve or rework');
			return;
		}
		
	    requestData.idsToApprove = [];
	    requestData.entities = [];
	    var deniedForecasts = [];
	    for (var i=0;i<records.length;i++){
	    	var status = records[i].data.statusType.data.id;
	    	var forecastId = records[i].get('id');
	    	var secondForecastId = records[i].get('secondSalesMonthFctId');
	    	//Can't execute actionCommands 'rework','approve' against forecasts with status 2-draft 5-rework, 6-active
	    	if((requestData.command == 'ReWork' || requestData.command == 'Approving') && 
	    		(status == 2 || status == 5 || status == 6)){
	    		deniedForecasts.push(forecastId);
	    		continue;
	    	}
			requestData.idsToApprove.push(forecastId);
			if(secondForecastId != undefined)
				requestData.idsToApprove.push(secondForecastId);
			
			records[i].data.dirty = records[i].dirty;
			requestData.entities.push(records[i].data);
		}
	    
	    
	    if(deniedForecasts.length != 0){
	    	var msg = 'Forecasts in active, draft or rework status will be ignored : ['+ deniedForecasts+'].';
	    	if(requestData.idsToApprove.length == 0){
	    		msg += '\n No valid Forecasts selected.';
	    	}
	    	this.alertMsg('Warning:', msg);
		}
		if(requestData.idsToApprove.length == 0){
			return;
		}
		//console.log('submitMonthForecast ends with requestData = '+requestData);
		
		var editWnd = Ext.create('Fast.view.sales.EnterCommentWnd');
		editWnd.requestData		= requestData; 
		editWnd.theController	= this;
		var response = editWnd.show();//to follow see _submitApproveCommentSave callback
	}//eof _submitForecast
	
	,_submitApproveCommentSave: function(button) {
		var editWnd = button.up('window');
		var theForm = editWnd.down('form');
		theForm = theForm.getForm();
		
		var commentField = theForm.findField('comment');
		var commentValue = commentField.getValue(); 
		var actionCommand = editWnd.requestData.command;
		//console.log('submitMonthForecast with cmd = '+actionCommand);
		
		if (actionCommand == 'ReWork' && commentValue == ''){
			commentField.markInvalid('Rework action require comment');
			return;
		}
		editWnd.requestData.approvalComments = commentValue;
		Ext.Ajax.request({
	        method: 'POST',
	        url: editWnd.requestData.url,//'json/SalesMonthFctController?m=submitForecast',
	        jsonData: editWnd.requestData,
	        timeout:120000,
	        success: function(response,request) {
	        	editWnd.theController._updateHomeView(editWnd);
	        },
	        failure: function(response,request){
	        	editWnd.theController._updateHomeView(editWnd);
	        	editWnd.theController.alertMsg('AJAX FAILURE:','Unable to change selected records for the reason: '+response.responseText);
	        }
	    }
		);
		editWnd.close();
	}
	
	/*
	 * The handler on backToHome button (in any case user have to use it to return back to home page) do same same update without these tricky hacks 
	 * 
	 */
	,_updateHomeView: function(editWnd){
		var view;
		switch(editWnd.requestData.gridToUpdate){
		case 'month':		view = editWnd.theController.getSalesForecastMonthlyViewExt();break;
		case 'week':		view = editWnd.theController.getSalesForecastWeeklyView();break;
		case 'weekActuals':	view = editWnd.theController.getSalesForecastWeekActualsView();break;
		case 'approvalForecast':view = editWnd.theController.getSalesForecastMonthlyViewExt();
								var theStore = view.getStore();
								theStore.load();
								return;
		}
		editWnd.theController.updateForecastHomePage(view);
	}

    ,findColumnByDataIndex: function (grid, dataIndex) {
        var selector = "gridcolumn[dataIndex=" + dataIndex + "]";
        return grid.down(selector);
    }
    
    ,dealerSelectionChanged : function(model, records) { 
    	var forecastPanel = this.getForecastPanel();
		var theSalesForecastMonthlyViewExt	= forecastPanel.down('SalesForecastMonthlyViewExt');
		var theSalesForecastWeeklyView		= forecastPanel.down('SalesForecastWeeklyView');
		var theSalesForecastWeekActualsView	= forecastPanel.down('SalesForecastWeekActualsView');
		if (records.length == 0 ){
			theSalesForecastMonthlyViewExt.setDisabled(true);
			theSalesForecastWeeklyView.setDisabled(true);
			theSalesForecastWeekActualsView.setDisabled(true);
			return;
		}
		theSalesForecastMonthlyViewExt.setDisabled(false);
		theSalesForecastWeeklyView.setDisabled(false);
		theSalesForecastWeekActualsView.setDisabled(false);
    }    
	
	,updateForecastHomePage : function(tab){
		//console.log('Controller\'s updateForecastHomePage handler tab.items.items[0] = '+tab.items.items[0]);
		var monthHomeGridExt	= tab.items.items[0];
		var offetForecastCBox	= monthHomeGridExt.down('#forecastOffsetCBox');
		if (offetForecastCBox != undefined){//this component exists only on MonthHomeGridExt
			offetForecastCBox.setValue('0');
		}
		var result = this.getForecastsForSelectedDealers(tab.items.items[0]);
	}

	/**
	 * 
	 * @param srcDealerGrid
	 * @param dstForecastGrid
	 * @param requestUrl 'json/SalesMonthFctController?m=readForecastForSales'
	 * @returns {Boolean} - false if no selected records
	 * 
	 * example: var result = getForecastsForSelectedDealers(,,'json/SalesMonthFctController?m=readForecastForSales');
	 */
	,getForecastsForSelectedDealers : function( dstForecastGrid/*, requestUrl*/){
		var srcDealerGrid	= this.getSalesForecastDealersGrid()
		var records			= srcDealerGrid.getSelectionModel().getSelection();
		if (records == null || records.length == 0 ){
			this.alertMsg('Error:','Dealer(s) must be selected');
			return false;
		}
		
		var requestData = new Object;
        requestData.command = "forecast";
        requestData.dealers = [];
        
        for (var i=0;i<records.length;i++){
        	var dealerData  = new Object;
        	dealerData.dealerId		= records[i].data.dealerId;
        	dealerData.dealerName	= records[i].data.dealerName;
        	dealerData.salesIds		= records[i].data.salesIds.split(',');
			requestData.dealers.push(dealerData);
		}
        var theStore = dstForecastGrid.getStore();
        theStore.proxy.jsonData = requestData;
        theStore.load();//http://stackoverflow.com/questions/1987305/attaching-jsondata-to-the-call-of-loading-a-jsonstore-in-extjs-via-post-request?rq=1
		return true;
	}	

	,alertMsg:function(title, message){
		Ext.MessageBox.show({
            title: title,
            msg: message,
            icon: Ext.MessageBox.ERROR,
            buttons: Ext.Msg.OK
        });	
	}
	
});

