Ext.define('Fast.view.dealers.DealerQuotaDetailGrid', {
	extend: 'Ext.grid.Panel'
    ,alias: 'widget.DealerQuotaDetailGrid'
    //,html:'Dealers Quota View content'
    ,columnLines: true
    ,store: 'dealers.DealerQuotaDetail'
    ,features: [{
            ftype: 'filters',encode: 'encode',
            filters: [{type: 'string', dataIndex: 'salesManager'},
                      {type: 'string', dataIndex: 'salesPerson'},
                      {type: 'string',dataIndex: 'category'}]
        	}]

		/*see MonthEditGridExt.js*/
		,plugins: [
		           Ext.create('Ext.grid.plugin.CellEditing', {
		        	   	clicksToEdit: 1
		        	   	,pluginId : 'rowEditingQuotaDetailEditGridExt' // to find editor by grid.getPlugin('rowEditingMonthEditGridExt').editor.form.findField('name')
		           ,listeners : {//MonthEditGridExt.js
						'beforeedit' : function(editor, e, eOpts) {
							var record = e.record;
							var theGrid = e.grid;
							var dealerQuotaDetailView = theGrid.up('DealerQuotaDetailView');
							var yearField = dealerQuotaDetailView.down('#Year');
							var year1stHalfField = dealerQuotaDetailView.down('#Year1stHalf');
							var year2ndHalfField = dealerQuotaDetailView.down('#Year2ndHalf');
							
							var year1stHalf = (year1stHalfField.getValue() == 'true')?true:false;
							var year2ndHalf = (year2ndHalfField.getValue() == 'true')?true:false;

							var unitIndexes   =  e.field.match(/unit(\d+)/);
							var dollarIndexes =  e.field.match(/dollar(\d+)/);
							
							var clickedIdx = -1;
							if(unitIndexes != null)
								clickedIdx = unitIndexes[1];
							else if (dollarIndexes != null)
								clickedIdx = dollarIndexes[1];
							clickedIdx = eval(clickedIdx);
							
							if( year1stHalf == false && clickedIdx<7){
								return false;
							}
							if( year2ndHalf == false && clickedIdx>6){
								return false;
							}
						}
		           }//listeners
		           })]// plugins

        ,columns: [ {text     : 'Id',locked: true, hidden: true,dataIndex: 'id'}
                  ,{text     : 'Manager Group',locked: true, hidden: true,sortable: true,dataIndex: 'managerGrp'}
                  ,{text     : 'Category',width:50,locked: true, hidden: true,sortable: true,dataIndex: 'category'}
                  ,{text     : 'Sales Person',width:100,locked: true, hidden: true,sortable: true,dataIndex: 'salesPerson'}
                  ,{text     : 'Sales Manager',width:100,locked: true, hidden: true,sortable: true,dataIndex: 'salesManager'}
                  ,{text     : 'Manager Hierarchy',locked: true, hidden: true,sortable: true,dataIndex: 'managerHierarchy'}
                  ,{text     : 'Category',width:150,locked: true,sortable: true,dataIndex: 'categoryDescription'}
                  
                  ,{text     : 'Unit1',	flex:1,dataIndex: 'unit1',editor : {xtype : 'numberfield',minValue: 0}}
                  ,{text     : 'Dollar1',flex:1,dataIndex: 'dollar1',editor : {xtype : 'numberfield',minValue: 0}}
                  ,{text     : 'Unit2',flex:1,dataIndex: 'unit2',editor : {xtype : 'numberfield',minValue: 0}}
                  ,{text     : 'Dollar2',flex:1,dataIndex: 'dollar2',editor : {xtype : 'numberfield',minValue: 0}}
                  ,{text     : 'Unit3',flex:1,dataIndex: 'unit3',editor : {xtype : 'numberfield',minValue: 0}}
                  ,{text     : 'Dollar3',flex:1,dataIndex: 'dollar3',editor : {xtype : 'numberfield',minValue: 0}}
                  ,{text     : 'Unit4',flex:1,dataIndex: 'unit4',editor : {xtype : 'numberfield',minValue: 0}}
                  ,{text     : 'Dollar4',flex:1,dataIndex: 'dollar4',editor : {xtype : 'numberfield',minValue: 0}}
                  ,{text     : 'Unit5',flex:1,dataIndex: 'unit5',editor : {xtype : 'numberfield',minValue: 0}}
                  ,{text     : 'Dollar5',flex:1,dataIndex: 'dollar5',editor : {xtype : 'numberfield',minValue: 0}}
                  ,{text     : 'Unit6',flex:1,dataIndex: 'unit6',editor : {xtype : 'numberfield',minValue: 0}}
                  ,{text     : 'Dollar6',flex:1,dataIndex: 'dollar6',editor : {xtype : 'numberfield',minValue: 0}}
                  ,{text     : 'Unit7',flex:1,dataIndex: 'unit7',editor : {xtype : 'numberfield',minValue: 0}}
                  ,{text     : 'Dollar7',flex:1,dataIndex: 'dollar7',editor : {xtype : 'numberfield',minValue: 0}}
                  ,{text     : 'Unit8',flex:1,dataIndex: 'unit8',editor : {xtype : 'numberfield',minValue: 0}}
                  ,{text     : 'Dollar8',flex:1,dataIndex: 'dollar8',editor : {xtype : 'numberfield',minValue: 0}}
                  ,{text     : 'Unit9',flex:1,dataIndex: 'unit9',editor : {xtype : 'numberfield',minValue: 0}}
                  ,{text     : 'Dollar9',flex:1,dataIndex: 'dollar9',editor : {xtype : 'numberfield',minValue: 0}}
                  ,{text     : 'Unit10',flex:1,dataIndex: 'unit10',editor : {xtype : 'numberfield',minValue: 0}}
                  ,{text     : 'Dollar10',flex:1,dataIndex: 'dollar10',editor : {xtype : 'numberfield',minValue: 0}}
                  ,{text     : 'Unit11',flex:1,dataIndex: 'unit11',editor : {xtype : 'numberfield',minValue: 0}}
                  ,{text     : 'Dollar11',flex:1,dataIndex: 'dollar11',editor : {xtype : 'numberfield',minValue: 0}}
                  ,{text     : 'Unit12',flex:1,dataIndex: 'unit12',editor : {xtype : 'numberfield',minValue: 0}}
                  ,{text     : 'Dollar12',flex:1,dataIndex: 'dollar12',editor : {xtype : 'numberfield',minValue: 0}}
                  ]
,    		dockedItems : [
							{
							    xtype: 'toolbar',
							    dock:'top',
							    items: [{iconCls: 'icon-save',itemId: 'quotaDetailSave',text: 'Save',action: 'quotaDetailSave'}
										,{iconCls: 'icon-reset',itemId: 'quotaDetailReset',text: 'Clear',action: 'quotaDetailReset'}
										,'->'
										,{iconCls: 'icon-return',itemId: 'quotaDetailReturn',text: 'Cancel',action: 'quotaDetailReturn'}
										]
							} 
    		               ,{	xtype: 'pagingtoolbar',
								dock:'bottom',
								store: 'dealers.DealerQuotaDetail',
								displayInfo: true,
								displayMsg: 'Displaying Quota Details {0} - {1} of {2}',
								emptyMsg: "No Dealer to display"
								}
    		                ]    	
    	,initComponent: function() {
    		//Ext.apply(this, {});
    		this.callParent(arguments);
    	}    	
   });