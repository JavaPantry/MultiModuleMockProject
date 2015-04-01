Ext.define('Fast.store.dealers.Option', {
    extend: 'Ext.data.Store',
    model: 'Fast.model.dealers.OptionModel',
    storeId : 'Fast.store.dealers.Option',
    autoLoad: false,
    pageSize: 35,
    
    proxy: {
        type: 'ajax',
        api: {
            read : null,
            create : null,
            update: 'json/commonDealer?m=updateDealer',
            destroy: null
        },
        reader: {
            type: 'json',
            root: 'dealers',
            successProperty: 'success',
            totalProperty: 'totalCount'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            encode: false
        },
        listeners: {
            exception: function(proxy, response, operation){
                var resp = Ext.JSON.decode(response.responseText,true);
                var message = '';
                if (resp != null){
                    message = resp.message;
                }
				Ext.MessageBox.show({
                    title: 'REMOTE EXCEPTION',
                    msg: message,
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    }
});