Ext.define('Fast.store.dealers.Hierarchy', {
    extend: 'Ext.data.Store',
    model: 'Fast.model.dealers.HierarchyModel',
    storeId : 'Fast.store.dealers.Hierarchy',
    autoLoad: false,
    pageSize: 35,
    proxy: {
        type: 'ajax',
        api: {
            read : 'json/commonDealer?m=getDealerHierarchies',
            create : 'json/commonDealer?m=createDealerHierarchy',
            update: 'json/commonDealer?m=updateDealerHierarchy',
            destroy: 'json/commonDealer?m=deleteDealerHierarchy'
        },
        reader: {
            type: 'json',
            root: 'data',//'hierarchies',
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
        	success: function(proxy, response, operation){
        		//console.log("json/commonDealer?m=getDealerHierarchies - sicess, response = '"+response+"'");
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