/*function actualTypeRenderer(value) {
        if (value === 'R') {
            return 'Forecast';
        }else if (value === 'P') {
            return 'Purchased';
        }else if (value === 'FT') {
            return 'Fct Sell Through';
        }else if (value === 'T') {
            return 'Sell Through';
        }else if (value === 'H') {
            return 'On Hands';
        }
};*/

Ext.define('Fast.view.sales.forecast.ForecastTypeColoredBaseGrid',
				{	extend : 'Ext.grid.Panel'
					,requires : [ 'Ext.toolbar.Toolbar', 'Ext.toolbar.Paging' ]
					//,selModel : Ext.create('Ext.selection.CheckboxModel')
					,columnLines : true
					,viewConfig : {
						stripeRows : false,
						getRowClass : function(record) {
							switch (record.get('actualType')) {
							case 'R':return record.get('oddity') ? 'regularStyle': 'regularStyle_alt';break;
							case 'P':return record.get('oddity') ? 'purchasedStyle': 'purchasedStyle_alt';break;
							case 'T':return record.get('oddity') ? 'sellThroughStyle': 'sellThroughStyle_alt';break;
							case 'FT':return record.get('oddity') ? 'forecastSellThroughStyle': 'forecastSellThroughStyle_alt';break;
							case 'H':return record.get('oddity') ? 'onHandsStyle': 'onHandsStyle_alt';break;
							// default: code to be executed if n is different from case 1 and 2
							};
						}
					}
				 ,actualTypeRenderer:function(value) {
				    if (value === 'R') {
				        return 'Forecast';
				    }else if (value === 'P') {
				        return 'Purchased';
				    }else if (value === 'FT') {
				        return 'Fct Sell Through';
				    }else if (value === 'T') {
				        return 'Sell Through';
				    }else if (value === 'H') {
				        return 'On Hands';
				    }
				}
			}
);