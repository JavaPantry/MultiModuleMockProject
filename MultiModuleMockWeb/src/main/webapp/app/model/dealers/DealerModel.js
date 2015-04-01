Ext.define('Fast.model.dealers.DealerModel', {
    extend: 'Ext.data.Model',
	fields: [
	     {name: 'id', type: 'number'},
         {name: 'dealerCode', type: 'string'},
         {name: 'dealerName', type: 'string'},
         {name: 'dealerType', type: 'string'},
         {name: 'hasDefaultAllocation', type: 'string'},
         {name: 'hasForecast', type: 'string'},
         {name: 'hasSellHand', type: 'string'},
         {name: 'hasQuota', type: 'string'}
     ]
});
