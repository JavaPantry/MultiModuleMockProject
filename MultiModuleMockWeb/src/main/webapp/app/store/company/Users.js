Ext.define('Fast.store.company.Users', {
    extend: 'Ext.data.Store',
    storeId : 'Fast.store.company.Users',
    model: 'Fast.model.company.UserModel',
    autoLoad: true,
    pageSize: 35,
    autoLoad: {start: 0, limit: 35},
    proxy: {
        type: 'ajax',
        api: {
        	read : 'json/extDataControl?m=read',
            create : 'json/extDataControl?m=create',
            update: 'json/extDataControl?m=update',
            destroy: 'json/extDataControl?m=delete'
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