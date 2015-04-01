Ext.define('Fast.model.dealers.DealerQuotaModel', {
    extend: 'Ext.data.Model',
	fields: [
	     {name: 'id', type: 'number'},
         {name: 'dealerId', mapping: 'dealer.data.id', type: 'number'},
         {name: 'dealerCode', mapping: 'dealer.data.dealerCode', type: 'string'},
         {name: 'dealerName', mapping: 'dealer.data.dealerName', type: 'string'},
         {name: 'dealerType', mapping: 'dealer.data.dealerType', type: 'string'},
         {name: 'year',  type: 'integer'},
         {name: 'year1stHalf',  type: 'boolean'},
         {name: 'year2ndHalf',  type: 'boolean'}
         ]
});