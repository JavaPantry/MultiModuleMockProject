Ext.define('Fast.model.company.SalesManagerModel', {
    extend: 'Ext.data.Model',
    fields: [{name: 'id'}, 
             {name: 'company'}, 
             {name: 'division'}, 
             {name: 'managerGrpId', type:'number'},
             {name: 'mgmtGrp', mapping:'managerGrp.mgmtGrp'},
             {name: 'managerGrpName', mapping:'managerGrp.managerGroup'},
             {name: 'managerGroup'},
             {name: 'userId',type:'number'},
             {name: 'usmId',type:'number'},
             {name: 'userName',mapping:'userProfile.userName'},
             {name: 'manager'}
             ]
    
});