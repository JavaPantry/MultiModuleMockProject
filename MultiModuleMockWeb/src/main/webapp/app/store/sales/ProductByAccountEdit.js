Ext.define('Fast.store.sales.ProductByAccountEdit', {
    extend: 'Ext.data.Store',
    storeId: 'Fast.store.sales.ProductByAccountEdit',
    model: 'Fast.model.sales.ProductByAccountModel',
    autoLoad: false,
    id: 'productByAccountEditStore',
    pageSize: 35,//?!!!  1000,
    //?!!!  totalProperty: 'totalCount',
    proxy: {
        type: 'ajax',
        api: {
        	read: 'json/productByAccountEditAction?m=read',
            create: null,
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