Ext.define('Fast.model.dealers.OptionModel', {
    extend: 'Ext.data.Model',
	fields: [
	     {name: 'sequenceNumber', type: 'number'},
	     {name: 'id', type: 'number'},
         {name: 'dealerCode', type: 'string'},
         {name: 'dealerName', type: 'string'},
         {name: 'hasDefaultAllocation', type: 'string'},
         {name: 'hasForecast', type: 'string'},
         {name: 'hasSellHand', type: 'string'},
         {name: 'hasQuota', type: 'string'},
	     {name: 'createOn', type: 'number'},
         {name: 'createBy', type: 'string'},
	     {name: 'updateOn', type: 'number'},
         {name: 'updateBy', type: 'string'},
         {name: 'deleted', type: 'boolean'}
     ]
});
