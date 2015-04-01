var boxWidth=182;
var labelWidth=70;
var groupHeight=88;
var space=8;
var topTextBoxWidth=350;
Ext.require(['Ext.data.*',
             'Ext.form.*',
             'Ext.tip.QuickTipManager'
         ]);
var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

//TODO - <AP> model&store for typeahead combo box
Ext.define("CciItemCodes", {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'ajax',
        url : 'json/commonProduct?m=selectProductExsistInCCIAndNotInFaST',
        reader: {
            type: 'json',
            root: 'items',
            totalProperty: 'totalCount'
        }
    },

    fields: [
        {name: 'itemCode', mapping: 'itemCode'},
        {name: 'itemDescription', mapping: 'itemDescription'}
    ]
});

cciDS = Ext.create('Ext.data.Store', {
    pageSize: 10,
    model:'CciItemCodes'
});



//http://www.sencha.com/forum/showthread.php?64062  seach for "ajax in vtype"
Ext.apply(Ext.form.field.VTypes, {
	codenumber: function(val, field) {
    	var window  = productFormRef.up('window');
    	//if window is undefined form already closed could not find reason why its called
    	if(window == null || window == undefined )
    		return true;
    	if (productFormRef.isEditMode == true)
			return true;
        var codenumberValue = field.getValue();
        var toolbar		= window.down('toolbar');
        var saveButton	= Ext.getCmp('productFormSaveButton');
        var submitButton= Ext.getCmp('productFormSubmitButton');
		var response = Ext.Ajax.request({
	   	        method: 'POST',
	   	        async:false,//TODO - <AP> check ExtJS version compatibility
	   	        url: 'json/commonProduct?m=checkIfProductExsistInFaST&codeNumber=' + codenumberValue,
	   	        failure: function (response,request){
					Ext.MessageBox.show({title: 'AJAX FAILURE:',msg: 'Request timeout!',
						icon: Ext.MessageBox.ERROR, buttons: Ext.Msg.OK});
	   	        }
	   	    });
		var jsonResponse = Ext.JSON.decode(response.responseText,false);  //eval('(' + response.responseText + ')');
		if (jsonResponse.success == false){
			field.fieldValidFlag = false;
			field.markInvalid(jsonResponse.message);
			//codenumberText = jsonResponse.message;
			return false;
		}
		field.fieldValidFlag = true;
		codenumberText = '';
		field.clearInvalid();
		return true;
    },
    codenumberText: 'Code Number already exist',

    itemcode: function(val, field) {
    	var window  = productFormRef.up('window');
    	//if window is undefined form already closed could not find reason why its called
    	if(window == null || window == undefined )
    		return true;
		if (productFormRef.isEditMode == true && productFormRef.validateItemCode != true)
			return true;

    	var itemcodeValue = field.getValue();

        var toolbar = window.down('toolbar');
        var saveButton	= Ext.getCmp('productFormSaveButton');
        var submitButton= Ext.getCmp('productFormSubmitButton');
		var response = Ext.Ajax.request({
   	        method: 'POST',
   	        async:false,//TODO - <AP> check ExtJS version compatibility
   	        url: 'json/commonProduct?m=checkIfProductExsistInCCI&itemCode=' + itemcodeValue,
   	        failure: function (response,request){
				Ext.MessageBox.show({title: 'AJAX FAILURE:',msg: 'Request timeout!',
									icon: Ext.MessageBox.ERROR, buttons: Ext.Msg.OK});
				return;
   	        }
   	    });
		field.fieldValidFlag = false;
		var jsonResponse = Ext.JSON.decode(response.responseText,false);  //eval('(' + response.responseText + ')');
		if (jsonResponse.success == false){
			field.markInvalid(jsonResponse.message);
			//itemcodeText = jsonResponse.message;
            return false;
		}
		field.fieldValidFlag = true;
		field.clearInvalid();
		return true;
    },
    itemcodeText: 'Invalid Item Code'
});

