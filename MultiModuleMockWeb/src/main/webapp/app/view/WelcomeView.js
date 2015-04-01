Ext.define('Fast.view.WelcomeView', {
    extend: 'Ext.Panel',
    alias: 'widget.WelcomeView',
    layout:'border',
    
    requires: [
	],

    margins: '1 1 1 1',

    initComponent: function() {
		//console.log('typeof isProductAccessible ' + typeof isProductAccessible);

        this.items =[
        			{region:'north',
					xtype: 'panel',border: false, bodyStyle: 'font-family: tahoma,arial,helvetica,sans-serif; font-size: 10px; color: #7F7F7F;',
					html: '<TABLE ALIGN="left" BORDER=0 CELLSPACING=0 CELLPADDING=0 WIDTH="100%">'+
					'<TR ALIGN="middle" VALIGN="middle">'+
						//'<TD><img style="float: middle; padding: 50px 50px 50px 50px;" src="resources/fast/images/canon_logo.gif"/></TD></TR>'+
					'<TD><img style="float: middle; padding: 50px 50px 50px 50px;" src="resources/fast/images/SpringLogo.PNG"/></TD></TR>'+
					'<TR ALIGN="middle" VALIGN="middle">'+
						'<TD> <span style="float: middle; padding: 50px 50px 50px 50px; font-family: Helvetica,Arial,Verdana,sans-serif; font-weight: bold; font-size: 25px; color: #2F577F;">'+welcomeUserName+'</span> </TD></TR>'+
					'<TR ALIGN="middle" VALIGN="middle">'+
						'<TD> <h1><span style="float: midle; padding: 50px 50px 50px 50px; font-family: Helvetica,Arial,Verdana,sans-serif; font-weight: bold; font-size: 35px; color:#2F577F;">Demo ExtJs 4.2.1. front-end in Spring Boot.'+
						'<span style="padding: 4px 3px 0px 0px; font-family: Helvetica,Arial,Verdana,sans-serif; font-weight: bold; font-size: 10px; color:#2F577F;">'+FaST_Version_Number+'</span>'
						+'</span></h1></TD></TR>'+
					'</TABLE></br>'
					},
					{region:'center',
					xtype: 'panel',
					border: false,
					items:	[
							{xtype: 'panel',
							layout: 'hbox',
							width:'50%',
							align: 'center',
							border: false,
							style: {marginLeft: '35%',marginTop: '20px'},//marginLeft: '30%',marginTop: '20px',float:'middle'
							items:	[/*{
									iconCls: 'tabs',
									xtype: 'button',
									id:'ProductsBtn',
									text : 'Products',
									scale: 'large',
									//disabled: isProductAccessible ,
									style: {marginLeft: '10px'},
									handler: function() {
										var rootCardHolder	= this.up('viewport');
										var rootViewer	= rootCardHolder.down('rootViewer');
										rootCardHolder.getLayout().setActiveItem(1);
										rootViewer.setActiveTab(0);
										}
									},*/{
									iconCls: 'tabs',
									xtype: 'button',
									id:'DealerBtn',
									text : 'Dealer',
									scale: 'large',
									//disabled: isDealerAccessible,
									style: {marginLeft: '10px'},
									handler: function() {
										var rootCardHolder	= this.up('viewport');
										var rootViewer	= rootCardHolder.down('rootViewer');
										rootCardHolder.getLayout().setActiveItem(1);
										rootViewer.setActiveTab(1);
										}
									}/*,{
									iconCls: 'tabs',
									xtype: 'button',
									id:'SalesBtn',
									text : 'Sales',
									scale: 'large',
									//disabled: isSaleAccessible,
									style: {marginLeft: '10px'},
									handler: function() {
										var rootCardHolder	= this.up('viewport');
										var rootViewer	= rootCardHolder.down('rootViewer');
										rootCardHolder.getLayout().setActiveItem(1);
										rootViewer.setActiveTab(2);
										}
									}*/,{
									iconCls: 'tabs',
									xtype: 'button',
									id:'CompanyBtn',
									text : 'Company',
									scale: 'large',
									//disabled: isCompanyAccessible,
									style: {marginLeft: '10px'},
									handler: function() {
										var rootCardHolder	= this.up('viewport');
										var rootViewer	= rootCardHolder.down('rootViewer');
										rootCardHolder.getLayout().setActiveItem(1);
										rootViewer.setActiveTab(3);
										}
									}
								]
							}
						]
					}
					];
		//console.log("From WelcomePage : isProd = "+isProductAccessible+", isSale = "+isSaleAccessible+", isDealer = "+isDealerAccessible+", isCompany = "+isCompanyAccessible);
        this.callParent(arguments);
    }
/*    ,enableAppTabs: function(rootViewer){
		isProductAccessible
		isSaleAccessible
		isDealerAccessible
		isCompanyAccessible
    }
*/    /*
    ,listeners:{
		afterrender: function(  ){
			//console.log("From WelcomePage::afterrender  : isProd = "+isProductAccessible+", isSale = "+isSaleAccessible+", isDealer = "+isDealerAccessible+", isCompany = "+isCompanyAccessible);
			//debugger;
			var btn1 = Ext.getCmp('ProductsBtn');
			btn1.enable(isProductAccessible);
			var btn2 = Ext.getCmp('DealerBtn');
			btn2.enable(isDealerAccessible);
			var btn3 = Ext.getCmp('SalesBtn');
			btn3.enable(isSaleAccessible);
			var btn4 = Ext.getCmp('CompanyBtn');
			btn4.enable(isCompanyAccessible);
		}
	}*/
});