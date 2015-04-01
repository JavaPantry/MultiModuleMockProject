Ext.define('Fast.model.dealers.DealerQuotaDetailModel', {
    extend: 'Ext.data.Model',
	fields: [
	     {name: 'id', type: 'number'},
         {name: 'managerGrp', mapping: 'dealerDetail.data.managerGrp.managerGroup', type: 'string'},
         {name: 'category', mapping: 'dealerDetail.data.category', type: 'string'},
         {name: 'salesPerson', mapping: 'dealerDetail.data.salesPerson.data.userName', type: 'string'},
         {name: 'salesManager', mapping: 'dealerDetail.data.salesManager.data.userName', type: 'string'},
         {name: 'managerHierarchy', mapping: 'dealerDetail.data.managerGrp.managerGroup', type: 'string'},
         {name: 'categoryDescription', type: 'string'},

         {name: 'unit1', type: 'number'},
         {name: 'unit2', type: 'number'},
         {name: 'unit3', type: 'number'},
         {name: 'unit4', type: 'number'},
         {name: 'unit5', type: 'number'},
         {name: 'unit6', type: 'number'},
         {name: 'unit7', type: 'number'},
         {name: 'unit8', type: 'number'},
         {name: 'unit9', type: 'number'},
         {name: 'unit10', type: 'number'},
         {name: 'unit11', type: 'number'},
         {name: 'unit12', type: 'number'},
         
         {name: 'dollar1', type: 'number'},
         {name: 'dollar2', type: 'number'},
         {name: 'dollar3', type: 'number'},
         {name: 'dollar4', type: 'number'},
         {name: 'dollar5', type: 'number'},
         {name: 'dollar6', type: 'number'},
         {name: 'dollar7', type: 'number'},
         {name: 'dollar8', type: 'number'},
         {name: 'dollar9', type: 'number'},
         {name: 'dollar10', type: 'number'},
         {name: 'dollar11', type: 'number'},
         {name: 'dollar12', type: 'number'}
     ]
});