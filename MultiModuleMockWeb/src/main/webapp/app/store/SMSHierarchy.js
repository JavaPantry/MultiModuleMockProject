Ext.define('Fast.store.SMSHierarchy', {
    extend: 'Ext.data.Store',
    model: 'Fast.model.SMSHierarchyModel',
    storeId: 'Fast.store.SMSHierarchy',
    pageSize: 35,
    autoLoad: true,

    proxy: {
        type: 'ajax',
        api: {
            read : 'json/commonDropDown?m=getSMSHierarchies',
            create : null,
            update: null,
            destroy: null
        },
        reader: {
            type: 'json',
            root: 'data',//'smsHierarchies',
            successProperty: 'success',
            totalProperty: 'totalCount'            
        },
        listeners: {
            exception: function(proxy, response, operation){
                Ext.MessageBox.show({
                    title: 'REMOTE EXCEPTION',
                    msg: operation.getError(),
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            },
            load: function(store,records,flag,operation,options){
            	Ext.MessageBox.alert('','Store loading has been completed!');
	        }
        }
    }
});