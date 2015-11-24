Ext.define('MyApp.view.Scheduler', {
	extend: 'Sch.panel.SchedulerGrid',
	requires: [
        'Ext.form.field.Text',
        'Ext.menu.Menu',
        'Ext.grid.plugin.CellEditing',
        'Sch.util.Date',
        'Sch.plugin.SimpleEditor',
        'Sch.plugin.SummaryColumn'
	],

	snapToIncrement: true,
	autoAdjustTimeAxis: false,

	initComponent: function () {
		var me = this;

		Ext.define('Line', {
			extend: 'Ext.data.Model',
			fields: [
                'Date',
                'Text',
                'Cls'
			]
		});

		Ext.apply(this, {
			eventRenderer: function (eventRec, resourceRec, templateData) {
				templateData.cls = "booking-event";
				return eventRec.data.Guest.Name;
			},
			//        	eventTpl: new Ext.XTemplate(
			//				'<tpl for="."><div unselectable="on" tabindex="-1" id="scheduler-{id}" style="right:{right}px;left:{left}px;top:{top}px;height:{height}px;width:{width}px;{style}" class="sch-event x-unselectable {internalCls} {cls}"><div class="sch-resizable-handle sch-resizable-handle-start"></div><div unselectable="on" class="sch-event-inner {iconCls}">{body}</div><div class="sch-resizable-handle sch-resizable-handle-end"></div></div></tpl>'
			//			),
			columns: [
                {
                	header: 'Rooms',
                	sortable: true,
                	width: 200,
                	dataIndex: 'Name',
                	tdCls: "resource-gradient",
                	flex: 1
                }
			],
			lockedGridConfig: {
				bodyCls: "resource-gradient"
			},
			schedulerConfig: {
				bodyCls: "events-panel",
				listeners: {
					render: function () {
						// found no way to override row rendering. will change styles after render
						// this is needed for compatibility with zone plugin
						this.view.on("refresh", function () {
							var rows = Ext.get(this.el.dom.id).query("table");
							rows.forEach(function (x) {
								debugger;
								x.className += " events-panel-row";
							});
						});
						this.view.on("scroll", function () {
							function intersect(view, el) {
								if (view.left > el.right || view.right < el.left) {
									// no itersection
									return {};
								}
								if (view.left < el.left && view.right > el.right) {
									// view includes whole header
									return {};
								}
								if (view.left > el.left && view.right < el.right) {
									// header is bigger in all directions
									return {
										float: "left",
										padding: ((view.right - view.left) / 2) - 50 + (view.left - el.left)
									}
								}
								var result = {};
								result.float = view.right > el.right
									? "right"
									: "left"
								result.padding = result.float == "right"
									? Math.max(-(view.left - el.right) / 2.0 - 50, 10)
									: Math.max(-(el.left - view.right) / 2.0 - 50, 10)
								return result;
							}

							var q = me;
							var e = q.query("grid")[1];
							var topHead = e.view.headerCt.el.query("table")[0]
							var monthHeaders = Ext.get(topHead).query("td");

							monthHeaders.forEach(x=> {
								var viewRect = e.el.dom.getBoundingClientRect();
								var headRect = x.getBoundingClientRect();
								var style = intersect(viewRect, headRect);

								var title = x.children[0];
								title.style.float = style.float;
								title.style["padding-" + style.float] = style.padding + "px"
								console.log(style)
							})
						})

					},
				},
			},
			plugins: [
				Ext.create("Sch.plugin.Zones", {
					store: Ext.create('Ext.data.JsonStore', {
						model: 'Sch.model.Range',

						data: this.datesRange
							.filter(function (x) { return x.getDay() == 6 || x.getDay() == 0 })
							.map(function (x) {
								return ({
									StartDate: x,
									EndDate: Sch.util.Date.add(x, Sch.util.Date.DAY, 1),
									Cls: 'weekend'
								})
							}
							)
					})
				}),
				Ext.create('Sch.plugin.Lines', {
					getHeaderElementCls: function () { return "sch-header-indicator current-time-indicator" },
					showHeaderElements: true,
					//headerTemplate: new Ext.XTemplate("<div class='current-time-indicator' />"),
					store: Ext.create('Ext.data.JsonStore', {
						model: 'Sch.model.Range',
						data: [{
							Date: new Date,
							Cls: "current-time-line",
							Text: "Now"
						}]
					})
				})
			],
			listeners: {
				scope: this
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
