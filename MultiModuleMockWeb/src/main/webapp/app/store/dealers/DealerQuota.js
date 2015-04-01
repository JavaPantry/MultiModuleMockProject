Ext.define('Fast.store.dealers.DealerQuota', {
    extend: 'Ext.data.Store',
    model: 'Fast.model.dealers.DealerQuotaModel',
    storeId: 'Fast.store.dealers.DealerQuota',
    autoLoad: false,
    pageSize: 35,
    
    proxy: {
        type: 'ajax',
        api: {
             read	: 'json/DealerQuotaController?m=getDealersQuotas'
            ,create : null//'json/commonDealerQuota?m=createDealerQuota'
            ,update : 'json/DealerQuotaController?m=updateDealerQuota'
            ,destroy: null//'json/commonDealerQuota?m=deleteDealerQuota'
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
//          root: 'quotas',
            writeAllFields: true,
            encode: false
        },
        listeners: {
        	success: function(proxy, response, operation){
        	},
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