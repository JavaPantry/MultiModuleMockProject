
Ext.application({
    name: 'Fast',

    controllers: [
        'company.UsersController'
    ],

    launch: function() {
        Ext.create('Ext.container.Container', {
        	width:1240,
        	height:350,
        	renderTo:'mydiv',
            layout: 'fit',
            items: [
                {
                    xtype: 'UserGrid'
                }
            ]
        });
    }
});