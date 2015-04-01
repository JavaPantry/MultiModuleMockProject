Ext.define('Fast.store.products.ProductCCI', {
    extend: 'Ext.data.Store',
    model: 'Fast.model.products.ProductCCIModel',
    storeId: 'Fast.store.products.ProductCCI',
    autoLoad: true,
    pageSize: 35,
    autoLoad: {start: 0, limit: 35},
    
    proxy: {
        type: 'ajax',
        api: {
            read : 'json/commonProduct?m=checkIfProductExsistInFaST',
            create :null,// 'json/commonProduct?m=checkIfProductExsistInCCI',//why???
            update: null,
            destroy: null
        },
        reader: {
            type: 'json',
            root: 'product',
            successProperty: 'success'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            encode: false
        },
        listeners: {
            exception: function(proxy, response, operation){
//                Ext.MessageBox.show({
//                    title: 'REMOTE STORE EXCEPTION',
//                    msg: operation.getError(),
//                    icon: Ext.MessageBox.ERROR,
//                    buttons: Ext.Msg.OK
//                });
            }
        }
    }
});