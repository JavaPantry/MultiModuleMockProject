Ext.define('Fast.store.sales.SalesForecastDealers', {
    extend: 'Ext.data.Store',
    requires: ['Ext.data.reader.Json'],
    model: 'Fast.model.sales.SalesForecastDealersModel',
    storeId:'Fast.store.sales.SalesForecastDealers',
    pageSize: 35,
    autoLoad: false,
    proxy: {
        type: 'ajax',
        api: {
        	read : 'json/SalesDealerFctController?m=read',
            create :null, //'json/SalesWeekFctController?m=create',
            update :null, // 'json/SalesWeekFctController?m=update'
            destroy:null // 'json/SalesWeekFctController?m=delete'
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
            //root: 'data'
        },
        listeners: {
            exception: function(proxy, response, operation){
                Ext.MessageBox.show({
                    title: 'Remote Access Failed',
                    msg: operation.getError(),
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    }
});