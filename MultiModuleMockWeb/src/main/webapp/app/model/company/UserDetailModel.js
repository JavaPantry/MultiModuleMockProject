Ext.define('Fast.model.company.UserDetailModel', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'id'},
            {name: 'userCode',   type: 'string'},        
            {name: 'userName', type: 'string'},
            {name: 'userCodeDis',   mapping:"userCode"},        
            {name: 'userNameDis', mapping:"userName"},
            {name: 'userNameCombo', mapping:"userCode"},
            //{name: 'division', type: 'string'},
            {name: 'accessLevel', type: 'string', mapping:"userGroup.groupName"},
            {name: 'status',  type: 'string'},
            {name: 'prodApprover',   type: 'boolean',mapping:'isPrdApprover'},
            {name: 'fcastApprover',   type: 'boolean', mapping:'isFctApprover'},
            {name: 'salesPerson',   type: 'boolean', mapping:'isSalesRep'},
            {name: 'accountApprover',     type: 'boolean', mapping:'isAPApprover'},
            {name: 'salesManager',   type: 'boolean',mapping:'isSalesManager'},
            {name: 'prdBypass',   type: 'boolean', mapping:'isPrdBypass'},
            {name: 'apBypass',     type: 'boolean', mapping:"isAPBypass"},
            {name: 'fctBypass',   type: 'boolean',mapping:'isFctBypass'},           
            {name: 'prdEmailExempt',   type: 'boolean', mapping:'isPrdEmailExempt'},
            {name: 'apEmailExempt',     type: 'boolean', mapping:'isAPEmailExempt'},
            {name: 'fctEmailExempt',   type: 'boolean',mapping:'isFctEmailExempt'},           
            {name: 'userGrpId'}
        ]
 });
