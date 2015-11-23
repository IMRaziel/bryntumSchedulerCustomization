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
                    cls: "hide-lines"
                }
            ],
        	lockedGridConfig : {
	            	listeners: {
			            render: function() {
				            // found no way to override row rendering. will change styles after render
				            this.view.on("refresh", _ => {
					            var rows = Ext.get(this.el.dom.id).query("table");
					            rows.forEach(x => {
						            x.className = "hide-lines";
					            });
				            });
			            }
		            },
	            viewConfig: {
	            	stripeRows: false,
	            },
            },
        	schedulerConfig : {
	            	listeners: {
	            		render: function () {
	            			debugger;
	            		}
	            	},
	            viewConfig: {
	            	stripeRows: false,
	            	getRowClass: function (record, index, rowParams, store) {
						debugger
	            		return "";
	            	}
	            },
	            stripeRows: false,
        	},
            plugins : [
            ],
            listeners : {
                scope : this
            }
        });

        this.callParent(arguments);
    }
});
