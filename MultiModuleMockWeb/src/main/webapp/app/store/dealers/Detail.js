Ext.define('Fast.store.dealers.Detail', {
    extend: 'Ext.data.Store',
    model: 'Fast.model.dealers.DetailModel',
    storeId: 'Fast.store.dealers.Detail',
    autoLoad: false,
    pageSize: 35,
//    autoLoad: {start: 0, limit: 35},
    
    proxy: {
        type: 'ajax',
        api: {
            read : 'json/commonDealer?m=getDealerDetails',
            create : 'json/commonDealer?m=createDealerDetail',
            update: 'json/commonDealer?m=updateDealerDetail',
            destroy: 'json/commonDealer?m=deleteDealerDetail'
        },
        reader: {
            type: 'json',
            root: 'details',
            successProperty: 'success',
            messageProperty: 'message',
            totalProperty: 'totalCount'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            encode: false
        },
        listeners: {
            exception: function(proxy, response, operation){
            	//TODO - <AP> Details.js if exception happens (once during update) -> TypeError: detailStore is undefined
            	//detailStore.load();
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