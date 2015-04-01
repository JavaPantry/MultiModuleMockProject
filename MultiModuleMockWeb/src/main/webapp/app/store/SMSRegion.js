
Ext.define('Fast.store.SMSRegion', {
    extend: 'Ext.data.Store',
    model: 'Fast.model.SMSHierarchyModel',
    storeId: 'Fast.store.SMSRegion',
    autoLoad: true,
    proxy: {
    	type: 'memory',
    	reader: {type: 'json',root: 'data'
        }
    }
});