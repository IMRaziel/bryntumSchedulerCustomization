Ext.define('MyApp.model.RoomBookingModel', {
	statics: {
		ParentInstance: Ext.create('Sch.model.Event')
	},
	extend      : 'Sch.model.Event',
	nameField: 'Guest.Name',
	fields: [
		{
			name: "StartDate",
			type: "date",
			convert: function (val) {
				var recordTime = MyApp.model.RoomBookingModel.ParentInstance.fieldsMap.StartDate.convert(val);
				var correctedTime = Sch.util.Date.add(
					recordTime,
					Sch.util.Date.MINUTE,
					window.serverOffset + new Date().getTimezoneOffset())
				debugger;
				return correctedTime;
			}
		},
		{
			name: "EndDate",
			type: "date",
			convert: function (val) {
				var recordTime = MyApp.model.RoomBookingModel.ParentInstance.fieldsMap.StartDate.convert(val);
				var correctedTime = Sch.util.Date.add(
					recordTime,
					Sch.util.Date.MINUTE,
					window.serverOffset + new Date().getTimezoneOffset())
				debugger;
				return correctedTime;
			}
		}
	]
});