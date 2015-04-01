Ext.define('Fast.store.ManagerGroup', {
    extend: 'Ext.data.Store',
    model: 'Fast.model.ManagerGroupModel',
    storeId:'Fast.store.ManagerGroup',
    autoLoad: true,
    pageSize: 35,
    autoLoad: {start: 0, limit: 35},
    
    proxy: {
        type: 'ajax',
        api: {
            read : 'json/commonDropDown?m=getManagerGroups',
            create : null,
            update: null,
            destroy: null
        },
        reader: {
            type: 'json',
            root: 'data',//'managerGroups',
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