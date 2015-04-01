Ext.define('Fast.store.dealers.Dealer', {
    extend: 'Ext.data.Store',
    model: 'Fast.model.dealers.DealerModel',
    storeId : 'Fast.store.dealers.Dealer',
    autoLoad: false,
    pageSize: 35,
    remoteSort: true,
    
    proxy: {
        type: 'ajax',
        api: {
            read : 'json/commonDealer?m=getDealers',
            create : 'json/commonDealer?m=validateAndCreateDealer',
            update: null,
            destroy: 'json/commonDealer?m=deleteDealer'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success',
            messageProperty: 'message',
            totalProperty: 'totalCount'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            encode: false
        }
        ,listeners: {
            exception: function(proxy, response, operation){
            	//done in DealerController:failureSyncCallback -> dealerStore.load();
                var resp = Ext.JSON.decode(response.responseText,true);
                var message = 'Default exception handler in Dealer store.';
                if (resp != null && resp.message != null && resp.message != ''){
                    message = resp.message;
                }
				Ext.MessageBox.show({
                    title: 'REMOTE EXCEPTION',
                    msg: message,//'Default exception handler in Dealer store.',//
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    }
});