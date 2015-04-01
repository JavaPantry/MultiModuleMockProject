Ext.define('Fast.view.company.ListUsersInGroupWnd', {
    extend: 'Ext.window.Window',
    alias : 'widget.ListUsersInGroupWnd',

    requires: ['Fast.view.company.ListUsersInGroupGrid'],

    title : 'Users In Group',
    layout: 'fit',
    autoShow: true,
    modal: true,
    width: 280,
    height:600,
    iconCls: 'icon-user',

    initComponent: function() {
        this.items = [
            {
                xtype: 'ListUsersInGroupGrid',
                padding: '5 5 0 5',
                border: false
            }
        ];

        this.dockedItems = [{
            xtype: 'toolbar', dock: 'bottom', id:'buttons',ui: 'footer',
            items: ['->',{iconCls: 'icon-cancel', text: 'Close', scope: this, handler: this.close}]
        }];
        this.callParent(arguments);
    }
});
