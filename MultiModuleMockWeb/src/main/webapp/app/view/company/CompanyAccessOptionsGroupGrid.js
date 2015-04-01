/*Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.state.*',
    'Ext.form.*',
    'Ext.ux.CheckColumn'
]);*/

Ext.define('AccessLevelDetail', {
        extend: 'Ext.data.Model',
        fields: ['optionId','subSection', 'section',{ name:'granted', type: 'bool' }, 'appOptions']
    });

var localStore = Ext.create('Ext.data.Store', {
	storeId: 'AccessLevelDetailStore',
	model: 'AccessLevelDetail',
	groupField: 'section',
	proxy:	{type:'ajax',
			url:'json/companyAccessDetailsAction?m=readGroupAccessRights'
			}
	,constantUrl:'json/companyAccessDetailsAction?m=readGroupAccessRights'			
});

var groupingFeature = Ext.create('Ext.grid.feature.Grouping', {
			groupHeaderTpl: '{name}',
			hideGroupedHeader: true,
			startCollapsed: true,
			id: 'sectionGrouping'
});

//var sm = Ext.create('Ext.selection.CheckboxModel');
Ext.define('Fast.view.company.CompanyAccessOptionsGroupGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.CompanyAccessOptionsGroupGrid',
    id:'CompanyAccessOptionsGroupGrid',
	//collapsible: true,
	features: [groupingFeature],
	//selModel: sm,
    store: localStore,

    columns: [
			{text: 'optionId',hidden: true,dataIndex: 'optionId'}
			,{text: 'Name',flex: 1,dataIndex: 'subSection'}
			,{text: 'Section',flex: 1,dataIndex: 'section'}
			,{text: 'Granted',dataIndex: 'granted',xtype: 'checkcolumn',width: 60
			    ,editor: {xtype: 'checkbox',cls: 'x-grid-checkheader-editor'}
		        ,listeners:{
			        checkchange:function(checkColumn, rowIndex, checked, eOpts){
			            //console.log('checkchange = '+checked);
			            var gridPanel = this.up('panel');
			            var store = gridPanel.getStore();
			            var record = store.getAt(rowIndex);
			            var appOptions = record.get('appOptions');
			            var appOptions = appOptions.split(',');
			            if(appOptions[0] != 'mutualexclusive')
			            	return;
			            var mutualIdx = appOptions[1]; 	
			            if(checked){
			            	for(var i = 0; i < store.count(); i++){
			            		var mutualRecord = store.getAt(i);
			            		if(mutualRecord.get('optionId') == mutualIdx){
			            			mutualRecord.set('granted',false);
			            		}
			            	}
			            	gridPanel.getView().refresh();
			            	//console.log('mutualRecord = '+mutualRecord.get('granted'));
			            }
			            
			        }
			    }
			}
			,{text: 'appOptions',hidden: true,dataIndex: 'appOptions'}
            ]
});

