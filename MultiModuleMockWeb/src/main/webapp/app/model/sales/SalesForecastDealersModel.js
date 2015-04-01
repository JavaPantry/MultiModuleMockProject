Ext.define('Fast.model.sales.SalesForecastDealersModel', {
    extend: 'Ext.data.Model',
    fields: [
             {name: 'dealerId', type: 'number'}, 
             {name: 'dealerName', type: 'string'}, 
    	     {name: 'salesIds', type: 'string'}
             ]
});