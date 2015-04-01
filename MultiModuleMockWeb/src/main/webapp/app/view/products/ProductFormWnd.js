Ext.define('Fast.view.products.ProductFormWnd', {
    extend: 'Ext.window.Window',
    alias : 'widget.ProductFormWnd',
    
    requires: ['Ext.form.Panel','Ext.form.field.Text','Fast.view.products.ProductForm'],
    title : 'Product Setup Modification',
    layout: 'fit',
    autoShow: true,
    width: 1015,height:650,
    modal:true,
    inquiryMode:false,
    //minWidth: 600,minHeight:600,
    
    iconCls: 'icon-user',
    initComponent: function() {
        this.items = [{xtype: 'ProductForm'}];
    	this.dockedItems = [{
    		xtype:'toolbar',
    		dock: 'top',
    		id:'buttons',
    		items: ['->',{
    			iconCls: 'icon-submit',
    			itemId: 'submit',
    			id : 'productFormSubmitButton',
    			itemId : 'productFormSubmitButton',
    			text: 'Submit for Approval',
    			action: 'submitProduct',
    			myData:ProductSubmittedTag //TODO <AP> - TBR either use this button label or use different actions
    		},{
    			iconCls: 'icon-save',
    			itemId: 'save',
    			id : 'productFormSaveButton',
    			itemId:'productFormSaveButton',
    			text: 'Save',
    			action: 'saveProduct',
    			myData:ProductSavedTag //TODO <AP> - TBR either use this button label or use different actions
    		},{
    			iconCls: 'icon-cancel',
    			text: 'Cancel',
    			scope: this,
    			action: 'cancel'
    		}]
    	}];
        this.callParent(arguments);
    }
});
