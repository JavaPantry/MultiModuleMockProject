Ext.define('Fast.view.company.DealerGroupGrid' ,{
    extend:'Ext.grid.Panel',
    alias :'widget.DealerGroupGrid',
    //selModel: Ext.create('Ext.selection.CheckboxModel'),
    columnLines: true,
    requires:['Ext.toolbar.Toolbar','Ext.toolbar.Paging'],
    store: 'company.DealerGroup',

    features: [{
				ftype: 'filters', encode: 'encode',
				filters: [
				          {type: 'string',dataIndex:'groupCode'},
				          {type: 'string',dataIndex:'groupDescription'}
						 ]
				}],

    columns: [	
     	     {header: 'Id', dataIndex:'id',hidden:true},
    	     {header: 'Group Code',			flex:1,dataIndex:'groupCode'},
    	     {header: 'Group Description',	flex:1,dataIndex:'groupDescription'}
			 ],
	
	initComponent: function() {
		
		this.dockedItems = [
		 {xtype: 'toolbar',
            dock:'top',
            items: [
	            {text: 'Create', itemId:'dealerGroupAdd', iconCls: 'icon-add', action:'dealerGroupCreate'},
	            {text: 'Edit Group details', itemId:'dealerGroupEditDetails',  iconCls: 'icon-modify', action:'dealerGroupEditDetails'},
	            {text: 'Delete', itemId:'dealerGroupDelete',  iconCls: 'icon-delete', action:'dealerGroupDelete'},
            ]
        },
        {
            xtype: 'pagingtoolbar', dock:'bottom',
            store: 'company.DealerGroup',
            displayInfo: true,
            displayMsg: 'Displaying Dealer Groups{0} - {1} of {2}',
            emptyMsg: "No Dealer Groups to display"
        }];
		this.callParent(arguments);
	}
});


