Ext.define('Fast.model.sales.SalesMonthFctModelExt', {
    extend: 'Ext.data.Model',
    fields: [
             //custom field
             //{name: 'dealer', type: 'auto'},
             {name: 'oddity', type: 'boolean'},
             
             //how to map nested json http://stackoverflow.com/questions/10500367/extjs-model-fields-with-subfields
             //see ca/canon/fast/web/sales/SalesMonthFctController.java
             {name: 'salesByAcct', type: 'auto'},
             {name: 'dealerName', type: 'string', mapping:'salesByAcct.data.dealer.data.dealerName'},
             {name: 'salesByAcctId', type: 'string', mapping:'salesByAcct.data.id'},
             
             //!!!see everNote "grid filtering on join column (column which coming from joined table)"
             //>{name: 'salesPerson', type: 'string', mapping:'salesByAcct.data.salesPerson.data.userName'},
             {name: 'salesByAcct.salesPerson.userName', type: 'string', mapping:'salesByAcct.data.salesPerson.data.userName'},
             
             {name: 'itemCategory', type: 'string', mapping:'salesByAcct.data.product.data.itemCategory'},
             {name: 'itemCode', type: 'string', mapping:'salesByAcct.data.product.data.itemCode'},
             
             //!!!see everNote "grid filtering on join column (column which coming from joined table)"
             //>{name: 'itemName', type: 'string', mapping:'salesByAcct.data.product.data.itemName'},
             {name: 'salesByAcct.product.itemName', type: 'string', mapping:'salesByAcct.data.product.data.itemName'},
             
             {name: 'mgmtGrp', type: 'string', mapping:'salesByAcct.data.product.data.mgmtGrp'},
             
             {name: 'statusType', type: 'auto'},
             {name: 'statusDescription', type: 'string', mapping:'statusType.data.description'},
             {name: 'status', type: 'number'}, 
             
             {name: 'firstHalf', type: 'boolean', mapping:'yearForecast.data.firstHalf'},
             {name: 'secondHalf', type: 'boolean', mapping:'yearForecast.data.secondHalf'},
             
             {name: 'id', type: 'number'},
             {name: 'year', type: 'number'},
    	     {name: 'actualType', type: 'string'},
             
             {name: 'isActive', type: 'boolean'},
             {name: 'isApproved', type: 'boolean'},
             {name: 'approver', type: 'string'},

             {name: 'startHalf', type: 'number'},
             {name: 'secondSalesMonthFctId', type: 'number'},
             
             {name: 'secondYearFirstHalf', type: 'boolean'},
             {name: 'secondYearSecondHalf', type: 'boolean'},
             
             {name: 'endHalf', type: 'number'},

             {name: 'CF1', type: 'number'},
             {name: 'CF2', type: 'number'},
             {name: 'CF3', type: 'number'},
             {name: 'CF4', type: 'number'},
             {name: 'CF5', type: 'number'},
             {name: 'CF6', type: 'number'},
             {name: 'CF7', type: 'number'},
             {name: 'CF8', type: 'number'},
             {name: 'CF9', type: 'number'},
             {name: 'CF10', type: 'number'},
             {name: 'CF11', type: 'number'},
             {name: 'CF12', type: 'number'},

             {name: 'CF13', type: 'number'},
             {name: 'CF14', type: 'number'},
             {name: 'CF15', type: 'number'},
             {name: 'CF16', type: 'number'},
             {name: 'CF17', type: 'number'},
             {name: 'CF18', type: 'number'},

             {name: 'comment1', type: 'string'},
             {name: 'comment2', type: 'string'},
             {name: 'comment3', type: 'string'},
             {name: 'comment4', type: 'string'},
             {name: 'comment5', type: 'string'},
             {name: 'comment6', type: 'string'},
             {name: 'comment7', type: 'string'},
             {name: 'comment8', type: 'string'},
             {name: 'comment9', type: 'string'},
             {name: 'comment10', type: 'string'},
             {name: 'comment11', type: 'string'},
             {name: 'comment12', type: 'string'},
             
             {name: 'comment13', type: 'string'},
             {name: 'comment14', type: 'string'},
             {name: 'comment15', type: 'string'},
             {name: 'comment16', type: 'string'},
             {name: 'comment17', type: 'string'},
             {name: 'comment18', type: 'string'},

             {name: 'comments', type: 'string'},
    	     {name: 'createOn', type: 'date'},
    	     {name: 'createBy', type: 'string'},
    	     {name: 'updateOn', type: 'date'},
    	     {name: 'updateBy', type: 'string'},
    	     {name: 'version', type: 'number'}
             ]
});