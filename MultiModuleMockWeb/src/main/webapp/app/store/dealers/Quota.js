Ext.define('Fast.store.dealers.Quota', {
    extend: 'Ext.data.Store',
    model: 'Fast.model.dealers.QuotaModel',
    storeId: 'Fast.store.dealers.Quota',
    autoLoad: false,
    pageSize: 35,
    
    proxy: {
        type: 'ajax',
        api: {
             read	: 'json/commonDealer?m=getDealerQuotas'
            ,create : null//'json/commonDealer?m=createDealerQuota'
            ,update : null//'json/commonDealer?m=updateDealerQuota'
            ,destroy: 'json/commonDealer?m=deleteDealerQuota'
        },
        reader: {
            type: 'json',
            root: 'quotas',
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