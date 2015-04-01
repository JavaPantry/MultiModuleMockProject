Ext.define('Fast.view.company.CompanyAccessLevelsView' ,{
    extend: 'Ext.Panel',
    alias : 'widget.CompanyAccessLevelsView',
    iconCls: 'icon-grid',
    columnLines: true,
    layout:'card',
    requires: ['Fast.view.company.CompanyAccessLevelsGrid'
               ,'Fast.view.company.CompanyUserGroupAccessRightsDetails'],

    items:[	{xtype:'CompanyAccessLevelsGrid'}
    		//,{xtype:'CompanyAccessOptionsTree'}
    		,{xtype:'CompanyUserGroupAccessRightsDetails'}
    		]
});
