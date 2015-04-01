Ext.define('Fast.controller.company.YearForecastController', {
    extend: 'Ext.app.Controller',
    stores: ['company.YearForecast'],
    models: ['company.YearForecastModel'],
    views: ['company.YearForecastGrid','company.YearForecastForm'],
    refs: [{ref:'YearForecastGrid',selector:'YearForecastGrid'}],

    init: function() {
        this.control({
			            'YearForecastGrid button[action=newYearForecast]': {click: this.newYearForecast}
			            ,'YearForecastGrid button[action=deleteYearForecast]': {click: this.deleteYearForecast}
			            ,'YearForecastForm button[action=yearForecastSave]': {click: this.saveYearForecast}
			        });
    },
// ************* Action  Handlers *************
    newYearForecast : function(){
    	var edit = Ext.create('Fast.view.company.YearForecastForm');
	}
	,saveYearForecast : function(button) {
        var win    = button.up('window');
		var form   = win.down('form');
		var formRef= form.getForm();
        var theStore = this.getCompanyYearForecastStore();
        
        formRef.submit({
     		url: 'json/YearForecastController?m=update'
     		//,submitEmptyText: false
     		,success: function(form, action) {
     			win.close();
     			theStore.load();
	        }
	        ,failure: function(form, action) {
	        		theStore.load();
					Ext.MessageBox.show({title: 'ERROR',
										msg: 'Server side Error',//action.result.message,
										icon: Ext.MessageBox.ERROR,
										buttons: Ext.Msg.OK});
			}
        });//eof formRef.submit
    }
	
	,deleteYearForecast: function(button) {
    	var grid = this.getYearForecastGrid(),
    	record = grid.getSelectionModel().getSelection(), 
        theStore = this.getCompanyYearForecastStore();
	    theStore.remove(record);
	    var syncOptions = {	controller:this,
							theStore:theStore,
							success:this.deleteYearForecastSyncCallback,
							failure:this.failureDeleteYearForecastSyncCallback};        
        theStore.sync(syncOptions);
    }
    
    ,deleteYearForecastSyncCallback:function (batch, syncOptions){
    	syncOptions.theStore.load();
    }
    ,failureDeleteYearForecastSyncCallback:function (batch, syncOptions){
    	//console.log('error in delete op.')
    }
});

