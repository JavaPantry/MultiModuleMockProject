Ext.apply(Ext.form.field.VTypes, {
	dealerTypeCheck: function(val, field) {
		var form = field.up('form');
		var formRef= form.getForm();
		var dealerTypeField = formRef.findField('dealerType');
		var dealerType = field.getValue();
		var isIncludeField = formRef.findField('isInclude');
		var isInclude = isIncludeField.getValue();
		dealerTypeField.clearInvalid();
		isIncludeField.clearInvalid( )
		
		if(dealerType == 'B' && isInclude == false){
			field.markInvalid('BillTo type can be included only!');
			return false;
		}

		return true;
    },
    dealerTypeCheckText: 'BillTo type can be included only',

	includeExcludeCheck: function(val, field) {
		var form = field.up('form');
		var formRef= form.getForm();
		var dealerTypeField = formRef.findField('dealerType');
		var dealerType = dealerTypeField.getValue();
		var isIncludeField = formRef.findField('isInclude');
		var isInclude = field.getValue();
		dealerTypeField.clearInvalid();
		isIncludeField.clearInvalid();
		
		if(dealerType == 'B' && isInclude == false){
			field.markInvalid('BillTo type can be included only!');
			return false;
		}

		return true;
    },
    includeExcludeCheckText: 'BillTo type can be included only'
});

Ext.define('Fast.view.company.DealerGroupDetailCreateWnd', {
    extend: 'Ext.window.Window',
    alias : 'widget.DealerGroupDetailCreateWnd',
    title : 'Dealer Group Detail Creation',
    layout: 'fit',
    autoShow: true,
    modal:true,
    width: 1015,height:650,
    iconCls: 'icon-user',
    listeners:{
        destroy:function(win){
        }
    },
    
    
    initComponent: function() {
        this.items = [
						{xtype: 'panel', name:'cardPanel', anchor: '100% 100%', layout:'card',

							tbar:[
									{iconCls: 'icon-save',itemId: 'dealerGroupDetailCreateWndSave',text: 'Save',action: 'dealerGroupDetailCreateWndSave'}
									,{iconCls: 'icon-cancel',itemId: 'dealerGroupDetailCreateWndCancel',text: 'Cancel',action: 'dealerGroupDetailCreateWndCancel'}
									,'->'
									,{iconCls: 'icon-search',itemId: 'dealerGroupDetailCreateWndLookup',text: 'Customer Lookup',action: 'dealerGroupDetailCreateWndLookup'}]
							,items:[	
								{xtype: 'panel', layout: 'anchor',//fist page with dealerCode text field
									items:[	{xtype: 'form',padding: '5 5 0 5',border: false, style: 'background-color: #fff;',
												fieldDefaults: {anchor: '100%',labelAlign: 'left',allowBlank: false,combineErrors: true,msgTarget: 'side'},
												items: [{xtype: 'textfield',name : 'dealerGroupId',hidden:true,fieldLabel: 'Dealer Group Id',value: 0}
														,{xtype: 'textfield',name : 'dealerCode',fieldLabel: 'Customer Code',value: '',allowBlank: false}
														,{xtype: 'textfield',name : 'dealerName',hidden:true,fieldLabel: 'Customer Nmae',value: ''}
														,{xtype: 'combo',name : 'dealerType'
															,fieldLabel: 'Customer Type',store: [['S','SellTo'],['B','BillTo']]
															, vtype:'dealerTypeCheck',allowBlank: false,msgTarget: 'side'}
														,{xtype: 'combo',name : 'isInclude'
															,fieldLabel: 'Include/Exclude',store: [[true,'Include'],[false,'Exclude']]
															,vtype:'includeExcludeCheck',allowBlank: false,msgTarget: 'side'}
														]
											}]
								}
								,{xtype:'DealerGroupDetailLookupGrid'}//2nd page with list of available dealers in CCI
								
							]
				}];
        this.callParent(arguments);
    }
});
