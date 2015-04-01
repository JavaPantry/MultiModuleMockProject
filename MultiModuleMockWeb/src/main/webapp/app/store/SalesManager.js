Ext.define('Fast.store.SalesManager', {
    extend: 'Ext.data.Store',
    model: 'Fast.model.SalesManagerModel',
    storeId:'Fast.store.SalesManager',
    pageSize: 35,
    autoLoad: {start: 0, limit: 35},
    
    proxy: {
        type: 'ajax',
        api: {
            read : 'json/commonDropDown?m=getSalesManagers',
            create : null,
            update: null,
            destroy: null
        },
        reader: {
            type: 'json',
            root: 'data',//'salesManagers',
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