Ext.define('Fast.store.dealers.Budget', {
    extend: 'Ext.data.Store',
    model: 'Fast.model.dealers.BudgetModel',
    storeId: 'Fast.store.dealers.Budget',
    autoLoad: false,
    pageSize: 35,

    proxy: {
        type: 'ajax',
        api: {
             read	: 'json/BudgetController?m=getBudgets'
            ,create : null//'json/commonBudget?m=createBudget'
            ,update : null//'json/BudgetController?m=updateBudget'
            ,destroy: null//'json/commonBudget?m=deleteBudget'
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