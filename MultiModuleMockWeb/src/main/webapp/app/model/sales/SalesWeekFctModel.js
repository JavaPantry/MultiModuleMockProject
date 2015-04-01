Ext.define('Fast.model.sales.SalesWeekFctModel', {
    extend: 'Ext.data.Model',
    fields: [
             //how to map nested json http://stackoverflow.com/questions/10500367/extjs-model-fields-with-subfields
             //see ca/canon/fast/web/sales/SalesMonthFctController.java
             {name: 'oddity', type: 'boolean'},
             {name: 'salesByAcct', type: 'auto'},
             {name: 'dealerName', type: 'string', mapping:'salesByAcct.data.dealer.data.dealerName'},
             {name: 'salesByAcctId', type: 'string', mapping:'salesByAcct.data.id'},

             {name: 'salesByAcct.salesPerson.userName', type: 'string', mapping:'salesByAcct.data.salesPerson.data.userName'},
             
             {name: 'itemCategory', type: 'string', mapping:'salesByAcct.data.product.data.itemCategory'},
             {name: 'itemCode', type: 'string', mapping:'salesByAcct.data.product.data.itemCode'},
             
             //!!!see everNote "grid filtering on join column (column which coming from joined table)"
             //>{name: 'itemName', type: 'string', mapping:'salesByAcct.data.product.data.itemName'},
             {name: 'salesByAcct.product.itemName', type: 'string', mapping:'salesByAcct.data.product.data.itemName'},
             
             {name: 'mgmtGrp', type: 'string', mapping:'salesByAcct.data.product.data.mgmtGrp'},
             
             {name: 'statusType', type: 'auto'},
             {name: 'statusDescription', type: 'string', mapping:'statusType.data.description'},
             {name: 'status', type: 'number'}, //int] NULL,
             
             {name: 'firstHalf', type: 'boolean', mapping:'yearForecast.data.firstHalf'},
             {name: 'secondHalf', type: 'boolean', mapping:'yearForecast.data.secondHalf'},

    	     {name: 'id', type: 'number'},
    	     {name: 'actualType', type: 'string'},
    	     {name: 'year', type: 'number'},
    	     {name: 'month', type: 'number'},
    	     {name: 'original', type: 'number'},// [decimal](9, 0) NULL,
    	     {name: 'unit1', type: 'number'},// [decimal](9, 0) NULL,
    	     {name: 'unit2', type: 'number'},
    	     {name: 'unit3', type: 'number'},
    	     {name: 'unit4', type: 'number'},
    	     {name: 'unit5', type: 'number'},
    	     {name: 'dollar1', type: 'number'},// [decimal](9, 0) NULL,
    	     {name: 'dollar2', type: 'number'},
    	     {name: 'dollar3', type: 'number'},
    	     {name: 'dollar4', type: 'number'},
    	     {name: 'dollar5', type: 'number'},
    	     {name: 'comment1', type: 'string'},// [varchar](100) NULL,
    	     {name: 'comment2', type: 'string'},
    	     {name: 'comment3', type: 'string'},
    	     {name: 'comment4', type: 'string'},
    	     {name: 'comment5', type: 'string'},
    	     {name: 'isActive', type: 'boolean'},//bit
    	     /*{name: 'isApproved', type: 'boolean'},//bit
    	     {name: 'approver', type: 'string'},*/// [varchar](50) NULL,
    	     {name: 'comments', type: 'string'},// [varchar](2000) NULL,
    	     {name: 'createOn', type: 'date'},
    	     {name: 'createBy', type: 'string'},// [varchar](50) NULL,
    	     {name: 'updateOn', type: 'date'},
    	     {name: 'updateBy', type: 'string'},
    	     {name: 'version', type: 'number'}
         ]
    
});