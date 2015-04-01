Ext.define('Fast.model.dealers.HierarchyModel', {
    extend: 'Ext.data.Model',
	fields: [
	     {name: 'sequenceNumber', type: 'number'},
	     {name: 'id', type: 'number'},
         {name: 'dealerId', type: 'number'},
         {name: 'parameter1', type: 'string'},
         {name: 'value1', type: 'string'},
         {name: 'smsValue1', type: 'string'},
         {name: 'parameter2', type: 'string'},
         {name: 'value2', type: 'string'},
         {name: 'smsValue2', type: 'string'},
         {name: 'parameter3', type: 'string'},
         {name: 'value3', type: 'string'},
         {name: 'smsValue3', type: 'string'},
         {name: 'parameter4', type: 'string'},
         {name: 'value4', type: 'string'},
         {name: 'parameter5', type: 'string'},
         {name: 'value5', type: 'string'},
	     {name: 'createOn', type: 'number'},
         {name: 'createBy', type: 'string'},
	     {name: 'updateOn', type: 'number'},
         {name: 'updateBy', type: 'string'},
         {name: 'deleted', type: 'boolean'}
     ]
});

