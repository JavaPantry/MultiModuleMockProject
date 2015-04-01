Ext.define('Fast.store.company.UserSelect', {
    extend: 'Ext.data.Store',
    storeId:'Fast.store.company.UserSelect',
    //model: 'Fast.model.company.UserSelectModel',
    model: 'Fast.model.company.UserDetailModel',
    autoLoad: true,
    pageSize: 35,
    constantUrl:'json/companyUserSelectAction?m=read',
    autoLoad: {start: 0, limit: 35},
    //renderTo:'mydiv',
    proxy: {
        type: 'ajax',
        api: {
        	read : 'json/companyUserSelectAction?m=read',
            create : 'json/companyUserSelectAction?m=create',
            update: 'json/companyUserSelectAction?m=update',
            destroy: 'json/companyUserSelectAction?m=delete'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success',
            totalProperty : 'totalCount'
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