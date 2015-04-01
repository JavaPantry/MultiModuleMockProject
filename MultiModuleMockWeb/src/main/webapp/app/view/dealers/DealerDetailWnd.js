Ext.define('Fast.view.dealers.DealerDetailWnd', {
    extend: 'Ext.window.Window',
    alias : 'widget.DealerDetailWnd',
	modal:true,
    requires: ['Ext.form.Panel','Ext.form.field.Text'],
    title : 'Dealer Setup Details - Initial Screen',
    layout: 'fit',
    width: 1015,height:650,
    iconCls: 'icon-user',

    listeners:{
        destroy:function(win){
        }
    },

    initComponent: function() {
		this.items =[
						{xtype: 'panel',
						layout: 'anchor',
						items:	[
									{xtype: 'fieldcontainer',
									//fieldLabel: 'Customer Code/Group',
									combineErrors: false,
									anchor: '100% 10%',
									layout:'hbox'
									//defaults: {hideLabel: true},
									,defaults: {xtype: 'displayfield'
										,margin:'5'
										,labelPad:2
										,labelCls:'fast-label'
									}

									,items: [
												{fieldLabel: 'Dealer Code',flex: 1,itemId:'dealerCodeId',name:'dealerCode'}
												,{fieldLabel: 'Dealer Group',flex: 1,itemId:'dealerNameId',name:'dealerName'}
												,{fieldLabel: 'Dealer Type',flex:1,itemId:'dealerTypeId',dataIndex:'dealerType'
													,renderer: function(value){
														if (value === 'B') {
														    return 'Bill To';
														}else if (value === 'S') {
														    return 'Sell To';
														}else if (value === 'G') {
														    return 'Group';
														}
														return '';
														}
												}
											]
									},
									{xtype: 'panel', name:'cardPanel', anchor: '100% 90%', layout:'card',
										tbar:[
												{iconCls: 'icon-delete',itemId: 'delete',text: 'Delete',action: 'delete'}
												,{iconCls: 'icon-prev',id: 'back',text: 'Back',action: 'back',disabled: true}
												,{iconCls: 'icon-next',id: 'next',text: 'Next',action: 'next'}
												,'->'
												,{iconCls: 'icon-cancel',itemId: 'cancel',text: 'Cancel',action: 'cancel'}
											],
										items:[	{xtype: 'panel', layout: 'anchor',
												items:[	
													{xtype: 'DealerDetailGrid', anchor: '100% 85%'},
													{xtype: 'DealerOptionGrid', anchor: '100% 15%'}
													]
												,listeners: {
									             		activate: function(tab){
															var wnd = tab.up('window');
									             			wnd.setTitle('Dealer Setup Details - Initial Screen');
									             		}
													}	
												},
												{xtype: 'panel', layout: 'anchor',
													items:[//hierarchy panel
													{xtype: 'DealerHierarchyGrid', anchor: '100% 100%'}
													]
												,listeners: {
									             		activate: function(tab){
									             			var wnd = tab.up('window');
									             			wnd.setTitle('Dealer Setup Details - Dealer Hierarchy');
									             		}
													}	
												}
											  ]
									}
									
								]
						}
		   			];
		 this.callParent(arguments);
    }
});
