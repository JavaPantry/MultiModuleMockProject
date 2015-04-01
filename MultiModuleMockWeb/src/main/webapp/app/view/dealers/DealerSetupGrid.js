Ext.define('Fast.view.dealers.DealerSetupGrid' ,{
    extend: 'Ext.grid.Panel',
    requires:['Ext.toolbar.Toolbar','Ext.toolbar.Paging'],
    alias : 'widget.DealerSetupGrid',
	columnLines: true,
    store: 'dealers.Dealer',//localStore,//
    features: [{
        ftype: 'filters',
        encode: 'encode', // json encode the filter query
        filters: [{type: 'string', dataIndex: 'dealerCode'},
                  {type: 'string',dataIndex: 'dealerName'}]
    	}],

    columns: [{text     : 'Dealer Id',hidden   : true,flex     : 1,sortable : true,dataIndex: 'id'},
              {text     : 'Customer Code',flex     : 1,sortable : true,dataIndex: 'dealerCode'},
              {text     : 'Customer Type',flex     : 1,sortable : true,dataIndex: 'dealerType'
            	  ,renderer: function(value){
            	        if (value === 'B') {
            	            return 'Bill To';
            	        }else if (value === 'S') {
            	            return 'Sell To';
            	        }else if (value === 'G') {
            	            return 'Group';
            	        }
            	        return '';
            	    }
            	  },
              {text     : 'Customer Name',flex     : 1,sortable : true,dataIndex: 'dealerName'}],
	
	initComponent: function() {
		Ext.apply(this, {
		dockedItems : [{
            xtype: 'toolbar',
            dock:'top',
            items: [{iconCls: 'icon-create',itemId: 'dealerCreate',text: 'Create',action: 'create'}
					,{iconCls: 'icon-delete'/*,id: 'dealerGridDeleteButton'*/,itemId: 'dealerDelete',text: 'Delete',action: 'delete'}
					]
		}
		,{  xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'dealers.Dealer',//localStore,//
            displayInfo: true,
            displayMsg: 'Displaying Dealers {0} - {1} of {2}',
            emptyMsg: "No Dealer to display"
		}]
		});
		this.callParent(arguments);
	}

});
