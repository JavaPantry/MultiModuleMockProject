
var user="T654321";
var userName="Tod 01";
var title="Company Sales Manager    "+"User:"+user+"  Name:"+userName;
   
Ext.define('Fast.view.company.CompanySalesManagerGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.CompanySalesManagerGrid',
    id:     'CompanySalesManagerGrid',
    columnLines: true,
    //iconCls: 'icon-grid',
    //title : [title],
    store: 'company.SalesManager',
    
    columns: [
		    {header: "userId",width: 170,flex:1,dataIndex: 'userId',hidden: true}
		    ,{header: "Company",width: 170,flex:1,dataIndex: 'company'}
		    ,{header: "Division",width: 160,flex:1,dataIndex: 'division'}
		    ,{header: "Management Group",width: 170,flex:1,dataIndex: 'mgmtGrp'}
		    ,{header: "Manager Group",width: 160,flex:1,dataIndex: 'managerGrpName'}
		    //,{header: "Manager",width: 170,flex:1,dataIndex: 'userName'},
		    ,{header: "Manager",width: 170,flex:1,dataIndex: 'manager'}],
	
	initComponent: function() {
		
		this.dockedItems = [{
            xtype: 'toolbar',
            dock:'top',
            items: [{
                iconCls: 'icon-add',
                itemId: 'add',
                text: 'Add',
                action: 'addSalesManager'
            },{
                iconCls: 'icon-delete',
                text: 'Delete',
                action: 'deleteSalesManager'
            },{
                minWidth: 80,
                text: 'Cancel',
                iconCls: 'icon-cancel',
                action:'cancelEditUserDetail'
            },{
                minWidth: 80,
                text: 'Back',
                iconCls: 'icon-return',
                action:'backToUserDetailForm' 
            }]
        }/*,
        {
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'company.SalesManager',
            displayInfo: true,
            displayMsg: 'Displaying SalesManager {0} - {1} of {2}',
            emptyMsg: "No SalesManager to display"
        }*/];
		
		this.callParent(arguments);
	}
});
