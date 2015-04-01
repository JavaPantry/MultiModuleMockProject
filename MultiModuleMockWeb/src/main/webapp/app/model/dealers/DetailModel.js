Ext.define('Fast.model.dealers.DetailModel', {
    extend: 'Ext.data.Model',
	fields: [
	     {name: 'sequenceNumber', type: 'number'},
	     {name: 'id', type: 'number'},
	     {name: 'dealerId', type: 'number'},
	     {name: 'salesPersonId', type: 'number'},
	     {name: 'salesManagerId', type: 'number'},
	     {name: 'managerGrpId', type: 'number'},
         {name: 'category', type: 'string'},
         {name: 'dealerM', type: 'number'},
         {name: 'dealerM2', type: 'number'},
         {name: 'managementGroup', type: 'string'},
         {name: 'categoryName', type: 'string'},
         {name: 'salesPerson', type: 'string'},
         {name: 'salesManager', type: 'string'},
         {name: 'managerGroup', type: 'string'},
	     {name: 'createOn', type: 'number'},
         {name: 'createBy', type: 'string'},
	     {name: 'updateOn', type: 'number'},
         {name: 'updateBy', type: 'string'},
         {name: 'deleted', type: 'boolean'}
     ]
});

