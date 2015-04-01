Ext.define('Fast.view.company.CompanyAccessLevelsGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.CompanyAccessLevelsGrid',
    // rely on xtype tab.down(xtype) id:'CompanyAccessLevelsGrid',
    //iconCls: 'icon-grid',
    columnLines: true,
    //title : 'Company Access Levels',
    store: 'company.AccessLevels',
    ////fields: ['id', 'groupName', 'groupDesc']
    columns: [	{header: "Access Level",width: 170,flex:1,dataIndex: 'groupName'}
				,{header: "Access Level Description",width: 160,flex:1,dataIndex: 'groupDesc'}
			],
	
	initComponent: function() {
		
		this.dockedItems = [{
            xtype: 'toolbar',
            dock:'top',
            items: [{iconCls: 'icon-add',itemId: 'companyAccessLevelAdd',text: 'Add',action: 'companyAccessLevelAdd'}
					,{iconCls: 'icon-delete',itemId: 'companyAccessLevelDelete',text: 'Delete',action: 'companyAccessLevelDelete'}
					,{iconCls: 'icon-modify',itemId: 'companyAccessLevelEdit',text: 'Edit Access Rights',action: 'companyAccessLevelEdit'}
					,{text: 'List Users in group',iconCls: 'icon-user',minWidth: 80,action: 'companyAccessLevelListUsersInGroup'}
					]
        },/*{
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            layout: {
                pack: 'left'
            },
            items: [{
                minWidth: 80,
                text: 'Edit',
                iconCls: 'icon-modify',
                handler : function() {
                var myForm=Ext.getCmp("accessDetail");
                         
                
                myForm.getForm().load({
                    url: 'json/companyAccessDetailsAction?m=read'
                    //waitMsg: 'Loading...'
                });
                
                var myGrid=Ext.getCmp("AccessLevelsGrid");
                goToAccessDetails(myGrid,myForm);
               
               //	 goToDiv("companyAccessDetailsContainer");
               	
					}
            }]
        },*/
        {
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'company.AccessLevels',
            displayInfo: true,
            displayMsg: 'Displaying AccessLevels {0} - {1} of {2}',
            emptyMsg: "No AccessLevels to display"
        }];
		
		this.callParent(arguments);
	}
});
function goToAccessDetails(grid,myForm) {

	var url='json/companyAccessDetailsAction?m=read';

	//grid = this.getUserSelectGrid();

	var selectedRecord = grid.getSelectionModel().getSelection();

	//url="jsonForm/MyFormRead.jsp";

	if (selectedRecord==null||selectedRecord=='' ){

	alert("Please select a record for edit !");
	

	}

	else

	{
    groupId= selectedRecord[0].get('id');
	groupName= selectedRecord[0].get('groupName');

	groupDesc= selectedRecord[0].get('groupDesc');
	
	sendPramsToServer(url,groupId, groupName,groupDesc);

	waitMsg: 'Load Data...';

	//load deatais form
	
	setTimeout("",500);
	myForm.getForm().load({

	url: url

	//waitMsg: 'Loading...'

	});

	goToDiv("companyAccessDetailsContainer");
	 myForm.render("companyAccessDetailsContainer");

	}
	};
	
	function sendPramsToServer(url,value1, value2,value3){
		Ext.Ajax.request({
	        url : url,
	                 method: 'POST',
	                 params :{pram1:value1, pram2:value2,pram3:value3}               
	      });
	};
