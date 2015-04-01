Ext.define('Fast.store.company.AccessLevels', {
    extend: 'Ext.data.Store',
    storeId: 'Fast.store.company.AccessLevels',
    model: 'Fast.model.company.AccessLevelsModel',
    autoLoad: true,
    pageSize: 35,
    autoLoad: {start: 0, limit: 35},
    //renderTo:'mydiv',
    proxy: {
        type: 'ajax',
        api: {
        	read : 'json/companyAccessLevelsAction?m=read',
            create : 'json/companyAccessLevelsAction?m=create',
            update: 'json/companyAccessLevelsAction?m=update',
            destroy: 'json/companyAccessLevelsAction?m=delete'
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
        }
        ,listeners: {
            exception: function(proxy, response, operation){
            	var resp = Ext.JSON.decode(response.responseText,true);
                Ext.MessageBox.show({
                    title: 'Remote Access Failed',
                    msg: resp.msg,
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    }
});