Ext.define('Fast.store.company.ManagerGrp', {
    extend: 'Ext.data.Store',
    storeId: 'Fast.store.company.ManagerGrp',
    model: 'Fast.model.company.ManagerGrpModel',
    autoLoad: true,
    pageSize: 35,
    autoLoad: {start: 0, limit: 35},
    renderTo:'mydiv',
    proxy: {
        type: 'ajax',
        api: {
        	read : 'json/companyManagerGroupAction?m=read',
            create : 'json/companyManagerGroupAction?m=create',
            update: 'json/companyManagerGroupAction?m=update',
            destroy: 'json/companyManagerGroupAction?m=delete'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
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