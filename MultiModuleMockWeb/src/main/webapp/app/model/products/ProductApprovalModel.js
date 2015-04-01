Ext.define('Fast.model.products.ProductApprovalModel', {
    extend: 'Ext.data.Model',
	fields: [
	     {name: 'id', type: 'number'},
	     {name: 'mgmtGrp', type: 'string'},
	     {name: 'category', type: 'string'},
	     {name: 'categoryName', type: 'string'},
	     {name: 'codeNumber', type: 'string'},
	     {name: 'itemCode', type: 'string'},
         {name: 'itemName', type: 'string'},
	     {name: 'status', type: 'string'},
	     {name: 'approvedLevel', type: 'number'},
	     {name: 'comments', type: 'string'}
     ]
});