Ext.define('Fast.store.ManagementGroup', {
    extend: 'Ext.data.Store',
    model: 'Fast.model.ManagementGroupModel',
    storeId: 'Fast.store.ManagementGroup',
    autoLoad: true,
    pageSize: 35,
    autoLoad: {start: 0, limit: 35},
    
    proxy: {
        type: 'ajax',
        api: {
            read : 'json/commonDropDown?m=getManagementGroups',
            create : null,
            update: null,
            destroy: null
        },
        reader: {
            type: 'json',
            root: 'data',//'managementGroups',
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