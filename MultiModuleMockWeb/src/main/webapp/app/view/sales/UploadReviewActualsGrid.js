var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToMoveEditor: 1,
        autoCancel: false
    });

Ext.define('Fast.view.sales.UploadReviewActualsGrid' ,{
    extend:'Ext.grid.Panel',
    alias :'widget.UploadReviewActualsGrid',
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    requires:['Ext.toolbar.Paging'],
    columnLines: true,
    store: 'sales.UploadActuals',

    /*    features: [{
				ftype: 'filters', encode: 'encode', // json encode the filter query
				filters: [{type: 'string',dataIndex:'ProductId'},
				          {type: 'string',dataIndex:'DealerId'}]
				}],*/

    columns: [

			  	{text:'itemCode',flex:1,dataIndex:'itemCode'},	
				{text:'codeNumber',flex:1,dataIndex:'codeNumber'},

				{text:'year',flex:1,dataIndex:'year'},
				{text:'month',flex:1,dataIndex:'month'},
				
				{text:'dollar1',flex:1,dataIndex:'dollar1'},
				{text:'unit1',flex:1,dataIndex:'unit1'},
				{text:'dollar2',flex:1,dataIndex:'dollar2'},
				{text:'unit2',flex:1,dataIndex:'unit2'},
				{text:'dollar3',flex:1,dataIndex:'dollar3'},
				{text:'unit3',flex:1,dataIndex:'unit3'},
				{text:'dollar4',flex:1,dataIndex:'dollar4'},
				{text:'unit4',flex:1,dataIndex:'unit4'},
				{text:'dollar5',flex:1,dataIndex:'dollar5'},
				{text:'unit5',flex:1,dataIndex:'unit5'},
				{text:'actualType',flex:1,dataIndex:'actualType'},
				
				{text:'',flex:1,dataIndex:'createOn'},
				{text:'',flex:1,dataIndex:'createBy'},
				{text:'',flex:1,dataIndex:'updateOn'},
				{text:'',flex:1,dataIndex:'updateBy'},
				{text:'',flex:1,dataIndex:'version'}
			  ],
	
	initComponent: function() {
		
		this.dockedItems = [
		{xtype : 'toolbar',dock : 'top',
			items : [
			         {text : 'Get Forecast spreadsheet template', minWidth: 80,  iconCls: 'icon-report', action:'getForecastSpreadsheetTemplate'}
					 ,{xtype:'form'
					  ,frame: true
					  ,padding: '0 0 0 0'
					  ,items : [{xtype:'filefield'
						  	  ,name:'fileUpload'
					          ,text : 'Upload Forecast spreadsheet'
					          //,iconCls: 'icon-submit'//action:'uploadForecastSpreadsheet'
							  ,buttonOnly: true
							  ,hideLabel: true
							  ,buttonText:'Upload Forecast spreadsheet'
							  ,listeners:{
								  'change': function(fb, v){
									  console.log('file '+ v);
									  var theForm = fb.up('form').getForm();
									  if(theForm.isValid()){
										  	theForm.submit({
										  		headers : {'Content-Type':'multipart/form-data; charset=UTF-8'},
										        method : 'POST',
						                        url: 'json/SalesMonthFctSpreadsheetController?m=uploadWeekActuals',
						                        waitMsg: 'Uploading your file...',
						                        success: function(form, action){
						                        	var formContainer = form.owner;
													var theForm = formContainer.up('UploadReviewActualsGrid');
													var theStore= theForm.getStore(); 
													theStore.load();
						                        },
										  		failure: function(form, action) {
										  	        switch (action.failureType) {
										  	            case Ext.form.action.Action.CLIENT_INVALID:
										  	                Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
										  	                break;
										  	            case Ext.form.action.Action.CONNECT_FAILURE:
										  	                Ext.Msg.alert('Failure', 'Ajax communication failed');
										  	                break;
										  	            case Ext.form.action.Action.SERVER_INVALID:
										  	               Ext.Msg.alert('Failure', action.result.msg);
										  	       }
										  	    }
						                    });
						                }
								  }
							  }
					         }//end btn
					 ]}//end form	
					 ,{iconCls: 'icon-delete',itemId: 'UploadReviewActualsDelete',text: 'Delete',action: 'uploadReviewActualsDelete'}		 
	    ]}           //UploadReviewActualsGrid uploadReviewActualsDelete
        ,{xtype: 'pagingtoolbar', dock:'bottom',
            store: 'sales.UploadActuals',
            displayInfo: true,
            displayMsg: 'Displaying UploadActual {0} - {1} of {2}',
            emptyMsg: "No UploadActual to display"
        }];
		this.callParent(arguments);
	}

});


