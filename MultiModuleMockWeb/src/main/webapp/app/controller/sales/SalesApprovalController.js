Ext.define('Fast.controller.sales.SalesApprovalController', {
    extend: 'Ext.app.Controller',

    //TODO - <AP>  Application not loaded if store defined in sepearate js-file
    stores: ['sales.AccountApproval'],

    models: ['sales.AccountApprovalModel'],

    views: ['sales.SalesApprovalGrid',
            'sales.SalesProductByAccountGrid'],
            
    refs: [{ref: 'SalesApprovalGrid', selector: 'SalesApprovalGrid'},
           {ref: 'SalesProductByAccountGrid', selector: 'SalesProductByAccountGrid'}],

    init: function() {
        this.control({
            'SalesApprovalGrid button[action=accountApproval]': {click: this.directAjaxAccountApproval},
	        'SalesApprovalGrid button[action=accountReWork]': {click: this.directAjaxAccountReWork}
        });
    },
    /**
     * AlexeiP:
     * directAjaxAccountApproval unlike accountApproval send only ids and comment
     * sends : {'approvalComments':'approver's comments'},{id0:id},{id1:id},{id2:id}...
     * @param button
     */
    directAjaxAccountApproval: function(button) {
    	var grid = this.getSalesApprovalGrid();
    	records = grid.getSelectionModel().getSelection();
    	if (records.length == 0) {
    		alert("Please select record(s) to approve.");
    		return;
    	}
        var approvalCommentsField = Ext.getCmp('accountApprovalGridCommentsId');
      //AP - do not check approvalCommentsField for approval
//        if (approvalCommentsField.getValue() == ""){
//        	approvalCommentsField.markInvalid("This field is required");
//        	return;
//        }

        var requestData = new Object;
        requestData.command = "Approving";
        requestData.approvalComments = approvalCommentsField.getValue();
        requestData.idsToApprove = [];
  	    for (var i = 0; i < records.length ; i++){
   	    	requestData.idsToApprove.push(records[i].data.sequenceNumber);
   	    }
  	    var store = this.getSalesAccountApprovalStore();
   	    Ext.Ajax.request({
   	        method: 'POST',
   	        url: 'json/commonSales?m=ajaxUpdateAccountApproval&actionFlag=' + 1,
   	        jsonData: requestData,
   	        timeout:120000,
   	        success: function(response,request) {
   	        	var theGrid = Ext.getCmp('SalesApprovalGrid');
            	var theStore = theGrid.store;
            	theStore.load();
   	        },
   	        failure: function(response,request){
				Ext.MessageBox.show({
	                    title: 'AJAX FAILURE:',
	                    msg: 'Unable to change selected records for the reason: '+response.responseText,
	                    icon: Ext.MessageBox.ERROR,
	                    buttons: Ext.Msg.OK
	                });
   	        } 
   	    });
	    approvalCommentsField.reset();
        //sm.toggleUiHeader(false);// var sm do not exists anymore
	    grid.getSelectionModel().toggleUiHeader(false);
	    
    },

    /**
     * directAjaxAccountReWork unlike accountReWork send only ids and comment
     * sends : {'approvalComments':'approver's comments'},{id0:id},{id1:id},{id2:id}...
     * @param button
     * @see directAjaxAccountApproval
     */
    directAjaxAccountReWork: function(button) {
    	var grid = this.getSalesApprovalGrid();
    	records = grid.getSelectionModel().getSelection();
    	//alert("sm.hasSelection()"+sm.hasSelection()+" vs. records.length = "+records.length); 
    	if (records.length == 0) {
    		alert("Please select record(s) to approve.");
    		return;
    	}
        // field value check
        var approvalCommentsField = Ext.getCmp('accountApprovalGridCommentsId');
        if (approvalCommentsField.getValue() == ""){
        	approvalCommentsField.markInvalid("This field is required");
        	return;
        }
        var requestData = new Object;
        requestData.command = "ReWork";
        requestData.approvalComments = approvalCommentsField.getValue();
        requestData.idsToApprove = [];
  	    for (var i = 0; i < records.length ; i++){
   	    	requestData.idsToApprove.push(records[i].data.sequenceNumber);
   	    }
  	    var store = this.getSalesAccountApprovalStore();
   	    Ext.Ajax.request({
   	        method: 'POST',
   	        url: 'json/commonSales?m=ajaxUpdateAccountApproval&actionFlag=' + 2,
   	        jsonData: requestData,
   	        timeout:120000,
   	        success: function(response,request) {
   	        	var theGrid = Ext.getCmp('SalesApprovalGrid');
            	var theStore = theGrid.store;
            	theStore.load();
   	        },
   	        failure: function(response,request){
				Ext.MessageBox.show({
	                    title: 'AJAX FAILURE:',
	                    msg: 'Unable to change selected records for the reason: '+response.responseText,
	                    icon: Ext.MessageBox.ERROR,
	                    buttons: Ext.Msg.OK
	            });
   	        } 
   	    });
	    approvalCommentsField.reset();
	    grid.getSelectionModel().toggleUiHeader(false);
    }
    

});


