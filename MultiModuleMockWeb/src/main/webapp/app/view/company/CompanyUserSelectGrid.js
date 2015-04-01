var filters = {
        ftype: 'filters',
        encode: false,// encode and local configuration options defined previously for easier reuse 
        local: true, // defaults to false (remote filtering)
        // Filters are most naturally placed in the column definition, but can also be added here.
        filters: [{type: 'boolean', dataIndex: 'visible'}]
	};

Ext.define('Fast.view.company.CompanyUserSelectGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.CompanyUserSelectGrid',
    columnLines: true,
    features: [filters],
 // rely on xtype tab.down(xtype) id: 'CompanyUserSelectGrid',
    //title : 'Company User Select',
    //iconCls: 'icon-grid',
    store: 'company.UserSelect',
    columns: [{header: "User ID",width: 170,flex:1,dataIndex: 'userCode',filterable: true}
			,{header: "User Name",width: 170,flex:1,dataIndex: 'userName',filterable: true}
			,{header: "Status",width: 160,flex:1,dataIndex: 'status'}],
	
initComponent: function() {
		this.dockedItems = [
			{
            xtype: 'toolbar',
            dock:'top',
            items: [{text: 'New User',iconCls: 'icon-user-add',itemId: 'companyUserSelectAdd',action: 'editUserDetailAdd'}
					,{text: 'Edit User',iconCls: 'icon-modify',itemId: 'companyUserSelectEdit',minWidth: 80,action: 'editUserDetail'}]
			},{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'company.UserSelect',
            displayInfo: true,
            displayMsg: 'Displaying UserSelect {0} - {1} of {2}',
            emptyMsg: "No UserSelect to display"
        }];
		this.callParent(arguments);
	}
});


