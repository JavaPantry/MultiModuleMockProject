Ext.define('Fast.store.company.DealerGroupDetail', {
    extend: 'Ext.data.Store',
    model: 'Fast.model.company.DealerGroupDetailModel',
    storeId : 'Fast.store.company.DealerGroupDetail',
    autoLoad: false,
    pageSize: 35,
    remoteSort: true,
    
    proxy: {
        type: 'ajax',
        api: {
            read : 'json/DealerGroupController?m=getDealerGroupDetails',
            create : 'json/DealerGroupController?m=updateDealerGroupDetail',
            update: 'json/DealerGroupController?m=updateDealerGroupDetail',
            destroy: 'json/DealerGroupController?m=deleteDealerGroupDetail'
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
                var resp = Ext.JSON.decode(response.responseText,false);
                var message = 'Default exception handler in DealerGroupDetail store.';
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