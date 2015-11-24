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
            },
            columnLines: false,
            rowLines: false,
        });
		debugger;
        this.callParent(arguments);
    }
});
