/*var filters = {
        ftype: 'filters',
        encode: false,// encode and local configuration options defined previously for easier reuse 
        local: true, // defaults to false (remote filtering)
        // Filters are most naturally placed in the column definition, but can also be added here.
        filters: [{type: 'boolean', dataIndex: 'visible'}]
	};
*/
Ext.define('Fast.view.company.ListUsersInGroupGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.ListUsersInGroupGrid',
    columnLines: true,
    //features: [filters],
    id: 'ListUsersInGroupGrid',
    store: 'company.UserSelect',
    columns: [{header: "User ID",width: 170,flex:1,dataIndex: 'userCode',filterable: true}
			,{header: "User Name",width: 170,flex:1,dataIndex: 'userName',filterable: true}],
	
initComponent: function() {
		this.callParent(arguments);
	}
});


