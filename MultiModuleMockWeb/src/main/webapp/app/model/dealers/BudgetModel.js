Ext.define('Fast.model.dealers.BudgetModel', {
    extend: 'Ext.data.Model',
	fields: [
	     {name: 'id', type: 'number'},
         {name: 'year',  type: 'integer'},
         {name: 'year1stHalf',  type: 'boolean'},
         {name: 'year2ndHalf',  type: 'boolean'}
         ]
});