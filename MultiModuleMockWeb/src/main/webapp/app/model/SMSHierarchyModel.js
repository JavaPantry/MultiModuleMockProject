Ext.define('Fast.model.SMSHierarchyModel', {
    extend: 'Ext.data.Model',
	fields: [
         {name: 'mgmtGrp', type: 'string'},
         {name: 'mgmtGrpDescription', type: 'string'},
         {name: 'channelName', type: 'string'},
         {name: 'channelDescription', type: 'string'},
         {name: 'region', type: 'string'},
         {name: 'regionDescription', type: 'string'}
     ]
});
