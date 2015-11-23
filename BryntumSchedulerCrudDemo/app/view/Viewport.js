Ext.define('MyApp.view.Viewport', {
    extend      : 'Ext.container.Viewport',

    requires    : [
        'Ext.layout.container.Fit',
        'Ext.window.MessageBox',
        'Sch.data.CrudManager',
        'MyApp.store.CrudManager',
        'MyApp.store.ResourceStore',
        'MyApp.store.EventStore',
        'MyApp.view.Scheduler',
		'MyApp.model.RoomBookingDetailsModel'
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
                //load: _ => scheduler.scrollToDate/*Centered*/(new Date(), true),
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

	    debugger;
		Sch.preset.Manager.registerPreset("MonthDayNameDay", {
			"timeColumnWidth": 100,
			"rowHeight": 24,
			"resourceColumnWidth": 100,
			"displayDateFormat": "m/d h:i A",
			"shiftUnit": "d",
			"shiftIncrement": 1,
			"defaultSpan": 5,
			"timeResolution": {
				"unit": "h",
				"increment": 1
			},
			"headerConfig": {
				"middle": {
					"unit": "DAY",
					"align": "center",
					"dateFormat": "D"
				},
				"top": {
					"unit": "MONTH",
					"align": "center",
					"dateFormat": "M, Y"
				},
				"bottom": {
					"unit": "DAY",
					"align": "center",
					"dateFormat": "d"
				}
			},
			"columnLinesFor": "bottom",
			name: "MonthDayNameDay"
		});

		var scheduler = Ext.create('MyApp.view.Scheduler', {
			id: "scheduler",
            eventBarTextField   : 'Name',
            viewPreset:			"MonthDayNameDay",
            startDate           : startDate,
            endDate             : endDate,
            title               : 'Scheduler with pagination',
            eventResizeHandles  : 'both',
            width               : 800,
            height              : 350,
            autoAdjustTimeAxis	: false,
            flex: 85,
			region: "center",

			eventRenderer : function (eventRec, resourceRec, templateData) {
				return eventRec.data.Guest.Name;
			},

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
            },
			 listeners: {
			 	eventclick: function (sch, rec) {
			 		var form = this.up().down("form");
			 		form.viewModel.setData(Ext.clone(rec.data));
					 form.eventRecord = rec;
					 console.log("event click", arguments);
			 	}
			 }
		});

		var detailsForm = {
			xtype: "form",
			id: "DestailsForm",

			style: {
				padding: "10px"
			},

			viewModel: {
				type: "RoomBookingDetailsModel"
			},

			listeners: {
				beforerender: x => x.setViewModel({})
			},

			items: [
				{
					fieldLabel: "RoomType",
					bind: "{RoomType}",
					xtype: "combo",
					store: [[0, "RoomType 0"], [1, "RoomType 1"], [2, "RoomType 2"]],
					readOnly: true
				},
				{
					fieldLabel: "RoomStatus",
					bind: "{RoomStatus}",
					xtype: "combo",
					store: [[0, "RoomStatus 0"], [1, "RoomStatus 1"], [2, "RoomStatus 2"]],
					readOnly: true
				},
				{
					fieldLabel: "StartDate",
					bind: "{StartDate}",
					xtype: "datefield",
					readOnly: true
				},
				{
					fieldLabel: "EndDate",
					bind: "{EndDate}",
					xtype: "datefield",
					readOnly: true
				},
				{
					fieldLabel: "Guest",
					bind: "{Guest.GuestId}",
					xtype: "combo",
					valueField: "GuestId",
					displayField: "Name",
					queryMode: "local",
					store: {
						fields: ["GuestId", "Name"],
						data: [
							{ GuestId: 1, Name: "Guest 1" },
							{ GuestId: 2, Name: "Guest 2" }
						],
						type: "json"
					},
					readOnly: true
				},
			],
//			buttons: [
//				{
//					text: "Apply",
//					handler: function(btn) {
//						var form = btn.up("form");
//						debugger;
//						form.eventRecord.set(form.getViewModel().data);
//					},
//					hidden: true
//				}
//			]
		}

	    var detailsPanel = {
	    	xtype: "panel",
			id: "DestailsPanel",
			region: "east",
			flex: 15,
			layout: "fit",
			items: detailsForm
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
