
Ext.define('Fast.store.sales.ProductByAccountNewItem', {
    extend: 'Ext.data.Store',
    storeId: 'Fast.store.sales.ProductByAccountNewItem',
    model: 'Fast.model.sales.ProductByAccountModel',
    //id: 'productByAccountNewItemStore',
    autoLoad: false,
    pageSize: 35,
    //renderTo:'mydiv',
    //remoteSort: true,
    proxy: {
        type: 'ajax',
        api: {
			read : 'json/productByAccountNewItemAction?m=read',
			create: null,
			update: null,
			destroy: null
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success',
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