Ext.define('Fast.view.dealers.DealerCreateWnd', {
    extend: 'Ext.window.Window',
    alias : 'widget.DealerCreateWnd',
    title : 'Dealer Setup Creation',
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
							tbar:[{iconCls: 'icon-prev',id: 'back',text: 'Back',action: 'back'}
									,{iconCls: 'icon-next',id: 'next',text: 'Next',action: 'next'}
									,'->'
									,{iconCls: 'icon-search',id: 'lookup',text: 'Customer Lookup',action: 'lookup'}]
							,items:[	
								{xtype: 'panel', layout: 'anchor',//fist page with dealerCode text field
									items:[	
									       	{xtype: 'form',padding: '5 5 0 5',border: false, style: 'background-color: #fff;'
												,fieldDefaults: {anchor: '100%',labelAlign: 'left',allowBlank: false,combineErrors: true,msgTarget: 'side'}
												,items: [{xtype: 'textfield',name : 'id',hidden:true,fieldLabel: 'DealerId',value: 0}
														,{xtype: 'textfield',name : 'dealerCode',fieldLabel: 'Customer Code/Group',value: ''}
														,{xtype: 'combo',name : 'dealerType',fieldLabel: 'Customer Type',store: [['S','SellTo'],['B','BillTo'],['G','Group']]}]
											}
									       	]
								}
								,{xtype:'LookupGrid'}//2nd page with list of available dealers in CCI
								
							]
				}];
        this.callParent(arguments);
    }
});
