Ext.define('Fast.model.sales.ProductByAccountModel', {
    extend: 'Ext.data.Model',
    fields: [
    	     {name: 'sequenceNumber', type: 'number'},
    	     {name: 'id', type: 'number'},
    	     {name: 'dealerId', type: 'number'},
             {name: 'customerCode', type: 'string'},
             {name: 'customerName', type: 'string'},
    	     {name: 'salesPersonId', type: 'number'},
             {name: 'salesPerson', type: 'string'},
             {name: 'accountStatus', type: 'string'},
             {name: 'submittedById', type: 'number'},
             {name: 'submittedBy', type: 'string'},
    	     {name: 'approverId', type: 'number'},
             {name: 'approver', type: 'string'},
             {name: 'category', type: 'string'},
             {name: 'managementGroup', type: 'string'},
             {name: 'categoryName', type: 'string'},
             {name: 'codeNumber', type: 'string'},
             {name: 'itemCode', type: 'string'},
             {name: 'itemName', type: 'string'},
             {name: 'defaultM', type: 'number'},
             {name: 'defaultM2', type: 'number'},
             {name: 'adjustedM', type: 'number'},
             {name: 'adjustedM2', type: 'number'},
             {name: 'calculatedCost', type: 'string'},
             {name: 'adjustedComments', type: 'string'},
             {name: 'deleted', type: 'boolean'},
    	     {name: 'version', type: 'number'}
         ]
    
});