Ext.define('MyApp.model.RoomBookingDetailsModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.RoomBookingDetailsModel',

	data: {
		RoomType: 0,
		RoomStatus: 0,
		StartDate: new Date(),
		EndDate: new Date(),
		Guest: {
			GuestId: 0,
			Name: ""
		},
		GuestId: 0
	}
});