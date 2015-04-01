Ext.define('Fast.view.company.Level2Grid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.Level2Grid',
    id:'Level2Grid',
    
    iconCls: 'icon-grid',
    columnLines: true,
    //title : 'Company Hierarchy Level2',
    store: 'company.Level2',

    columns: [
     /*{header: "",width: 30, sortable: false,dataIndex: "RadoButton",renderer:function(val, cell, record, rowIndex, colIndex, store){
		 var retval = '<input type="radio" style="border:0" name="myRadioButton" >';
		 return retval;
		 }
	},*/{
    	header: "Company",
		width: 170,
		flex:1,
		dataIndex: 'company'
	},{
		header: "Division",
		width: 160,
		flex:1,
		dataIndex: 'division'
	},{
		header: "Management Group",
		width: 170,
		flex:1,
		dataIndex: 'mgmtGrp'
	},{
		header: "Description",
		width: 170,
		flex:1,
		dataIndex: 'mgmtGrpDescription'
	},{
		header: "Channel",
		width: 170,
		flex:1,
		dataIndex: 'channelName'
	},{
		header: "Description",
		width: 170,
		flex:1,
		dataIndex: 'channelDescription'
	},{
		header: "Region",
		width: 170,
		flex:1,
		dataIndex: 'region'
	},{
		header: "Description",
		width: 170,
		flex:1,
		dataIndex: 'regionDescription'
	},{
		header: "Status",
		width: 170,
		flex:1,
		dataIndex: 'status'
	}],
	
	initComponent: function() {
		
		this.dockedItems = [
		    {  
            xtype: 'toolbar',
            dock: 'top',
            //ui: 'footer',
            layout: {
                pack: 'left'
            },
            items: [{
                minWidth: 80,
                text: 'Level 1',
                iconCls: 'icon-check',
                action: 'goToLevelOne'
            },{
                minWidth: 80,
                text: 'Back',
                iconCls: 'icon-return',
                action: 'goToHierarhy'
            }]
        },
        {
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'company.Level2',
            displayInfo: true,
            displayMsg: 'Displaying Level2 {0} - {1} of {2}',
            emptyMsg: "No Level2 to display"
        }];
		
		this.callParent(arguments);
	}
});
