Ext.define('Fast.view.company.YearForecastGrid' ,{
    extend:'Ext.grid.Panel',
 // rely on xtype tab.down(xtype) id : 'YearForecastGrid',
    alias :'widget.YearForecastGrid',
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    columnLines: true,
    requires:['Ext.toolbar.Toolbar','Ext.toolbar.Paging','Fast.store.company.YearForecast'],
    store: 'company.YearForecast',

    features: [{
				ftype: 'filters', encode: 'encode',
				filters: [
				          //{type: 'string',dataIndex:'ProductId'},
				          //{type: 'string',dataIndex:'DealerId'}
						 ]
				}],

    columns: [	
       	     {header: 'Id', dataIndex:'id',hidden:true},
    	     {header: 'Year',flex:8,dataIndex:'year'},
    	     {header: 'First Half', xtype:'checkcolumn', flex:1,dataIndex:'firstHalf'
    	    	 ,listeners: {
    	    		 beforecheckchange:function( that, rowIndex, checked, eOpts ){
    	    			 return false;
    	    		 }
    	    	 }},
    	     {header: 'Second Half', xtype:'checkcolumn', flex:1,dataIndex:'secondHalf'
    	    	 ,listeners: {
    	    		 beforecheckchange:function( that, rowIndex, checked, eOpts ){
    	    			 return false;
    	    		 }
    	    	 }}
			],
	
	initComponent: function() {
		
		this.dockedItems = [
		 {xtype: 'toolbar',
            dock:'top',
            items: [
	            {text: 'Add Year Forecast', itemId:'yearForecastAdd', iconCls: 'icon-add', action:'newYearForecast'},
	            {text: 'Delete Year Forecast', itemId:'yearForecastDelete',  iconCls: 'icon-delete', action:'deleteYearForecast'},
            ]
        },
        {
            xtype: 'pagingtoolbar', dock:'bottom',
            store: 'company.YearForecast',
            displayInfo: true,
            displayMsg: 'Displaying Year Forecast{0} - {1} of {2}',
            emptyMsg: "No Year Forecast to display"
        }];
		this.callParent(arguments);
	}
});


