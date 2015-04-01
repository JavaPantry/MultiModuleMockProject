Ext.define('Fast.view.dealers.HierarchyForm', {
    extend: 'Ext.window.Window',
    alias : 'widget.HierarchyForm',

    requires: ['Ext.form.Panel','Ext.form.field.Text'],

    title : 'Edit Dealer Hierarchy',
    layout: 'fit',
    autoShow: true,
    modal: true,
    width: 300,
    y: 100,
    
    iconCls: 'icon-user',

    listeners:{
        destroy:function(win){
             isWindowOpened = false;
        }
    },
    
    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                padding: '5 5 0 5',
                border: false,
                style: 'background-color: #fff;',
                
                fieldDefaults: {
                    anchor: '100%',
                    labelAlign: 'left',
                    combineErrors: true,
                    msgTarget: 'side'
                },

                items: [
						{hidden:true,xtype:'textfield',name :'sequenceNumber',fieldLabel:'Sequence Number'}
						,{hidden:true,xtype:'textfield',name :'id',fieldLabel:'Dealer Hierarchy Id'}
						,{hidden:true,xtype:'textfield',name :'dealerId',fieldLabel:'Dealer Id'}
						,{xtype:'displayfield',name :'smsValue1',fieldLabel:'Management Group'}
						,{
					    xtype: 'combo',
					    id: 'hierarchyFormValue2Id',
					    editable: false,
					    queryMode: 'local',
					    store: 'SMSChannel',
					    displayField: 'channelDescription',
					    valueField: 'channelName',
						fieldLabel: 'Channel',
						emptyText: 'Select a Channel...',
					    name: 'value2',
				    	listeners: {
			                change: function(combo, newValue, oldValue){
			                    if (newValue != null){
			                    	var regionFiled = Ext.getCmp('hierarchyFormValue3Id');
			                    	if (regionFiled != null)
			                    		regionFiled.setValue("");
			                    	setRegionStore(newValue);
		                    	}
			                }
				    	}
					},{
					    xtype: 'combo',
					    id: 'hierarchyFormValue3Id',
					    editable: false,
					    queryMode: 'local',
					    store: 'SMSRegion',
					    displayField: 'regionDescription',
					    valueField: 'region',
						fieldLabel: 'Region',
						emptyText: 'Select a Region...',
					    name: 'value3'
			    	}                    
                ]
            }
        ];
        
    	this.dockedItems = [{
    		xtype:'toolbar',dock:'bottom',id:'buttons',ui:'footer',
    		items:['->',	{iconCls:'icon-save',itemId:'save',text:'Save',action:'updateHierarchy'},
    				{iconCls:'icon-cancel',text:'Cancel',scope:this,handler:this.close}]
    	}];

        this.callParent(arguments);
    }
});
