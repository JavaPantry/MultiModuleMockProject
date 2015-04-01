Ext.require([
    'Ext.tree.*',
    'Ext.data.*',
    'Ext.window.MessageBox'
]);

var localStore = Ext.create('Ext.data.TreeStore', {
	proxy:	{type:'ajax',
			url:'json/companyAccessDetailsAction?m=read'
			}
	,constantUrl:'json/companyAccessDetailsAction?m=read'			
});

Ext.define('Fast.view.company.CompanyAccessOptionsTree' ,{
	extend: 'Ext.tree.Panel',
	alias : 'widget.CompanyAccessOptionsTree',
	id:'CompanyAccessOptionsTree',
	rootVisible:false,
	useArrows:true,
	store : localStore,
	animate:true,
	lines:true,
	listeners:{
		/*
		 * 
		 * Ext.selection.Model this, Ext.data.Model[] selected, Object eOpts 
		 */
		selectionchange: function( tree, selected, eOpts ){
			//debugger;
			//console.log('CompanyAccessOptionsTree selected = ' + selected);
			
		},
		beforerender: function( tree, eOpts ){
			//debugger;
		},
		afterrender: function( tree, eOpts ){
			var myStore = tree.getStore();
			//debugger;
		}
	},

	initComponent: function() {
		//debugger;
		//console.log('CompanyAccessOptionsTree:initComponent');
		this.callParent(arguments);
	}

});

