Ext.define('Fast.store.products.ProductApproval', {
    extend: 'Ext.data.Store',
    model: 'Fast.model.products.ProductApprovalModel',
    storeId: 'Fast.store.products.ProductApproval',
    pageSize: 35,
    
    proxy: {
        type: 'ajax',
        api: {
            read : 'json/commonProduct?m=getProductApprovals',
            create : null,
            update: null,
            destroy: 'json/commonProduct?m=updateProductApproval'
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