Ext.define('Fast.view.dealers.DealerQuotaGrid', {
	extend: 'Ext.grid.Panel'
    ,alias: 'widget.DealerQuotaGrid'
    //,html:'Dealers Quota View content'
    ,columnLines: true
    ,store: 'dealers.DealerQuota'
    ,features: [{
            ftype: 'filters',encode: 'encode',
            filters: [{type: 'string', dataIndex: 'dealerCode'},
                      {type: 'string',dataIndex: 'dealerName'}]
        	}],

        columns: [{text     : 'Id',hidden   : true,flex     : 1,sortable : true,dataIndex: 'id'}
                  ,{text     : 'Dealer Id',hidden   : true,flex     : 1,sortable : true,dataIndex: 'dealerId'}
                  ,{text     : 'Customer Code',flex     : 1,sortable : true,dataIndex: 'dealerCode'}
                  ,{text     : 'Customer Type',flex     : 1,sortable : true,dataIndex: 'dealerType'
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
                  }
                  ,{text     : 'Customer Name',flex     : 1,sortable : true,dataIndex: 'dealerName'}
                  ,{text     : 'Year',flex     : 1,sortable : true,dataIndex: 'year'}
                 ]
    	
    	,initComponent: function() {
    		Ext.apply(this, {
    		dockedItems : [{  xtype: 'pagingtoolbar',
                dock:'bottom',
                store: 'dealers.DealerQuota',
                displayInfo: true,
                displayMsg: 'Displaying Dealers {0} - {1} of {2}',
                emptyMsg: "No Dealer to display"
    		}]
    		});
    		this.callParent(arguments);
    	}    	
   });