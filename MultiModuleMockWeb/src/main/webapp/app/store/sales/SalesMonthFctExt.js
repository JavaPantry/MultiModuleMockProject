/*
 * store read with json in POST request
 * http://irscomp.blogspot.com/2012/01/how-to-post-data-in-json-format-in.html
 */
Ext.define('Fast.store.sales.SalesMonthFctExt', {
	extend: 'Ext.data.Store'
	,grid: null // set by MonthHomeGridExt.init()
    ,requires: ['Ext.data.reader.Json']
    ,model: 'Fast.model.sales.SalesMonthFctModelExt'
    ,storeId:'Fast.store.sales.SalesMonthFctExt'
    ,pageSize: 35
    ,autoLoad: false
    ,proxy: {
        type: 'ajax'
        ,url : 'json/SalesMonthFctController?m=readForecastForSalesExt'
        //headers: ajaxCallHeader, timeout: ajaxCallTimeout, sorters: [{property: 'name',direction: 'ASC'}],
        ,actionMethods: {//   http://stackoverflow.com/questions/7316967/extjs-4-problems-with-jsonstore-post-request
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        }
        
        ,api: {
        	read : 'json/SalesMonthFctController?m=readForecastForSalesExt'
        	//,update:'json/SalesMonthFctController?m=update'
        }
        ,reader: { type: 'json', root: 'data', method: 'POST',
					successProperty: 'success',
					messageProperty: 'message',
					totalProperty: 'totalCount'}
        ,writer: {type: 'json', 
        		//root: 'data', //remove {"data": from json string 
        		writeAllFields: true,encode: false}
        
        ,doRequest: function(operation, callback, scope) {
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
                    jsonData        : this.jsonData
                });
            }
            Ext.Ajax.request(request);               
            return request;
        }//eof doRequest 
        ,listeners: {//see: src\data\AbstractStore
            exception: function(proxy, response, operation){
                Ext.MessageBox.show({
                    title: 'Remote Access Failed',
                    msg: operation.getError(),
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK});
            }
        }
    }


	,listeners: {//see: src\data\AbstractStore
	    load: function( store, records, successful, eOpts ){
	    	//console.log ('SalesMonthFctExt:load eOpts = ' + eOpts);
	    	//console.log ('SalesMonthFctExt:load store = ' + store);
	    	//console.log ('SalesMonthFctExt:load store.grid = ' + store.grid);
	    	//console.log ('SalesMonthFctExt:load records = ' + records);
	    	if(records == null || records.length == 0)
	    		return;
	    	var startIdx = records[0].data.startHalf*6;// multyply idx by 0 or 1 to start either from Jan or July
	    	var countDown= (startIdx==0)?12:6; 
	    	var monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'
	    	                  ,'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	    	var yearStr = '/'+records[0].data.year%100;
	    	var year2ndStr = '/'+(records[0].data.year+1)%100;
	    	
	    	for (var i=0; i<store.grid.columns.length;i++){
	    		var c = store.grid.columns[i];
	    		if(c.fastItemId == undefined) continue;
	    		var monthId = c.fastItemId.split('/');// months columns have ids in format '0/##'
	    		if( monthId[0] == '0'){
	    			var idx = startIdx + Number(monthId[1]).valueOf();
	    			var columnName = monthNames[idx];
	    			var suffix = yearStr;
	    			if(countDown <= 0)
	    				suffix = year2ndStr;
	    			c.setText(columnName+suffix);
	    			countDown--;
	    		}
	    	}
	    }
	}

});