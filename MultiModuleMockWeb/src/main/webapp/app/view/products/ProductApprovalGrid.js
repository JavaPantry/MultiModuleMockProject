var sm = Ext.create('Ext.selection.CheckboxModel');

Ext.define('Fast.view.products.ProductApprovalGrid' ,{
    extend: 'Ext.grid.Panel',
    id : 'ProductApprovalGrid',
    alias : 'widget.ProductApprovalGrid',
    selModel: sm,
    requires:['Ext.toolbar.Toolbar','Ext.toolbar.Paging'],
    columnLines: true,
    store: 'products.ProductApproval',//localStore,
    features: [{
        ftype: 'filters',
        encode: 'encode', // json encode the filter query
        filters: [{	type: 'string', dataIndex: 'categoryName'},
        		{ type: 'string', dataIndex: 'itemName'}]
    			 }],
    
    columns: [ {text: 'Product Id',hidden: true,flex: 1,sortable: true,dataIndex: 'id'}, 
               {text: 'Management Groups',flex:1,sortable: true,dataIndex: 'mgmtGrp'},
               {text: 'Category',hidden: true,flex: 1,sortable: true,dataIndex: 'itemCategory'},
               {text: 'Category',flex: 1,sortable: true,dataIndex: 'categoryName'},
               {text: 'Code Number',flex: 1,sortable: true,dataIndex: 'codeNumber',filterable: true},
               {text: 'Item Code',flex: 1,sortable: true,dataIndex: 'itemCode',filterable: true},
               {text: 'Item Name',flex: 1,sortable: true,dataIndex: 'itemName',filterable: true},
               {text: 'Item Setup Status',flex: 1,sortable: true,dataIndex: 'status',filterable: true},
               {text: 'Approved Level',flex: 1,sortable: true,dataIndex: 'approvedLevel'}],
	
	initComponent: function() {
		
		this.dockedItems = [{
            xtype: 'toolbar',
            dock:'top',
            anchor: '30',
            items: [{iconCls: 'icon-next',itemId: 'productApproval',text: 'Approve',action: 'productApproval'},
                    {iconCls: 'icon-return',itemId: 'productReWork',text: 'ReWork',action: 'productReWork'}]
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'products.ProductApproval',//localStore, 
            displayInfo: true,
            displayMsg: 'Displaying Product Approvals {0} - {1} of {2}',
            emptyMsg: "No Product Approval to display"
        },{
            xtype: 'textfield',
            id: 'productApprovalGridCommentsId',
            dock:'bottom',            
            combineErrors: true,
            msgTarget: 'side',
            name : 'comments',
            fieldLabel: 'Comments'
        },{
            xtype: 'displayfield', dock:'bottom', value: ''
		}];
		
		this.callParent(arguments);
	}
});
