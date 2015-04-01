Ext.define('Fast.store.sales.AccountApproval', {
    extend: 'Ext.data.Store',
    model: 'Fast.model.sales.AccountApprovalModel',
    storeId: 'Fast.store.sales.AccountApproval',
    pageSize: 35,
    autoLoad: false,//{start: 0, limit: 35},
    
    proxy: {
        type: 'ajax',
        api: {
            read : 'json/commonSales?m=getAccountApprovals'
            //create : null,
            //update: null,
            //destroy: 'json/commonSales?m=updateAccountApproval'
        },
        reader: {
            type: 'json',
            //TODO - <AP> make root 'data' to reuse BaseAction
            root: 'data',//'accountApprovals',
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