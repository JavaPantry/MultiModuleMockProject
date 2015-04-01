Ext.define('Fast.view.dealers.DealerQuotaDetailView' ,{
    extend: 'Ext.Panel',
    alias : 'widget.DealerQuotaDetailView',
    layout: 'anchor',

    items:[	
		{xtype: 'fieldcontainer',
		//fieldLabel: 'Dealer Group',
		combineErrors: false,
		anchor: '100% 5%',
		layout:'hbox',
		defaults: {xtype: 'displayfield'
					,margin:'5'
					,labelPad:2
					,labelCls:'fast-label'
				}
		,items: [
		        	{hidden:true,itemId:'dealerId'}//fieldLabel: 'DealerId',
		        	,{hidden:true,itemId:'Id'}//,fieldLabel: 'DealerQuotaId'
					,{fieldLabel: 'Dealer Code',itemId:'dealerCode',labelWidth:80} //(top, right, bottom, left)
					,{fieldLabel:'Dealer Description',itemId:'dealerName',labelWidth:120}
					,{fieldLabel:'Dealer Type',itemId:'dealerType'
						,renderer: function(value){
							if (value === 'B') {
							    return 'Bill To';
							}else if (value === 'S') {
							    return 'Sell To';
							}else if (value === 'G') {
							    return 'Group';
							}
							return '';
							}
					,labelWidth:80
					}
					,{fieldLabel:'Year',itemId:'Year',labelWidth:40}
					,{hidden:true,itemId:'Year1stHalf'}
					,{hidden:true,itemId:'Year2ndHalf'}
				]
		}
    	,{xtype:'DealerQuotaDetailGrid',anchor: '100% 95%'}
    ]
});