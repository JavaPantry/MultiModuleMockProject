Ext.define('Fast.store.sales.UploadActuals', {
	extend: 'Ext.data.Store',
    requires: ['Ext.data.reader.Json'],
    model: 'Fast.model.sales.UploadActualsModel',
    storeId:'Fast.store.sales.UploadActuals',
    pageSize: 35,
    autoLoad: false,
    proxy: {
        type: 'ajax'
        ,api: {
        	read : 'json/SalesMonthFctSpreadsheetController?m=readUploadedErrors',
            create : null,
            update: null,
            destroy: 'json/SalesMonthFctSpreadsheetController?m=deleteUploadedErrors'
        }

        ,reader: {	type: 'json', 
        			root: 'data', 
					successProperty: 'success',
					messageProperty: 'message',
					totalProperty: 'totalCount'}

        ,listeners: {
            exception: function(proxy, response, operation){
                Ext.MessageBox.show({
                    title: 'Remote Access Failed',
                    msg: operation.getError(),
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK});
            }
        }
    }

});