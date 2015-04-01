Ext.define('Fast.model.dealers.QuotaModel', {
    extend: 'Ext.data.Model',
	fields: [
	     {name: 'id', type: 'number'},
         {name: 'dealerId', mapping: 'dealer.id',type: 'number'},
         {name: 'category', type: 'string'},
         {name: 'amtType',  type: 'integer'},
         {name: 'year',  type: 'integer'},
         {name: 'a1', type: 'number'},
         {name: 'a2', type: 'number'},
         {name: 'a3', type: 'number'},
         {name: 'a4', type: 'number'},
         {name: 'a5', type: 'number'},
         {name: 'a6', type: 'number'},
         {name: 'a7', type: 'number'},
         {name: 'a8', type: 'number'},
         {name: 'a9', type: 'number'},
         {name: 'a10', type: 'number'},
         {name: 'a11', type: 'number'},
         {name: 'a12', type: 'number'}
     ]
});