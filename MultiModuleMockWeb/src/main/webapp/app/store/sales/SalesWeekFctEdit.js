/*
 * store read with json in POST request
 * http://irscomp.blogspot.com/2012/01/how-to-post-data-in-json-format-in.html
 */
Ext.define('Fast.store.sales.SalesWeekFctEdit', {
	extend: 'Ext.data.Store',
    requires: ['Ext.data.reader.Json'],
    model: 'Fast.model.sales.SalesWeekFctModel',
    storeId:'Fast.store.sales.SalesWeekFctEdit',
    pageSize: 25,
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url : 'json/SalesWeekFctController?m=readForecastForSales&actualsType=R',
        //headers: ajaxCallHeader, timeout: ajaxCallTimeout, sorters: [{property: 'name',direction: 'ASC'}],
        actionMethods: {//http://stackoverflow.com/questions/7316967/extjs-4-problems-with-jsonstore-post-request
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        
        api: {
        	read : 'json/SalesWeekFctController?m=readForecastForSales&actualsType=R'
        	//,update:'json/SalesWeekFctController?m=update'
        },
        reader: { type: 'json', root: 'data', method: 'POST',
            		successProperty: 'success',
		            messageProperty: 'message',
		            totalProperty: 'totalCount'},
        writer: {type: 'json',
        	    //root: 'data', //remove {"data": from json string
        		writeAllFields: true,encode: false},
        
        doRequest: function(operation, callback, scope) {
            var writer  = this.getWriter(),
                request = this.buildRequest(operation, callback, scope);
               
            if (operation.allowWrite()) {
                request = writer.write(request);
            }
           
            Ext.apply(request, {
                headers       : this.headers,
                timeout       : this.timeout,
                scope         : this,
                callback      : this.createRequestCallback(request, operation, callback, scope),
                method        : this.getMethod(request)
                //jsonData        : this.jsonData// see comment below
            });
            /*
             * In this particular data Store we do read operation with POST request taking jsonData from store's proxy
             * when we do update we rely on ExtJs default behavior to detect and write jsonData to request body  
             */
            if( this.jsonData != ''){
            	Ext.apply(request, {
                    jsonData  : this.jsonData
                });
            }
            Ext.Ajax.request(request);               
            return request;
        },
        listeners: {
            exception: function(proxy, response, operation){
                Ext.MessageBox.show({
                    title: 'Remote Access Failed',
                    msg: operation.getError(),
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK});
            }
        /*,beforeload: function(store, operation,eOpts) {
            store.proxy.jsonData = store.jsonData;                        
            }*/
        }
    }
});