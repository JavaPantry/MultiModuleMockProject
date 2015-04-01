Ext.define('Fast.store.products.PrdCategory', {
    extend: 'Ext.data.Store',
    model: 'Fast.model.products.Options',
    storeId: 'Fast.store.products.PrdCategory',
    autoLoad:true,
    
    proxy: {
        type: 'ajax',
        api: {
            read : 'json/commonDropDownCCI?m=getItemCategoryByPcode',
            create : null,
            update: null,
            destroy: null
        },
        reader: {
            type: 'json',
            root: 'data',//'prdCategory',//TODO - <AP> switch to 
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