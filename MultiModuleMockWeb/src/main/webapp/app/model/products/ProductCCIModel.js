Ext.define('Fast.model.products.ProductCCIModel', {
    extend: 'Ext.data.Model',
	fields: [
	         {name: 'itemCode', type: 'string'},
	         {name: 'shortCode', type: 'string'},
	         {name: 'itemName', type: 'string'},
	         {name: 'category', type: 'string'},
	         {name: 'msrp', type: 'string'},
	         {name: 'itemSeries', type: 'string'},
	         {name: 'countryOrigin', type: 'string'},
	         {name: 'codeNumber', type: 'string'}
     ]
});