Ext.define('Fast.store.company.SalesManager', {
    extend: 'Ext.data.Store',
    storeId: 'Fast.store.company.SalesManager',
    model: 'Fast.model.company.SalesManagerModel',
    //autoLoad: true,
    pageSize: 35,
    autoLoad: {start: 0, limit: 35},
    //renderTo:'mydiv',
    proxy: {
        type: 'ajax',
        api: {
        	read : 'json/companySalesManagerAction?m=read',
            create : 'json/companySalesManagerAction?m=create',
            update: 'json/companySalesManagerAction?m=update',
            destroy: 'json/companySalesManagerAction?m=delete'
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
            /*exception: function(proxy, response, operation){
                Ext.MessageBox.show({
                    title: 'Remote Access Failed',
                    msg: operation.getError(),
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }*/
        }
    }
});