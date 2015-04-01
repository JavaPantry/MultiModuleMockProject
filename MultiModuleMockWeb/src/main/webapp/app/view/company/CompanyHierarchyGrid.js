Ext.define('Fast.view.company.CompanyHierarchyGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.CompanyHierarchyGrid',
 // rely on xtype tab.down(xtype) id:'CompanyHierarchyGrid',
    columnLines: true,
    //title : 'Company Hierarchy CIG Admin',
    //iconCls: 'icon-grid',
    store: 'company.Hierarchy',
   
    // //fields: ['id','company','division','mgmtGroup', 'CCImgmtGroup', 'SMSGrp', 'level1', 'level2','level13','level4','level5'] 
    columns: [
   /* {header: "",width: 30, sortable: false,dataIndex: "RadoButton",
    * renderer:function(val, cell, record, rowIndex, colIndex, store){
		 var retval = '<input type="radio" style="border:0" name="myRadioButton" >';
		 return retval;
	  }
	},*/
	{header: "Company", width: 170, flex:1, dataIndex: 'company'}
	,{header: "Division",width: 160,flex:1,dataIndex: 'division'}
	,{header: "Management Group",width: 170,flex:1,dataIndex: 'mgmtGrp'}
	,{header: "CCI Management Group",width: 170,flex:1,dataIndex: 'CCImgmtGrp',hidden: true}
	,{header: "SMS Group",width: 170,flex:1,dataIndex: 'SMSGrp',hidden: true}
	,{header: "Level1 Name",width: 170,flex:1,dataIndex: 'level1'}
	,{header: "Level2 Name",width: 170,flex:1,dataIndex: 'level2'}
	,{header: "Level3 Name",width: 170,flex:1,dataIndex: 'level3'}
	,{header: "Level4 Name",width: 170,flex:1,dataIndex: 'level4'}
	,{header: "Leve15 Name",width: 170,flex:1,dataIndex: 'level5'}],
	
	initComponent: function() {
		
		this.dockedItems = [{	xtype: 'toolbar',
					            dock:'top',
					            items: [{iconCls: 'icon-add',itemId: 'companyHierarchyAdd',text: 'Add',action: 'add'}
					            		,{iconCls: 'icon-delete',itemId: 'companyHierarchyDelete',text: 'Delete',action: 'delete'}
					            		,{minWidth: 80,itemId: 'companyHierarchyLevel1',text: 'Level 1',iconCls: 'icon-check',action:'goToLevelOne'}
					            		,{minWidth: 80,itemId: 'companyHierarchyManagers',text: 'Managers',iconCls: 'icon-user',action: 'goToCompanyManagerGroup'}
					            		]
					        }
							,{  xtype: 'pagingtoolbar',
					            dock:'bottom',
					            store: 'company.Hierarchy',
					            displayInfo: true,
					            displayMsg: 'Displaying Hierarchy {0} - {1} of {2}',
					            emptyMsg: "No Hierarchy to display"
					        }];
		this.callParent(arguments);
	}
});
