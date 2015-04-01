Ext.define('Fast.model.company.DealerGroupDetailModel', {
    extend: 'Ext.data.Model',
	fields: [
	      {name: 'id',				type: 'number'}
	     ,{name: 'dealerCode',		type: 'string'}
         ,{name: 'dealerName',		type: 'string'}
         ,{name: 'dealerType',		type: 'string'}
         ,{name: 'isInclude',		type: 'boolean'}
         ,{name: 'dealerGroupId',	type: 'number'}
     ]
});
