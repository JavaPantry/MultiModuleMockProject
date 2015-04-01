//AP var sm = Ext.create('Ext.selection.CheckboxModel');
Ext.define('Fast.view.sales.SalesApprovalGrid',{
	    extend: 'Ext.grid.Panel',
	    id:'SalesApprovalGrid',
	    alias : 'widget.SalesApprovalGrid',
	    selModel: Ext.create('Ext.selection.CheckboxModel'),//sm,
		columnLines: true,
	    store: 'sales.AccountApproval',//localStore,//

	    features: [{ftype: 'filters',
		    		encode: 'encode', // json encode the filter query
		    		filters: [{	type: 'string',dataIndex:'customerCode'},
		    		          { type: 'string',dataIndex:'customerName'}]}],

	    columns: [{text:'Sequence Number',hidden: true,flex:1,sortable:true,dataIndex:'sequenceNumber'},
			{text:'Product by Account Id',hidden:true,flex:1,sortable:true,dataIndex:'id'},
			{text:'Dealer Id',hidden:true,flex:1,sortable:true,dataIndex:'dealerId'},
			{text:'Deleted Flag',hidden:true,flex:1,sortable:true,dataIndex:'deleted'},
			{text:'Customer',flex:1,sortable:true,dataIndex:'customerCode'},
			{text:'Customer Name',flex:1,sortable:true,dataIndex:'customerName'},
			{text:'Approved Level',flex:1,sortable:true,dataIndex:'approvedLevel'},
			{text:'Sales Person Id',hidden:true,flex:1,sortable:true,dataIndex:'salesPersonId'},
			{text:'Sales Person',flex:1,sortable:true,dataIndex:'salesPerson',filterable:true},
			{text:'SubmittedBy Id',hidden:true,flex:1,sortable:true,dataIndex:'submittedById'},
			{text:'SubmittedBy',flex:1,sortable:true,dataIndex:'submittedBy'},
			{text:'CCI Category',hidden:true,flex:1,sortable:true,dataIndex:'category'},
			{text:'Mgmt Group',flex:1,sortable:true,dataIndex:'managementGroup'},
			{text:'Proudct Id',hidden:true,flex:1,sortable:true,dataIndex:'productId'},
			{text:'Category',flex:1,sortable:true,dataIndex:'categoryName'},
			{text:'Code Number',flex:1,sortable:true,dataIndex:'codeNumber',filterable:true},
			{text:'Item Code',flex:1,sortable:true,dataIndex:'itemCode',filterable:true},
			{text:'Item Name',flex:1,sortable:true,dataIndex:'itemName',filterable:true},
			{text:'Std M%',flex:1,sortable:true,dataIndex:'defaultM'},
			{text:'Std M2%',flex:1,sortable:true,dataIndex:'defaultM2'},
			{text:'Adj M%',flex:1,sortable:true,dataIndex:'adjustedM',filterable:true},
			{text:'Adj M2%',flex:1,sortable:true,dataIndex:'adjustedM2',filterable:true},
			{text:'Adj Comments',flex:1,sortable:true,dataIndex:'adjustedComments'},
			{text:'Approval Comments',hidden:true,flex:1,sortable:true,dataIndex:'approvalComments'}
			],
		initComponent: function() {
			this.dockedItems = [
					{xtype: 'toolbar',dock:'top',anchor: '30',
				            items: [{iconCls: 'icon-next',itemId: 'accountApproval',text: 'Approve',action: 'accountApproval'},
				                    {iconCls: 'icon-return',itemId: 'accountReWork',text: 'ReWork',action: 'accountReWork'}
				            ]},
				    {xtype: 'pagingtoolbar',dock:'bottom',
				            store: 'sales.AccountApproval',//localStore,
				            displayInfo: true,
				            displayMsg: 'Displaying Sales Product by Account Approvals {0} - {1} of {2}',
				            emptyMsg: "No Sales Product by Account Approval to display"},
				    {xtype: 'textfield',dock:'bottom',id:'accountApprovalGridCommentsId',
				            combineErrors: true,
				            msgTarget: 'side',
				            name : 'approvalComments',
				            fieldLabel: 'Comments'},
				    {xtype: 'displayfield',dock:'bottom',value: ''}];
			this.callParent(arguments);
		}
	});