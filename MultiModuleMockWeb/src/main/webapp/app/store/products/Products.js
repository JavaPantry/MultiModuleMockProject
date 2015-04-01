Ext.define('Fast.store.products.Products', {
    extend: 'Ext.data.Store',
    requires: ['Ext.data.reader.Json'],
    model: 'Fast.model.products.ProductModel',
    storeId: 'Fast.store.products.Products',
    autoLoad: false,
    pageSize: 35,
    remoteSort: true,
    proxy: {
        type: 'ajax',
        api: {
            read : 'json/commonProduct?m=getProductList',
            create : 'json/commonProduct?m=newProduct',
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
            encode: false
        },
        listeners: {
            exception: function(proxy, response, operation){
                Ext.MessageBox.show({
                    title: 'REMOTE EXCEPTION',
                    msg: operation.getError(),
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    }
});