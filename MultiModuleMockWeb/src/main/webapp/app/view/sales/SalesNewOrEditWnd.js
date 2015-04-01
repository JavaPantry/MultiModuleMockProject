Ext.define('Fast.view.sales.SalesNewOrEditWnd', {
    extend: 'Ext.window.Window',
    alias : 'widget.SalesNewOrEditWnd',
	modal:true,
    requires:	['Ext.form.Panel','Ext.form.field.Text'
				,'Fast.view.sales.SalesProductByAccountNewItemGrid'
				,'Fast.view.sales.SalesProductByAccountEditGrid'
				],
    title : 'New or Edit Product by Accound',
    layout: 'card',
    //autoShow: true,
    width: 1015,height:650,
    iconCls: 'icon-user',
	controller:null,
	
    listeners:{
        destroy:function(win){
             this.controller.selectedSalesProducts = new Array();
        }
    },

    initComponent: function() {
		this.items =[
		{xtype:'SalesProductByAccountNewItemGrid'},
		{xtype:'SalesProductByAccountEditGrid'}
		];
		this.callParent(arguments);
    }
});