Ext.define('Fast.view.AppViewport', {
    extend: 'Ext.Panel',
	alias: 'widget.AppViewport',
    requires: [
        'Fast.view.Viewer',
        'Ext.layout.container.Border'
    ],
    // no need renderTo: Ext.getBody(),
    layout: 'border',

    items: [

	 { region: 'north', border: false, margins: '5 5 0 5', height: 28, bodyStyle: 'background-color: #DFE8F6;',
			items: {
				xtype: 'panel',border: false, bodyStyle: 'font-family: tahoma,arial,helvetica,sans-serif; font-size: 10px; color: #7F7F7F;',
				html: '<TABLE ALIGN="left" BORDER=0 CELLSPACING=0 CELLPADDING=0 WIDTH="100%">'+
				'<TR ALIGN="left" VALIGN="middle">'+
					//'<TD><img style="float: middle; padding: 0px 0px 0px 0px;" src="resources/fast/images/canon_logo.gif"/></TD>'+
				'<TD><img style="float: middle; padding: 0px 0px 0px 0px;" src="resources/fast/images/SpringLogo.PNG"/></TD>'+
					'<TD> <span style="float: middle; padding: 4px 3px 0px 0px; font-family: Helvetica,Arial,Verdana,sans-serif; font-weight: bold; font-size: 12px; color: #2F577F;">'+welcomeUserName+'</span> </TD>'+
					'<TD> <h1><span style="float: right; padding: 4px 3px 0px 0px; font-family: Helvetica,Arial,Verdana,sans-serif; font-weight: bold; font-size: 21px; color:#2F577F;">ITCG Forecasting and Sales Tool (FaST)'+
					'<span style="padding: 4px 3px 0px 0px; font-family: Helvetica,Arial,Verdana,sans-serif; font-weight: bold; font-size: 10px; color:#2F577F;">'+FaST_Version_Number+'</span>'
					+'</span></h1></TD>'+
				'</TR> </TABLE>'
					}
	},
    {
        region: 'center',
        xtype: 'rootViewer'
    }
    ]
});
