Ext.define('Fast.store.products.ProductCode2', {
    extend: 'Ext.data.Store',
    model: 'Fast.model.products.Options',
    storeId: 'Fast.store.products.ProductCode2',
    pageSize: 35,//TODO - <AP> remove limit to read all
    autoLoad: {start: 0, limit: 35},//TODO - <AP> remove limit to read all
    
    proxy: {
        type: 'ajax',
        api: {
            read : 'json/commonDropDownCCI?m=getProductCode2',
            create : null,
            update: null,
            destroy: null
        },
        reader: {
            type: 'json',
            root: 'data',//'productCode2',
            successProperty: 'success',
            totalProperty: 'totalCount'            
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