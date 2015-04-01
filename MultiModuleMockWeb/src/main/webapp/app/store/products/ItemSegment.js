Ext.define('Fast.store.products.ItemSegment', {
    extend: 'Ext.data.Store',
    model: 'Fast.model.products.Options',
    storeId: 'Fast.store.products.ItemSegment',
    autoLoad:true,
    proxy: {
        type: 'ajax',
        api: {
            read : 'json/commonDropDownCCI?m=getItemSegmentByCategory',//getItemSegment',
            create : null,
            update: null,
            destroy: null
        },
        reader: {
            type: 'json',
            root: 'data',//'itemSegment',//TODO - <AP> switch to 'data',//
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