Ext.define('Fast.view.sales.EnterCommentWnd', {
    extend: 'Ext.window.Window',
    alias : 'widget.EnterCommentWnd',
    requires: ['Ext.form.Panel','Ext.form.field.Text'],

    title : 'Enter submit, Rework or approval commewnt',
    layout: 'fit',
    //autoShow: true,
    modal: true,
    width: 380,
    iconCls: 'icon-user',
    initComponent: function() {
        this.items = [{
                xtype: 'form',
                padding: '5 5 5 5',
                border: false,
                timeout:60,
                fieldDefaults: {anchor: '100%', labelAlign: 'left', combineErrors: true, msgTarget: 'side'},
                items: [{xtype: 'textfield', name: 'comment',	fieldLabel: 'Comment'}]
            }];
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            id:'buttons',
            ui: 'footer',
            items: ['->',	{iconCls: 'icon-save',text: 'Save', action:'submitApproveCommentSave'}
            				,{iconCls: 'icon-cancel',text: 'Cancel', handler: this.close}]
        }];
        this.callParent(arguments);
    }
});
