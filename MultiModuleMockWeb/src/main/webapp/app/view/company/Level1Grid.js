Ext.define('Fast.view.company.Level1Grid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.Level1Grid',
    id:'Level1Grid',
    
    iconCls: 'icon-grid',
    columnLines: true,
    //title : 'Company Hierarchy Level1',
    store: 'company.Level1',

    columns: [
     /*{header: "",width: 30, sortable: false,dataIndex: "RadoButton",renderer:function(val, cell, record, rowIndex, colIndex, store){
		 var retval = '<input type="radio" style="border:0" name="myRadioButton" >';
		 return retval;
		 }
	},*/{
    	header: "Division",
		width: 170,
		flex:1,
		dataIndex: 'division'
	},{
		header: "Management Group",
		width: 160,
		flex:1,
		dataIndex: 'mgmtGrp'
	},{
		header: "Description",
		width: 160,
		flex:1,
		dataIndex: 'mgmtGrpDescription'
	},{
		header: "Channel Name",
		width: 170,
		flex:1,
		dataIndex: 'channelName'
	},{
		header: "Description",
		width: 170,
		flex:1,
		dataIndex: 'channelDescription'
	},{
		header: "Status",
		width: 170,
		flex:1,
		dataIndex: 'status'
	}],
	
	initComponent: function() {
		
		this.dockedItems = [/*{
            xtype: 'toolbar',
            dock:'top',
            items: [{
                iconCls: 'icon-save',
                itemId: 'add',
                text: 'Add',
                action: 'add'
            },{
                iconCls: 'icon-delete',
                text: 'Delete',
                action: 'delete'
            }]
        },*/{
            xtype: 'toolbar',
            dock: 'top',
            //ui: 'footer',
            layout: {
                pack: 'left'
            },
            items: [{
                minWidth: 80,
                text: 'Level 2',
                iconCls: 'icon-check',
                action: 'goToLevelTwo'
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
            store: 'company.Level1',
            displayInfo: true,
            displayMsg: 'Displaying Level1 {0} - {1} of {2}',
            emptyMsg: "No Level1 to display"
        }];
		
		this.callParent(arguments);
	}
});
