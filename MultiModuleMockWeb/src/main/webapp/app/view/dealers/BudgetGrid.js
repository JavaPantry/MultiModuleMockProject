Ext.define('Fast.view.dealers.BudgetGrid', {
	extend: 'Ext.grid.Panel'
    ,alias: 'widget.BudgetGrid'
    //,html:'Dealers Quota View content'
    ,columnLines: true
    ,store: 'dealers.Budget'
    /*,features: [{
            ftype: 'filters',encode: 'encode',
            filters: [{type: 'string', dataIndex: 'dealerCode'},
                      {type: 'string',dataIndex: 'dealerName'}]
        	}]*/

        ,columns: [{text     : 'Id',hidden   : true,flex     : 1,sortable : true,dataIndex: 'id'}
                  ,{text     : 'Year',flex     : 1,sortable : true,dataIndex: 'year'}
                 ]

    	,initComponent: function() {
    		Ext.apply(this, {
    		dockedItems : [{  xtype: 'pagingtoolbar',
                dock:'bottom',
                store: 'dealers.Budget',
                displayInfo: true,
                displayMsg: 'Displaying Dealers {0} - {1} of {2}',
                emptyMsg: "No Dealer to display"
    		}]
    		});
    		this.callParent(arguments);
    	}
   });