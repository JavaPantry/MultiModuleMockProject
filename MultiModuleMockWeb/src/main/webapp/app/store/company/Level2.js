Ext.define('Fast.store.company.Level2', {
    extend: 'Ext.data.Store',
    storeId: 'Fast.store.company.Level2',
    model: 'Fast.model.company.Level2Model',
    autoLoad: true,
    pageSize: 35,
    autoLoad: {start: 0, limit: 35},
    renderTo:'mydiv',
    proxy: {
        type: 'ajax',
        api: {
        	read : 'json/companyLevel2Action?m=read',
            create : 'json/companyLevel2Action?m=create',
            update: 'json/companyLevel2Action?m=update',
            destroy: 'json/companyLevel2Action?m=delete'
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