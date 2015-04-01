Ext.define('Fast.store.company.Hierarchy', {
    extend: 'Ext.data.Store',
    storeId: 'Fast.store.company.Hierarchy',
    model: 'Fast.model.company.HierarchyModel',
    autoLoad: true,//TODO - <AP> remove autoload
    pageSize: 35,
    autoLoad: {start: 0, limit: 35},

    proxy: {
        type: 'ajax',
        api: {
        	read : 'json/companyHierarchyAction?m=read',
            create : 'json/companyHierarchyAction?m=create',
            update: 'json/companyHierarchyAction?m=update',
            destroy: 'json/companyHierarchyAction?m=delete'	
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            encode: false,
            root: 'data'
        },
        listeners: {
            exception: function(proxy, response, operation){
                var resp = Ext.JSON.decode(response.responseText,true);
                var message = 'Default exception handler in Hierarchy store.';
                if (resp != null && resp.message != null && resp.message != ''){
                    message = resp.message;
                }
				Ext.MessageBox.show({
                    title: 'REMOTE EXCEPTION',
                    msg: message,//'Default exception handler in Dealer store.',//
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK});
            }
        }
    }
});