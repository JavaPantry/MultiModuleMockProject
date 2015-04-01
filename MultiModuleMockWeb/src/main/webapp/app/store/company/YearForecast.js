Ext.define('Fast.store.company.YearForecast', {
    extend: 'Ext.data.Store',
    requires: ['Ext.data.reader.Json'],
    model: 'Fast.model.company.YearForecastModel',
    storeId:'Fast.store.company.YearForecast',
    pageSize: 35,
    autoLoad: false,//{start: 0, limit: 35},
    proxy: {
        type: 'ajax',
        api: {
        	read : 'json/YearForecastController?m=read',
            create :null, //'json/YearForecastController?m=create',
            update :null, // 'json/YearForecastController?m=update'
            destroy:'json/YearForecastController?m=delete'
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