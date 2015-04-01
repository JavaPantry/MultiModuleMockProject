Ext.define('Fast.store.dealers.Lookup', {
    extend: 'Ext.data.Store',
    model: 'Fast.model.dealers.DealerModel',
    storeId: 'Fast.store.dealers.Lookup',
    autoLoad: false,
    pageSize: 35,
    remoteSort: true,
    
    proxy: {
        type: 'ajax',
        api: {
            read : 'json/commonDealer?m=getCCIDealers',
            create : null,
            update: 'json/commonDealer?m=validateAndCreateDealer',
            destroy: null
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success',
            totalProperty: 'totalCount'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            encode: false
        }
        ,listeners: {
            exception: function(proxy, response, operation){
            	//TODO - <AP> what's lookupStore.load(); doing on exception?!
            	//lookupStore.load();
                var resp = Ext.JSON.decode(response.responseText,true);
                var message = 'Default exception handler in Lookup store.';
                if (resp != null && resp.message != null && resp.message != ''){
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