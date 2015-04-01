Ext.define('Fast.store.SMSChannel', {
    extend: 'Ext.data.Store',
    model: 'Fast.model.SMSHierarchyModel',
    storeId: 'Fast.store.SMSChannel',
    autoLoad: true,
    proxy: {
    	type: 'memory',
    	reader: {type: 'json',root: 'data'}
    }
});