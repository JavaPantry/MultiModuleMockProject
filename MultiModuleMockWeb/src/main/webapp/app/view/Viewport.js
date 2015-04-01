Ext.define('Fast.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: [
        'Fast.view.WelcomeView',
        'Fast.view.AppViewport'
    ],
    layout: 'card',

    items:	[
    		{xtype: 'WelcomeView'}
    		,{xtype: 'AppViewport'}
    		]
});
