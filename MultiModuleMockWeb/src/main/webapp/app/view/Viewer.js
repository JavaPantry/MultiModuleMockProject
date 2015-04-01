Ext.define('Fast.view.Viewer', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.rootViewer',
    title: 'FaST', activeItem: 0, margins: '1 1 1 1', cls: 'preview',
    iconCls: 'icon-chart',
    requires: [
    	'Fast.view.products.View'
        ,'Fast.view.dealers.View'
        ,'Fast.view.sales.View'
        ,'Fast.view.company.View'
        ,'Ext.direct.*'
	]

    ,initComponent: function() {
        this.items = [	
        	/*{iconCls: 'tabs', xtype: 'productsView',	title: 'Products'//,  disabled:isProductAccessible
        		,listeners: {
             		activate: function(tab){
             			tab.setActiveTab(0);
             			var theGrid = tab.down('ProductSetupGrid');
             			theGrid.filters.clearFilters();
            	 		var theStore = theGrid.store;
            	 		if (theStore.isFiltered())
    						theStore.clearFilter();
            	 		theStore.load();
            	 		var rootViewer = this.up('rootViewer');
						rootViewer.setTitle("Fast: SetUp Products");
						//this.up('rootViewer').refreshACL();
             		}
				}
			}
			*/{iconCls: 'tabs', xtype: 'dealersView',title: 'Dealers'//, disabled:isDealerAccessible
				,listeners: {
             		activate: function(tab){
             			tab.setActiveTab(0);
             			var theGrid = tab.down('DealerSetupGrid');
             			theGrid.filters.clearFilters();
            	 		var theStore = theGrid.store;
            	 		if (theStore.isFiltered())
    						theStore.clearFilter();
            	 		theStore.load();
            	 		var rootViewer = this.up('rootViewer');
						rootViewer.setTitle("Fast: SetUp Dealer");
						//this.up('rootViewer').refreshACL();
             		}
				}
			}
			/*,{iconCls: 'tabs', xtype: 'salesView',title: 'Sales'//, disabled:isSaleAccessible
				,listeners: {
             		activate: function(tab){
             			tab.setActiveTab(0);             			
             			var theGrid = tab.down('SalesProductByAccountGrid');
             			theGrid.filters.clearFilters();
            	 		var theStore = theGrid.store;
            	 		if (theStore.isFiltered())
    						theStore.clearFilter();
            	 		theStore.load();
            	 		var rootViewer = this.up('rootViewer');
						rootViewer.setTitle("Fast: Sales -> Product By Account");
						//this.up('rootViewer').refreshACL();
             		}
				}
			}*/
			,{iconCls: 'tabs', xtype: 'companyView',title: 'Company'//, disabled:isCompanyAccessible
				,listeners: {
             		activate: function(tab){
             			tab.setActiveTab(0);             			
             			//var theGrid = tab.down('CompanyHierarchyGrid');
             			var theGrid = tab.down('CompanyUserSelectGrid');
             			// there no filters theGrid.filters.clearFilters();
            	 		var theStore = theGrid.store;
            	 		if (theStore.isFiltered())
    						theStore.clearFilter();
            	 		theStore.load();
            	 		var rootViewer = this.up('rootViewer');
						rootViewer.setTitle("Fast: Company Hierarchy");
						//this.up('rootViewer').refreshACL();
             		}
				}
			}
			];
        this.callParent(arguments);
    }
/*
 * see same call from app/controller/company/AccessLevelsController:companyAccessLevelSave(button){...}
 */
,refreshACL: function(){
		var theRootViewer = this;//theGrid.up('rootViewer');
		Ext.Ajax.request({//chain request for group access rights
	   	        method: 'POST',
	   	        url: 'json/companyAccessDetailsAction?m=readGroupAccessRights',
	   	        //jsonData: json,//requestData,
	   	        timeout:120000,
	   	        success: function (response,request){
	   	        	//console.log('AccessLevelsController:ChainRequest:POST callback: response.responseText = '+response.responseText);
		   	 		//this trick to retrieve rootViewer through ANY grid
		   	 		
		   	 		//console.log('AccessLevelsController:POST callback: theRootViewer = '+theRootViewer);
		   	 		var groupAccessList = Ext.JSON.decode(response.responseText,false);
		   	 		theRootViewer.updateTabs(groupAccessList);
	   	        },
	   	        failure: function (response,request){
					Ext.MessageBox.show({
	                    title: 'AJAX FAILURE:',
	                    msg: 'Chain request for group access rights FAILED '+response.responseText,
	                    icon: Ext.MessageBox.ERROR,
	                    buttons: Ext.Msg.OK
	                });
	   	        } 
	   	    });
}
	/*
	 * javascript object decoded from json response to: json/companyAccessDetailsAction?m=readGroupAccessRights
	 * search by xtype  this.down('#xtypeName');
	 */
,updateTabs: function(groupAccessList){
	//console.log('Viewer:updateTabs'+groupAccessList);
	if(groupAccessList == null || groupAccessList == 'undefined')
		return;
	if(!(Object.prototype.toString.call(groupAccessList) === '[object Array]'))//|| groupAccessList.length  == 'undefined'
		return;
	//console.log('Viewer:updateTabs groupAccessList is Array and not empty size = '+groupAccessList.length);
	
	//disable all 1st level tabs - this.items.items - 
	for (var itemIdx = 0; itemIdx<this.items.items.length; itemIdx++){
		this.items.items[itemIdx].setDisabled(true);
	}
	
	//disable all 2nd level tabs and enable all buttons (later they will be deactivated if inquiry mode granted) 
	for (var i = 0; i<groupAccessList.length;i++){
		var option =groupAccessList[i];
		var firstLevelTab = this.down(option.sectionView);
		var secondLevelTab = this.down(option.subSectionView);
		if(secondLevelTab != null)
			secondLevelTab.setDisabled(true);
		var disableButtons = option.disableButtons;
		if(disableButtons == null || disableButtons.length == 0)
			continue;
		
		for(var j = 0; j<disableButtons.length; j++){
			var btnName =disableButtons[j];
			if(btnName.indexOf('dblClickDisabled') == -1){
				var btn = this.down(btnName);
				btn.setDisabled(false);
			}else{
				var gridNames = btnName.split('.');
				var grid = this.down(gridNames[0]); 
				grid.inquiryMode = false;
			}
		}
	}//eo for all groupAccessList
	
	for (var i = 0; i<groupAccessList.length;i++){
		var option =groupAccessList[i];
		if(option.granted == true){
			var firstLevelTab = this.down(option.sectionView);
			firstLevelTab.setDisabled(false);
			var secondLevelTab = this.down(option.subSectionView);
			if(secondLevelTab != null)
				secondLevelTab.setDisabled(false);

			var disableButtons = option.disableButtons;
			if(disableButtons == null || disableButtons.length == 0)
				continue;
			
			for(var j = 0; j<disableButtons.length; j++){
				var btnName =disableButtons[j];
				if(btnName.indexOf('dblClickDisabled') == -1){
					var btn = this.down(btnName);
					btn.setDisabled(true);
				}else{
					var gridNames = btnName.split('.');
					var grid = this.down(gridNames[0]); 
					grid.inquiryMode = true;
				}
				//var btn = this.down(btnName);
				//btn.setDisabled(true);
			}
		}
	}//eo for all group access options
}
});

