Ext.define('Fast.store.sales.ProductByAccount', {
    extend: 'Ext.data.Store',
    storeId: 'Fast.store.sales.ProductByAccount',
    model: 'Fast.model.sales.ProductByAccountModel',
    autoLoad: false,
    pageSize: 35,
    remoteSort: true,
    proxy: {
        type: 'ajax',
        api: {
        	read : 'json/productByAccountDetailsAction?m=read',
            create : null,
            update: null,
            destroy: null
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success',
            messageProperty: 'message',
            totalProperty: 'totalCount'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            encode: false,
            root: 'data'
        },
        listeners: {
            exception: function(proxy, response, operation){
                Ext.MessageBox.show({
                    title: 'Remote Access Failed',
                    msg: operation.getError(),
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    }
});