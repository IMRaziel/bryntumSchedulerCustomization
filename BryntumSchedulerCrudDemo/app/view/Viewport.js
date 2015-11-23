Ext.define('MyApp.view.Viewport', {
    extend      : 'Ext.container.Viewport',

    requires    : [
        'Ext.layout.container.Fit',
        'Ext.window.MessageBox',
        'Sch.data.CrudManager',
        'MyApp.store.CrudManager',
        'MyApp.store.ResourceStore',
        'MyApp.store.EventStore',
        'MyApp.view.Scheduler'
    ],

    layout      : {
        type    : 'fit'
    },

    processError : function (crud, response) {
        Ext.Msg.show({
            title   : 'Error',
            msg     : response.message,
            icon    : Ext.Msg.ERROR,
            buttons : Ext.Msg.OK,
            minWidth: Ext.Msg.minWidth
        });
    },

    initComponent : function() {
        var resourceStore   = Ext.create('MyApp.store.ResourceStore');

        var eventStore      = Ext.create('MyApp.store.EventStore');

        var crudManager     = Ext.create('MyApp.store.CrudManager', {
            resourceStore   : resourceStore,
            eventStore      : eventStore,
            listeners       : {
                loadfail    : this.processError,
                syncfail    : this.processError,

                scope       : this
            }
        });

    	var startDate = Sch.util.Date.add(new Date(), Sch.util.Date.WEEK, -2),
            endDate = Sch.util.Date.add(new Date(), Sch.util.Date.MONTH, 2);
    	startDate.setHours(0, 0, 0, 0);
    	endDate.setHours(0, 0, 0, 0);

    	var today = new Date();
    	today.setHours(0, 0, 0, 0);

    	var daysInTwoMonths = Sch.util.Date.getDurationInDays(today, endDate);

		var daySelectionComboConfig = {
			xtype: "combo",
			id: "daySelectionCombo",
			store: Array.range(-14, daysInTwoMonths)
				.map(x => {
					var date = Sch.util.Date.add(new Date(), Sch.util.Date.DAY, x);
					date.setHours(0, 0, 0, 0);

					return [
						x==0? today : date,
						Ext.Date.format(date, "l - d F")
					]
				}),
			value: today,
			listeners: {
				select: combo => {
					scheduler.scrollToDate/*Centered*/(combo.getValue(), true);
				}
			},
			width: 220
		}

		var scheduler = Ext.create('MyApp.view.Scheduler', {
			id: "scheduler",
            eventBarTextField   : 'Name',
            viewPreset          : 'dayAndWeek',
            startDate           : startDate,
            endDate             : endDate,
            title               : 'Scheduler with pagination',
            eventResizeHandles  : 'both',
            width               : 800,
            height              : 350,
            autoAdjustTimeAxis	: false,
            flex: 85,
			region: "center",

            crudManager         : crudManager,

            tbar                : [
                {
                    text    : 'Add new resource',
                    iconCls : 'icon-add',
                    border  : 1,
                    handler : function() {
                        resourceStore.add(new resourceStore.model({ Name : 'New resource' }));
                    }
                },
                '-',
                {
                    text    : 'Save changes',
                    iconCls : 'icon-save',
                    itemId  : 'save-button',
                    handler : function() {
                        crudManager.sync();
                    }
                },
                {
                    iconCls         : 'togglebutton',
                    text            : 'Sync changes automatically',
                    scope           : this,
                    enableToggle    : true,
                    handler         : function(btn) {
                        this.down('#save-button').setDisabled(btn.pressed);
                        crudManager.autoSync = btn.pressed;
                    }
                },
				{
					text: 'Today',
					width: 80,
					handler: function () {
						scheduler.scrollToDate/*Centered*/(new Date(), true);
						Ext.getCmp("daySelectionCombo").setValue(today);
					}
				},
				daySelectionComboConfig
            ],
            //define bottom bar with pagination buttons
            bbar                : {
                xtype           : 'sch_pagingtoolbar',
                store           : resourceStore,
                displayInfo     : true,
                displayMsg      : 'Displaying resources {0} - {1} of {2}',
                emptyMsg        : "No resources to display"
            }
        });

		var detailsPanel = {
			xtype: "panel",
			region: "east",
			flex: 15
		}

		this.items = {
			xtype: "panel",
			layout: "border",
			items: [
				scheduler,
				detailsPanel
			]
		}

	    this.callParent(arguments);
    }
});
