Ext.define('MyApp.store.EventStore', {
	requires: ['MyApp.model.RoomBookingModel'],
    extend      : 'Sch.data.EventStore',
    storeId     : 'events',
    pageSize: 100000,
    model: 'MyApp.model.RoomBookingModel'
});
