Ext.define('Fast.model.CategoryModel', {
    extend: 'Ext.data.Model',
	fields: [
         {name: 'categoryCode', type: 'string'},
         {name: 'abbreviation', type: 'string'},
         {name: 'commonField', type: 'string'},
         {name: 'indicator', type: 'string'}
     ]
});
