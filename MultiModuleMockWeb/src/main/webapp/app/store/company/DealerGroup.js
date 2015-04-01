Ext.define('Fast.store.company.DealerGroup', {
    extend: 'Ext.data.Store',
    model: 'Fast.model.company.DealerGroupModel',
    storeId : 'Fast.store.company.DealerGroup',
    autoLoad: false,
    pageSize: 35,
    remoteSort: true,
    
    proxy: {
        type: 'ajax',
        api: {
            read : 'json/DealerGroupController?m=getDealerGroups',
            create : 'json/DealerGroupController?m=updateDealerGroup',
            update: 'json/DealerGroupController?m=updateDealerGroup',
            destroy: 'json/DealerGroupController?m=deleteDealerGroup'
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
                var message = 'Default exception handler in DealerGroup store.';
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