Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', 'resources/js/extjs-4.2.1/ux');
Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.state.*',
    'Ext.form.*',
    'Ext.QuickTips.*',
    'Ext.ux.CheckColumn',
    'Ext.ux.grid.FiltersFeature',
    'Ext.toolbar.Toolbar',
    'Ext.toolbar.Paging'
]);	
Ext.application({
    name: 'Fast',
	renderTo: Ext.getBody(),

    // Define all the controllers that should initialize at boot up of your application
    controllers: [
        'products.ProductsController'
        ,'dealers.DealersController'
        
        ,'sales.SalesApprovalController'
        ,'sales.SalesProductByAccountController'
        ,'sales.SalesForecastController'
        
        //TODO - <AP> do I really need to break one sub-tab controller to too many small sub-controllers?
        ,'company.HierarchyController'
        ,'company.Level1Controller'
        ,'company.Level2Controller'
        ,'company.ManagerGrpController'
        ,'company.DealerGroupController'
        //TODO - <AP> do I really need to break one sub-tab controller to too many small sub-controllers?
        ,'company.UserSelectController'
        ,'company.UserAccessController'
        ,'company.AccessLevelsController'
        ,'company.YearForecastController'
        ,'company.DealerGroupController'
    ],
    init: function(app){
    	//debugger;
		isProductAccessible = isProductAccessible=='true'?false:true;
		isSaleAccessible = isSaleAccessible=='true'?false:true;
		isDealerAccessible = isDealerAccessible=='true'?false:true; 
		isCompanyAccessible = isCompanyAccessible=='true'?false:true;
		//console.log('Fast app loaded controllers = '+controllers);    	
    },
    autoCreateViewport: true
});