//****************************************************************************************************
var productFormRef = null;
Ext.define('Fast.view.products.ProductForm', {
	extend: 'Ext.form.Panel',
	alias : 'widget.ProductForm',
	loadedFlag:false,
	inquiryMode:false,
	requires: ['Ext.form.field.Text'],
	layout: 'fit',
	autoShow: true,
	id	: 'productEditForm',
	isEditMode: false,
	validateItemCode: false,
	checkRequiredFields: function(){
		if(this.inquiryMode)
			return;
	    var window  = productFormRef.up('window');
	    var formRef	= productFormRef.getForm();
	    var toolbar = window.down('toolbar');
	    var saveButton	= Ext.getCmp('productFormSaveButton');
	    var submitButton= Ext.getCmp('productFormSubmitButton');

	    var codeNumberField			= formRef.findField('codeNumber');
	    var merchandiseTypeField	= formRef.findField('merchandiseType');
	    var productCodeField		= formRef.findField('productCode');
	    var productCode2Field		= formRef.findField('productCode2');
	    var itemCategoryField		= formRef.findField('category');
	    var itemCodeField			= formRef.findField('itemCode');

	    var formValid = (codeNumberField.isValid() && codeNumberField.getValue() != '' &&
					    merchandiseTypeField.isValid() && merchandiseTypeField.getValue() != '' &&
					    productCodeField.isValid() && productCodeField.getValue() != '' &&
					    productCode2Field.isValid() && productCode2Field.getValue() != '' &&
					    itemCategoryField.isValid() && itemCategoryField.getValue() != '');

	    if(formValid && itemCodeField.getValue() != ''){
	    	formValid = itemCodeField.isValid();//.fieldValidFlag; 
	    }
	    
	    if (formValid){
				saveButton.enable();
				submitButton.enable();
	    }else{
				saveButton.disable();
				submitButton.disable();
	    }

	},

	getFirstColumn:function (){
						return {
	                    	 xtype:'fieldset',
								width:490,
								height:330,
	                         fieldDefaults: {
                                 labelAlign: 	'left', labelWidth: 	150,
                                 allowBlank: 	true,
                                 enforcemaxLength:true,
                                 msgTarget:'side'},

                             items: [
							{fieldLabel:'Product Id',xtype:'numberfield',hidden:true,name:'id'},
							{xtype:'displayfield',height: space,allowBlank: true},
							{fieldLabel:'Code Number',
								xtype:'textfield',name:'codeNumber', itemId:'ProductCodeNumber',
									fieldValidFlag:true,
									validateOnChange: false,
									maxLength:15,
									afterLabelTextTpl: required,
									autoFitErrors: true,
									width:topTextBoxWidth,
									allowBlank: false,
									enforceMaxLength:true,
									msgTarget: 'side',
									vtype:'codenumber',
									style : {textTransform: "uppercase"},
									listeners:	{
												change: function(field, newValue, oldValue){
															field.setValue(newValue.toUpperCase());
															productFormRef.checkRequiredFields();
														}
												}
							  },
							 //TODO - <AP> typeahead combo box version include in validate required if not empty
							  ,{    fieldLabel:'Item Code',
						            xtype: 'combo',
						            name:'itemCode',
						            store: cciDS,
						            displayField: 'itemCode',
						            validateOnChange: false,
						            typeAhead: true,
						            minChars:1,
						            maxLength:15,enforceMaxLength:true,
						            width:topTextBoxWidth,
						            hideTrigger:true,
						            vtype:'itemcode',
						            msgTarget: 'side',
		                            allowBlank:true,
		                            style : {textTransform: "uppercase"},
						            listConfig: {
						                loadingText: 'Searching...',
						                emptyText: 'No matching found.',
							            getInnerTpl: function() {
						                    return '<span style="font-weight:bold">{itemCode}</span> - <i><font color="blue">{itemDescription}</font></i>';
						                }
						            },
						            pageSize: 10,
									listeners:{
										change: function(field, newValue, oldValue){
													field.setValue(newValue.toUpperCase());
													productFormRef.checkRequiredFields();
													}
												}
						        },
							  {fieldLabel:'Item Name',xtype:'textfield',name :'itemName',
							  	inputId:'Product.itemName',
								style : {textTransform: "uppercase"},
                                maxLength:30,enforceMaxLength:true
                                ,width:topTextBoxWidth
                                },
                              {fieldLabel:'Merchandise Type',xtype:'combo',displayField:'tabr',valueField:'ttblcd',
                                queryMode:'local',store:'products.MType',allowBlank:false,forceSelection:true,
								afterLabelTextTpl: required,
								validateOnChange: false,
                                editable:false,
                                width:topTextBoxWidth,
                                name:'merchandiseType',
                                msgTarget: 'side',
								listeners:{
									change: function(field, newValue, oldValue){
										productFormRef.checkRequiredFields();
												}
											}
                              },
                              {fieldLabel:'Product Code',xtype:'combo',displayField:'tabr',valueField:'ttblcd',queryMode:'local',
                                forceSelection:true,triggerAction: 'all',editable:false,
                                width:topTextBoxWidth,id:'productCode',
                                store:'products.ProductCode',allowBlank:false,name:'productCode',afterLabelTextTpl: required,
                                validateOnChange: false,
                                msgTarget: 'side',
                                listeners : {change :function (combo, newValue, oldValue){
                                						  var productEditFormRef = Ext.getCmp('productEditForm');
                                						  if(productEditFormRef.loadedFlag == false)
                                								return;
                                                		  if(newValue!=null){
                                		        	 		//removed selectPcode(newValue);
                                		        	 		var itemCategoryRef = Ext.getCmp('category');
                                		        	 		itemCategoryRef.clearValue();
                                		        	 		delete itemCategoryRef.lastQuery;
                                		        	 		itemCategoryRef.store.proxy.api.read='json/commonProduct?m=getItemCategoryByPcode&productCode=' + newValue;
															itemCategoryRef.store.load();
                                		        	 		Ext.getCmp('itemSegment').clearValue();
    		        	 									delete Ext.getCmp('itemSegment').lastQuery;
                                		        	 		}
                                                		  productFormRef.checkRequiredFields();
                                                		 }}},
                    		  {fieldLabel:'2 digits Product Code',xtype:'combo',displayField:'tabr',valueField:'ttblcd',
                                queryMode:'remote',store:'products.ProductCode2',id:'pCode2',allowBlank:false,
                    		    forceSelection:true,editable:false,lazyRender:false,
                    		    width:topTextBoxWidth,afterLabelTextTpl: required,
                    		    validateOnChange: false,
                    		    msgTarget: 'side',
                             	triggerAction: 'all',name:'productCode2',
								listeners:{
									change: function(field, newValue, oldValue){
										productFormRef.checkRequiredFields();
												}
											}
                             	},
                             	{fieldLabel:'Status',xtype:'displayfield', name:'displayStatus',inputId:'Product.status',fieldCls : 'red'},
                             	//need to submit status xtype:'displayfield' will not be submitted
                              	{fieldLabel:'Status', xtype:'textfield',hidden:true,id:'statusId',name:'status'},
                              {fieldLabel:'UPC',xtype:'textfield',name:'productUpc',maskRe: /([0-9\s]+)$/ ,//regex: /[0-9]/,
                            	maxLength:12,
                            	width:topTextBoxWidth,
                            	allowBlank:true},
                              {fieldLabel:'Comments',xtype:'textfield',name:'comments',id:"CommentsId"
                            	  ,width:topTextBoxWidth
                            		}
                           	]};//eof fieldset

	},// eof getFirstColumn

	getSecondColumn:function(){
			return {xtype:'fieldset',
					width:490,
					height:330,
                	fieldDefaults: {labelAlign:'left',labelWidth: 150,
                     			    allowBlank:true,combineErrors:true,
                     			    enforceMaxLength:true,msgTarget:'side'},

                items: [
		       {xtype:'displayfield',height: space,allowBlank: true},
		       {fieldLabel:'Ship Date',xtype:'datefield',name:'shipDate'
		    	   ,width:topTextBoxWidth
		    	   },
		       {fieldLabel:'Margin % '
		       ,xtype:'numberfield',
		       decimalPrecision:2,
		       maxValue:100,
		       minValue:0,
		       defaultValue:0,
		    	name:'margin',inputId:'margin',width:topTextBoxWidth,
		         listeners: {change: function () {
		        	 			var msrp= document.getElementById('msrp').value;
		         				if (this.value!=null&&!isNaN(this.value) && msrp!= null && !isNaN(msrp)){
		         					document.getElementById('dealerNet').innerHTML=Math.round((1-this.value/100)*msrp) }}
		         				}},
		       {fieldLabel:'MSRP',
		       xtype:'numberfield',
		       name:'msrp',
		       inputId:'msrp',
		       decimalPrecision:2,
		       minValue:0,defaultValue:0,allowBlank: true,width:topTextBoxWidth,
		       listeners: {change: function () {
    		         			var margin= document.getElementById('margin').value;
    		         				if (this.value!=null&&!isNaN(this.value) && margin!= null && !isNaN(margin)){
    		         					document.getElementById('dealerNet').innerHTML=Math.round(this.value*(1-margin/100)) }}
   		         					}},
   		       {fieldLabel:'Dealer Net',
		        	 xtype:'displayfield',
		        	 name:'dealerNet',
		        	 inputId:'dealerNet',
		        	 decimalPrecision: 0,
		        	 minValue:0,
		        	 allowBlank: false
		        	 ,width:topTextBoxWidth
		        	 },
		       	 {
		        	 xtype:'combo',
		        	 name:'itemCategory',
		        	 inputId:'itemCategory',
		        	 allowBlank:false,
		        	 id:'category',
		        	 fieldLabel:'Item Category',
		        	 displayField:'tabr',
		        	 valueField:'ttblcd',
		        	 queryMode:'remote',
		        	 store:'products.PrdCategory',
		        	 width:topTextBoxWidth,
		        	 forceSelection:true,
                 	 editable:false,
                 	 afterLabelTextTpl: required,
                 	 validateOnChange: false,
                 	 msgTarget: 'side',
                 	 triggerAction: 'all',
                 	 listeners : {
                 		afterrender:function( combo, eOpts ){
                 			var form = combo.up('form');
                 			var productCodeRef = Ext.getCmp('productCode');
                 		},
                 		change : function (combo, newValue, oldValue){
									var productEditFormRef = Ext.getCmp('productEditForm');
									if(productEditFormRef.loadedFlag == false)
										return;

									if(newValue!=null){
			    		        	 		var itemSegmentRef = Ext.getCmp('itemSegment');
			    		        	 		//Alternative for Ext.getCmp() -> this.down("form").getForm().findField("edtAlterarSenhaEmpresa");
			    		        	 		//var itemSegmentRef1 = Ext.getCmp('itemSeries');
			    		        	 		itemSegmentRef.store.proxy.api.read='json/commonDropDownCCI?m=getItemSegmentByCategory&categoryCode=' + newValue;
											itemSegmentRef.store.load();
			    		        	 		itemSegmentRef.clearValue();
			    		        	 		delete itemSegmentRef.lastQuery;
			    		        	 		//TODO - <AP> need to restore itemSegmentRef.store.proxy.api.read to 'json/commonDropDownCCI?m=getItemSegment'
			    		        	 	}
									productFormRef.checkRequiredFields();
    		        	 }}
		         },
		         {fieldLabel:'Item Segment',
		        	 xtype:'combo',
		        	 name:'itemSeries',
		        	 displayField:'tabr',
		        	 valueField:'ttblcd',
		        	 queryMode:'remote',
		        	 //queryMode:'local',
		        	 id:'itemSegment',
		        	 store:'products.ItemSegment',
		        	 allowBlank:true,
		        	 forceSelection:true,
		        	 width:topTextBoxWidth,
		        	 emptyValue:0,
                 	 editable:false
		        	 },
		         {fieldLabel:'Country of Origin',
		        	 xtype:'combo',
		        	 displayField:'tabr',
		        	 valueField:'ttblcd',
		        	 queryMode:'local',
		        	 store:'products.CountryCode',
		        	 allowBlank:true,
		        	 forceSelection:true,
                 	 editable:false,
		           	 name:'countryOrigin'
		           	,width:topTextBoxWidth
		         },{
		        	 xtype:'numberfield',
		        	 name:'inTransitDays',
		        	 decimalPrecision: 0,
		        	 minValue:0,
		         	 maxValue:255,
		         	 maxLength:3,
       		         enforcemaxLength:true,
       		         width:topTextBoxWidth,
		        	 fieldLabel:'In Transit Days'
		         },{
		        	 xtype:'textfield',
   		        	 name:'configuration',
   		        	 maxLength:30,
   		        	 width:topTextBoxWidth,
		        	 fieldLabel:'Configuration'
		         },{
		        	 xtype:'textfield',
   		        	 name:'tarriffNum',
   		        	 maxLength:20,
   		        	 width:topTextBoxWidth,
   		        	 fieldLabel:'Tariff Number'
		         },{
		        	 xtype:'datefield',
		        	 name:'embargoPrdate',
		        	 width:topTextBoxWidth,
		        	 fieldLabel:'Embargo PR Date'
		         }
		         ]};//eof fieldset
	},// eof getSecondColumn
	getProductInfo:function(){
				return {
		     title:'Product Info',
		     height: groupHeight,
		     xtype:'fieldset',
		    defaultType: 'numberfield',
		     enforcemaxLength:true,
		     defaults: {
		              },
		     items: [ {
		         xtype:'container',
		         items: [
				         {
				          xtype:'container',
				          layout: 'hbox',
				          items: [
				         		{xtype:'numberfield',
					             fieldLabel:'Length (in.)',
					             name:'productLength',
					             width: boxWidth,
					             maxLength:18,
					             labelWidth: labelWidth,
					             margin: '0 10 0 0',
					             maxLength:18,
					             decimalPrecision: 4,
					             allowBlank: true
					         }, {
					             xtype:'numberfield',
					             name:'productWidth',
					             fieldLabel:'Width (in.)',
					             labelWidth: labelWidth,
					             margin: '0 10 0 0',
					             maxLength:18,
					             decimalPrecision: 4,
					             width: boxWidth,
					             allowBlank: true

					         }, {
					        	 xtype:'numberfield',
					             name:'productDepth',
					             fieldLabel:'Depth (in.)',
					             labelWidth: labelWidth,
					             margin: '0 10 0 0',
					             maxLength:18,
					             decimalPrecision: 4,
					             width: boxWidth,
					             allowBlank: true
					         },{
					             xtype:'numberfield',
					             fieldLabel:'Weight (kg)',
					             name:'productKg',
					             width: boxWidth,
					             maxLength:18,
					             labelWidth: labelWidth,
					             margin: '0 10 0 0',
					             decimalPrecision: 4,
					             allowBlank: true
					         }, {
					             xtype:'numberfield',
					             name:'productLbs',
					             fieldLabel:'Weight (lbs)',
					             labelWidth: labelWidth,
					             margin: '0 10 0 0',
					             maxLength : 18,
					             decimalPrecision: 4,
					             width: boxWidth,
					             allowBlank: true
				         }]
		         }]//eof container
		     }]
		 };//eof fieldset
	},// eof getProductInfo


	getIndividualBoxInfo: function(){
			return {
			     title:'Individual Box Info',
			     height: groupHeight,
			     xtype:'fieldset',
			     defaultType: 'numberfield',
			     layout: 'anchor',
			     defaults: {
			         anchor: '100%'
			              },
			     items: [
			         {
			         xtype:'container',
			         items:[
			         {
			         xtype:'container',
			         layout: 'hbox',

			         items: [{
			             xtype:'numberfield',
			             fieldLabel:'Length (in.)',
			             name:'boxLength',
			             width: boxWidth,
			             maxLength:18,
			             labelWidth: labelWidth,
			             margin: '0 10 0 0',
			             allowBlank: true
			         }, {
			             xtype:'numberfield',
			             name:'boxWidth',
			             fieldLabel:'Width (in.)',
			             labelWidth: labelWidth,
			             margin: '0 10 0 0',
			             maxLength : 18,
			             width: boxWidth,
			             allowBlank: true

			         }, {
			        	 xtype:'numberfield',
			             name:'boxDepth',
			             fieldLabel:'Depth (in.)',
			             labelWidth: labelWidth,
			             margin: '0 10 0 0',
			            maxLength:18,
			             width: boxWidth,
			             allowBlank: true
			         },{
			             xtype:'numberfield',
			             fieldLabel:'Weight (kg)',
			             name:'boxKg',
			             width: boxWidth,
			             maxLength:18,
			             labelWidth: labelWidth,
			             margin: '0 10 0 0',
			             allowBlank: true
			         }, {
			             xtype:'numberfield',
			             name:'boxLbs',
			             fieldLabel:'Weight (lbs)',
			             labelWidth: labelWidth,
			             margin: '0 10 0 0',
			            maxLength : 18,
			             width: boxWidth,
			             allowBlank: true
			         }]
			         }	                                                         ]
			         }]

			 };//eof fieldset
	},//eof getIndividualBoxInfo

	getInnerPackInfo: function(){
			return {
				     title:'Inner Pack Info',
				     height: groupHeight,
				     xtype:'fieldset',
				    defaultType: 'numberfield',
				     layout: 'anchor',
				     defaults: {
				         anchor: '100%'
				              },
				     items: [ {
				         xtype:'container',
				         items: [
				          {
				           xtype:'container',
				           layout: 'hbox',
				           items:[
				          {
				             xtype:'numberfield',
				             fieldLabel:'Length (in.)',
				             name:'innerLength',
				             width: boxWidth,
				             maxLength:18,
				             labelWidth: labelWidth,
				             margin: '0 10 0 0',
				             allowBlank: true
				         }, {
				             xtype:'numberfield',
				             name:'innerWidth',
				             fieldLabel:'Width (in.)',
				             labelWidth: labelWidth,
				             margin: '0 10 0 0',
				             maxLength : 18,
				             width: boxWidth,
				             allowBlank: true

				         }, {
				        	 xtype:'numberfield',
				             name:'innerDepth',
				             fieldLabel:'Depth (in.)',
				             labelWidth: labelWidth,
				             margin: '0 10 0 0',
				             maxLength:18,
				             width: boxWidth,
				             allowBlank: true
				         },{
				             xtype:'numberfield',
				             fieldLabel:'Weight (kg)',
				             name:'innerKg',
				             width: boxWidth,
				             maxLength:18,
				             labelWidth: labelWidth,
				             margin: '0 10 0 0',
				             allowBlank: true
				         }, {
				             xtype:'numberfield',
				             name:'innerLbs',
				             fieldLabel:'Weight (lbs)',
				             labelWidth: labelWidth,
				             margin: '0 10 0 0',
				             maxLength : 18,
				             width: boxWidth,
				             allowBlank: true

				           }]
				          }]
				     }]
				 };//eof fieldset
	},//eof getInnerPackInfo


	getMasterPackInfo: function(){
			return  	{
				     title:'Master Pack Info',
				     height: groupHeight+20,
				     xtype:'fieldset',
				    defaultType: 'numberfield',
				     layout: 'anchor',
				     defaults: {
				         anchor: '100%'
				              },
				     items: [ {
				         xtype:'container',
				         items: [
				          { xtype:'container',
				        	layout:'hbox',
				           items: [
				          {
				             xtype:'numberfield',
				             fieldLabel:'Length (in.)',
				             name:'masterLength',
				             width: boxWidth,
				            maxLength:18,
				             labelWidth: labelWidth,
				             margin: '0 10 0 0',
				             allowBlank: true
				         }, {
				             xtype:'numberfield',
				             name:'masterWidth',
				             fieldLabel:'Width (in.)',
				             labelWidth: labelWidth,
				             margin: '0 10 0 0',
				             maxLength : 18,
				             width: boxWidth,
				             allowBlank: true
				         }, {
				        	 xtype:'numberfield',
				             name:'masterDepth',
				             fieldLabel:'Depth (in.)',
				             labelWidth: labelWidth,
				             margin: '0 10 0 0',
				             maxLength:18,
				             width: boxWidth,
				             allowBlank: true
				         },{
				             xtype:'numberfield',
				             fieldLabel:'Weight (kg)',
				             name:'masterKg',
				             maxLength:18,
				             labelWidth: labelWidth,
				             margin: '0 10 0 0',
				             width: boxWidth,
				             allowBlank: true
				         }, {
				             xtype:'numberfield',
				             name:'masterLbs',
				             fieldLabel:'Weight (lbs)',
				             labelWidth: labelWidth,
				             margin: '0 10 0 0',
				             maxLength : 18,
				             width: boxWidth,
				             allowBlank: true

				           }
				          ]
				          },
				          {
				          xtype:'container',
				          layout:'hbox',
				          items: [{fieldLabel:'Qty',
						        	 xtype:'numberfield',
						             name:'masterQty',
						             labelWidth: labelWidth,
						             margin: '0 10 0 0',
						             maxLength:5,
						             width: boxWidth,
						             allowBlank: true
						         	}]
				          }]
				     }]
				 };//eof fieldset
	},//eof getMasterPackInfo

	getPalletInfo: function(){
		return 	{
			     title:'Pallet Info',
			     height: groupHeight,
			     xtype:'fieldset',
			    defaultType: 'numberfield',
			     layout: 'anchor',
			     defaults: {anchor: '100%'},
			     items: [ {
			         xtype:'container',
			         layout: 'hbox',

			         items: [{
			             xtype:'numberfield',
			             fieldLabel:'Layers',
			             name:'palletLayers',
			             width: boxWidth,
			             maxLength:18,
			             labelWidth: labelWidth,
			             margin: '0 10 0 0',
			             allowBlank: true
			         }, {
			             xtype:'numberfield',
			             name:'palletUnits',
			             fieldLabel:'Units per Layer',
			             labelWidth: labelWidth,
			             margin: '0 10 0 0',
			             maxLength : 18,
			             width: boxWidth,
			             allowBlank: true

			         }]
			         }]
			     };//eof fieldset
			},//eof getPalletInfo

	getGeneralPropertyTable: function(){
			return 	{
					xtype:'container',
			         layout: 'hbox',

			         items: [	this.getFirstColumn(),
			         			this.getSecondColumn()]
			};//eof table
		},

	initComponent: function() {
		productFormRef = this;
		this.items = [{xtype:'form',
                         	layout: {type: 'vbox'},
                         	autoScroll: true,
                         	defaults: {frame:false,margin: 0},
	                     	items:[this.getGeneralPropertyTable(),
			                     	this.getProductInfo(),
									this.getIndividualBoxInfo(),
									this.getInnerPackInfo(),
									this.getMasterPackInfo(),
									this.getPalletInfo()
									]
	                   }
					];
			this.callParent(arguments);
	}//eof initComponent

}// eof args for Ext.define
);// eof Ext.define

