Ext.define('Fast.model.sales.UploadActualsModel', {
    extend: 'Ext.data.Model',
    fields:[
            {name: 'id', type: 'number'},
            {name: 'oddity', type: 'boolean'},
			{name: 'year', type: 'number'},
			{name: 'month', type: 'number'},
			
			{name: 'itemCode', type: 'string'},	
			{name: 'codeNumber', type: 'string'},
			{name: 'dollar1', type: 'number'},
			{name: 'unit1', type: 'number'},
			{name: 'dollar2', type: 'number'},
			{name: 'unit2', type: 'number'},
			{name: 'dollar3', type: 'number'},
			{name: 'unit3', type: 'number'},
			{name: 'dollar4', type: 'number'},
			{name: 'unit4', type: 'number'},
			{name: 'dollar5', type: 'number'},
			{name: 'unit5', type: 'number'},
			{name: 'actualType', type: 'string'},
			
			{name: 'createOn', type: 'date'},
			{name: 'createBy', type: 'string'},
			{name: 'updateOn', type: 'date'},
			{name: 'updateBy', type: 'string'},
			{name: 'version', type: 'number'}
         ]
});