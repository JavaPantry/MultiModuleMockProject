Ext.define('Fast.view.company.DealerGroupDetailGrid' ,{
    extend:'Ext.grid.Panel',
    alias :'widget.DealerGroupDetailGrid',
    //selModel: Ext.create('Ext.selection.CheckboxModel'),
    columnLines: true,
    requires:['Ext.toolbar.Toolbar','Ext.toolbar.Paging'],
    store: 'company.DealerGroupDetail',

    features: [{
				ftype: 'filters', encode: 'encode',
				filters: [
				          {type: 'string',dataIndex:'groupCode'},
				          {type: 'string',dataIndex:'groupDescription'}
						 ]
				}],

    columns: [	
     	      {header: 'Id', dataIndex:'id',hidden:true}
    	     ,{header: 'Dealer Code', flex:1,dataIndex:'dealerCode'}
    	     ,{header: 'Dealer Name', flex:1,dataIndex:'dealerName'}
    	     ,{header: 'Dealer Type', flex:1,dataIndex:'dealerType'
    	    	 ,renderer: function(value){
         	        if (value === 'B') {
         	            return 'Bill To';
         	        }else if (value === 'S') {
         	            return 'Sell To';
         	        }
         	        return '';
         	    }}
    	     ,{header: 'Include/Exlude', flex:1,dataIndex:'isInclude' ,renderer: function(value){
      	        if (value === true) {
     	            return 'Include';
     	        }else if (value === false) {
     	            return 'Exclude';
     	        }
     	        return '';
     	    }}
			 ],
	
	initComponent: function() {
		
		this.dockedItems = [
		 {xtype: 'toolbar',
            dock:'top',
            items: [
	            {text: 'Create', itemId:'dealerGroupDetailsAdd', iconCls: 'icon-add', action:'dealerGroupDetailsAdd'}
	            ,{text: 'Delete', itemId:'dealerGroupDetailsDelete',  iconCls: 'icon-delete', action:'dealerGroupDetailsDelete'}
	            ,'->'
	            ,{text: 'Cancel', itemId:'dealerGroupCancel',  iconCls: 'icon-cancel', action:'dealerGroupDetailsCancel'}
	            
            ]
        },
        {
            xtype: 'pagingtoolbar', dock:'bottom',
            store: 'company.DealerGroupDetail',
            displayInfo: true,
            displayMsg: 'Displaying Dealer Group Details{0} - {1} of {2}',
            emptyMsg: "No Dealer Group Details to display"
        }];
		this.callParent(arguments);
	}
});