/*
Ext.onReady(function(){
	Ext.define('accessDetailModel', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'groupId'},
            {name: 'groupName'},
            {name: 'groupDesc'},
            {name: 'groupNameDis', mapping: 'groupName'},
            {name: 'groupDescDis', mapping: 'groupDesc'},
            {name: 'p1',     type: 'boolean'},
            {name: 'p2',     type: 'boolean'},
            {name: 'p3',     type: 'boolean'},
            {name: 'd1',     type: 'boolean'},
            {name: 'd2',     type: 'boolean'},
            {name: 'd3',     type: 'boolean'},
            {name: 'd4',     type: 'boolean'},
            {name: 's1',     type: 'boolean'},
            {name: 's2',     type: 'boolean'},
            {name: 'c1',     type: 'boolean'},
            {name: 'c2',     type: 'boolean'},
            {name: 'c3',     type: 'boolean'},
            {name: 'c4',     type: 'boolean'}
           
           
        ]
    });
    var checkGroup = {
        xtype: 'fieldset',
        title: 'Access Options',
        layout: 'anchor',
        id: 'checkGrp',
        defaults: {
            anchor: '100%',
            labelStyle: 'padding-left:4px;'
        },
       
        items: [{
            
            xtype: 'checkboxgroup',
            fieldLabel: 'Product',
            cls: 'x-check-group-alt',
           
           
            // Specify exact column widths (could also include float values for %)
            columns: ['15%', '15%','15%'],
            columns: 5,
            vertical: false,
            items: [
                {boxLabel: 'Set Up Create', name: 'p1', id: 'p1'},
                {boxLabel: 'Replacement Create', name: 'p2', id: 'p2' },
                {boxLabel: 'Allocation', name: 'p3', id: 'p3'}
               
                
            ]
        },{
            // Use the default, automatic layout to distribute the controls evenly
            //across a single row
           xtype: 'checkboxgroup',
            fieldLabel: 'Dealer',
            cls: 'x-check-group-alt',
            columns: ['15%', '15%','15%','15%'],
            columns: 5,
            vertical: false,
            items: [
                {boxLabel: 'Set Up Create', name: 'd1', id: 'd1'},
                {boxLabel: 'Allocation', name: 'd2', id: 'd2'},
                {boxLabel: 'Create', name: 'd3', id: 'd3'},
                {boxLabel: 'Quota Create', name: 'd4', id: 'd4'}
               
            ]
        },{
            // Use the default, automatic layout to distribute the controls evenly
            // across a single row
            xtype: 'checkboxgroup',
            fieldLabel: 'Sales',
            cls: 'x-check-group-alt',
            columns: ['15%', '15%'],
            columns: 5,
            vertical: false,
            items: [
                {boxLabel: 'Product By Account Create', name: 's1', id: 's1'},
                {boxLabel: 'Forecast Create', name: 's2', id: 's2'}
                
            ]
        },{
            // Use the default, automatic layout to distribute the controls evenly
            // across a single row
            xtype: 'checkboxgroup',
            fieldLabel: 'Company',
            cls: 'x-check-group-alt',
            columns: ['15%', '15%','15%','15%'],
            columns: 5,
            vertical: false,
            items: [
                {boxLabel: 'User Create', name: 'c1',id: 'cp1'},
                {boxLabel: 'Hierarchy Create', name: 'c2', id: 'cp2'},
                {boxLabel: 'Access Level Create', name: 'c3', id: 'cp3'},
                {boxLabel: 'Advanced', name: 'c4', id: 'cp4'}
            ]
        }]
       
    };

   

   
    var fp = Ext.create('Ext.FormPanel', {
        title: 'Company Access Details',
        id:'accessDetail',
        iconCls: 'icon-grid',
        // configure how to read the json data
	    reader : new Ext.data.JsonReader({
		root : 'data',
		model : 'accessDetailModel',
		successProperty : '@success'
	}),
        frame: true,
        fieldDefaults: {
            labelWidth: 110
        },
        //width: 1240,
        height: 350,
       // renderTo:divId,
        bodyPadding: 10,
        items: [{
        	xtype: 'container',
            layout: 'hbox',
            defaultType: 'textfield',
            items: [{
                fieldLabel: 'GroupId',
                name: 'groupId',
                hidden:true
               
            },{
                fieldLabel: 'Access Level',
                labelWidth: 100,
                name: 'groupName',
                hidden: true,
                flex: 1,
                //width:30,
                allowBlank: false
            }, {
                fieldLabel: 'Description',
                labelWidth: 100,
                name: 'groupDesc',
                hidden: true,
                flex: 1
               // width:500
               
            },{
            	xtype: 'displayfield',
                fieldLabel: 'Access Level',
                labelWidth: 100,
                name: 'groupNameDis',
               // disabled: true,
                flex: 1,
                //width:30,
                allowBlank: false
            }, {
            	xtype: 'displayfield',
                fieldLabel: 'Description',
                labelWidth: 100,
                name: 'groupDescDis',
               // disabled: true,
                flex: 1
               // width:500
               
            }]
        },
            
           
            checkGroup
           
        ],
      
     // inline buttons
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
           // ui: 'footer',
            layout: {
                pack: 'left'
            },
            items: [{
                text: 'Save',
                iconCls: 'icon-save',
                //disabled: false,
                //formBind: true,
                handler: function(){
                	
                	//at least on selection needed
                	var myForm=Ext.getCmp("accessDetail");
                	var isSelected1= myForm.getForm().findField('p1').getValue();
                	var isSelected2= myForm.getForm().findField('p2').getValue();
                	var isSelected3= myForm.getForm().findField('p3').getValue();
                	var isSelected4= myForm.getForm().findField('d1').getValue();
                	var isSelected5= myForm.getForm().findField('d2').getValue();
                	var isSelected6= myForm.getForm().findField('d3').getValue();
                	var isSelected7= myForm.getForm().findField('d4').getValue();
                	var isSelected8= myForm.getForm().findField('s1').getValue(); 
                	var isSelected9= myForm.getForm().findField('s2').getValue();
                	var isSelected10= myForm.getForm().findField('cp1').getValue();
                	var isSelected11= myForm.getForm().findField('cp2').getValue();
                	var isSelected12= myForm.getForm().findField('cp3').getValue();
                	var isSelected13= myForm.getForm().findField('cp4').getValue();
                	
          	        var atLeastOneSelected=isSelected1||isSelected2||isSelected3||isSelected4||isSelected5||isSelected6||isSelected7||isSelected8||isSelected9||isSelected10||isSelected11||isSelected12||isSelected13;
          	                               
          	        if (atLeastOneSelected==false){
          	        	alert("At least one of user roles need to be seleted !");
          	        	
          	        }
          	        else
          	        {
                        this.up('form').getForm().submit({
                        //url: 'xml-form-errors.xml',
                        url: 'json/companyAccessDetailsAction?m=save',
                        submitEmptyText: false
                        //waitMsg: 'Saving Data...'
                        });
               	     goToDiv("accessLevelsContainer");
               	     var fm=Ext.getCmp('accessDetail');
               	      fm.getForm().load({
                      url: 'json/companyAccessDetailsAction?m=read'
                      //waitMsg: 'Loading...'
                  });

          	        }
                }
            },{
                minWidth: 80,
                text: 'Reset',
                iconCls: 'icon-reset',
                handler: function(){
                   // fp.getForm().reset();
                    //fp.getForm().setValues({
                   // checkGrp : [false, false, false, false, false,false, false, false, false, false,false, false, false]
                   //  });
                	Ext.getCmp('p1').setValue('p1', false);
                	Ext.getCmp('p2').setValue('p2', false);
                	Ext.getCmp('p3').setValue('p3', false);
                	Ext.getCmp('d1').setValue('d1', false);
                	Ext.getCmp('d2').setValue('d2', false);
                	Ext.getCmp('d3').setValue('d3', false);
                	Ext.getCmp('d4').setValue('d4', false);
                	Ext.getCmp('s1').setValue('s1', false);
                	Ext.getCmp('s2').setValue('s2', false);
                	Ext.getCmp('cp1').setValue('c1', false);
                	Ext.getCmp('cp2').setValue('c2', false);
                	Ext.getCmp('cp3').setValue('c3', false);
                	Ext.getCmp('cp4').setValue('c4', false);
                }
            },{
                minWidth: 80,
                text: 'Back',
                iconCls: 'icon-return',
                handler : function() {
               	 
               	 goToDiv("accessLevelsContainer");
                 	var fm=Ext.getCmp('accessDetail');
         	            fm.getForm().load({
                        url: 'json/companyAccessDetailsAction?m=read'
                        //waitMsg: 'Loading...'
                        });
			  }
            }]
        }]
        
       
    });
    fp.getForm().load({
        url: 'json/companyAccessDetailsAction?m=read'
        //waitMsg: 'Loading...'
    });
  
});


*/