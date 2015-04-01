Ext.define('Fast.store.Category', {
    extend: 'Ext.data.Store',
    model: 'Fast.model.CategoryModel',
    storeId : 'Fast.store.Category',
    pageSize: 35,
//    autoLoad: {start: 0, limit: 35},
    
    proxy: {
        type: 'ajax',
        api: {
            read : 'json/commonDropDown?m=getCategories',
            create : 'json/commonDropDown?m=getCategories',
            update: 'json/commonDropDown?m=getCategories',
            destroy: 'json/commonDropDown?m=getCategories'
        },
        reader: {
            type: 'json',
            root: 'data',//'categories',
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