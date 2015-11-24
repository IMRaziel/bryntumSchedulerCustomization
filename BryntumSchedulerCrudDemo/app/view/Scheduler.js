Ext.define('MyApp.view.Scheduler', {
    extend              : 'Sch.panel.SchedulerGrid',
    requires            : [
        'Ext.form.field.Text',
        'Ext.menu.Menu',
        'Ext.grid.plugin.CellEditing',
        'Sch.util.Date',
        'Sch.plugin.SimpleEditor',
        'Sch.plugin.SummaryColumn'
    ],

    snapToIncrement     : true,
    autoAdjustTimeAxis	: false,

    initComponent : function() {
    	var me = this;



        Ext.apply(this, {
        	eventRenderer: function (eventRec, resourceRec, templateData) {
		        templateData.cls = "booking-event";
        		return eventRec.data.Guest.Name;
        	},
//        	eventTpl: new Ext.XTemplate(
//				'<tpl for="."><div unselectable="on" tabindex="-1" id="scheduler-{id}" style="right:{right}px;left:{left}px;top:{top}px;height:{height}px;width:{width}px;{style}" class="sch-event x-unselectable {internalCls} {cls}"><div class="sch-resizable-handle sch-resizable-handle-start"></div><div unselectable="on" class="sch-event-inner {iconCls}">{body}</div><div class="sch-resizable-handle sch-resizable-handle-end"></div></div></tpl>'
//			),
            columns : [
                {
                    header      : 'Rooms',
                    sortable    : true,
                    width       : 200,
                    dataIndex: 'Name',
                    tdCls: "resource-gradient",
					flex: 1
                }
            ],
        	lockedGridConfig : {
	            bodyCls: "resource-gradient"
            },
        	schedulerConfig : {
        		bodyCls: "events-panel",
        		listeners: {
        			render: function() {
        				// found no way to override row rendering. will change styles after render
						// this is needed for compatibility with zone plugin
				        this.view.on("refresh", _ => {
					        var rows = Ext.get(this.el.dom.id).query("table");
					        rows.forEach(x => {
						        debugger;
					        	x.className += " events-panel-row";
					        });
				        });
			        }
		        },
			},
        	plugins: [
				Ext.create("Sch.plugin.Zones", {
					store: Ext.create('Ext.data.JsonStore', {
						model: 'Sch.model.Range',

						data: this.datesRange
							.filter(x => x.getDay() == 6 || x.getDay() == 0)
							.map(x => ({
									StartDate: x,
									EndDate: Sch.util.Date.add(x, Sch.util.Date.DAY, 1),
									Cls: 'weekend'
								})
							)
					})
				})
        	],
            listeners : {
                scope : this
            },
            viewConfig: {
            	stripeRows: false,
            	selectedEventCls: "booking-event-selected"
            },
            columnLines: false,
            rowLines: false,
        });
		debugger;
        this.callParent(arguments);
    }
});
