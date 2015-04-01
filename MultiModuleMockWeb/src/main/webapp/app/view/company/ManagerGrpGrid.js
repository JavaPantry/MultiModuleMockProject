
var sm = Ext.create('Ext.selection.CheckboxModel');
Ext.define('Fast.view.company.ManagerGrpGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.ManagerGrpGrid',
    selModel: sm,
    columnLines: true,
    id:'ManagerGrpGrid',
    iconCls: 'icon-grid',

    //title : 'Company Manager Group',
    store: 'company.ManagerGrp',
////fields: ['id', 'company', 'division','mgmtGrp', 'managerGrp', 'status']
    columns: [{
    	header: "Company",
		width: 200,
		flex:1,
		dataIndex: 'company'
	},{
		header: "Division",
		width: 200,
		flex:1,
		dataIndex: 'division'
	},{
		header: "Management Group",
		width: 200,
		flex:1,
		dataIndex: 'mgmtGrp'
	},{
		header: "Manager Group",
		 width: 200,
		flex:1,
		dataIndex: 'managerGroup'
	},{
		header: "Status",
		width: 200,
		flex:1,
		dataIndex: 'status'
	}],
	
	initComponent: function() {
		
		this.dockedItems = [{
            xtype: 'toolbar',
            dock:'top',
            items: [{
                iconCls: 'icon-add',
                itemId: 'add',
                text: 'Add',
                action: 'add'
            },{
                iconCls: 'icon-delete',
                text: 'Delete',
                action: 'delete'
            },{
                minWidth: 80,
                text: 'Back',
                iconCls: 'icon-return',
                action: 'goToHierarhy'
                //handler : function() {goToDiv("heirarchyContainer");}
            }]
        },/*{  
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            layout: {
                pack: 'left'
            },
            items: [{
                minWidth: 80,
                text: 'Back',
                iconCls: 'icon-return',
                handler : function() {
               	 
               	 goToDiv("heirarchyContainer");
               	
					}
            }]
        },*/
        {
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'company.ManagerGrp',
            displayInfo: true,
            displayMsg: 'Displaying ManagerGrp {0} - {1} of {2}',
            emptyMsg: "No ManagerGrp to display"
        }];
		
		this.callParent(arguments);
	}
});
