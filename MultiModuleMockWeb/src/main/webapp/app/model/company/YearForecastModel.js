Ext.define('Fast.model.company.YearForecastModel', {
    extend: 'Ext.data.Model',
    fields: [
    	     {name: 'id', type: 'number'},
    	     {name: 'year', type: 'number'},
    	     {name: 'firstHalf', type: 'boolean'},
    	     {name: 'secondHalf', type: 'boolean'},
    	     {name: 'version', type: 'number'}
         ]
});