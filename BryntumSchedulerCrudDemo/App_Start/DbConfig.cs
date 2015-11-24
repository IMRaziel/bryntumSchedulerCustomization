using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Bryntum.Scheduler;


namespace BryntumSchedulerCrudDemo.App_Start
{
	public class DbConfig
	{
		public static void PopulateDbIfNeeded() {
			using (var context = new SchedulerEntities()) {
				if (!context.Options.Any()) {
					context.Options.Add(new Option() {Name = "revision", Value = "1"});

					foreach (var i in Enumerable.Range(0, 10)) {
						context.Resources.Add(new Room() {
							Name = "Room " + i
						});
					}
					context.SaveChanges();

					context.Guests.Add(new Guest() {
						Name = "Guest 1"
					});
					context.Guests.Add(new Guest() {
						Name = "Guest 2"
					});
					context.Guests.Add(new Guest() {
						Name = "Guest with realy realy realy long name"
					});
					context.SaveChanges();

					context.Events.Add(new RoomBooking() {
						Name = "",
						resourceId = 3,
						StartDate = DateTime.Today,
						EndDate = DateTime.Today.AddDays(1).AddSeconds(-1),
						GuestId = 1
					});
					context.Events.Add(new RoomBooking() {
						Name = "",
						resourceId = 4,
						StartDate = DateTime.Today.AddDays(2),
						EndDate = DateTime.Today.AddDays(4).AddSeconds(-1),
						GuestId = 2,
						RoomStatus = 2,
						RoomType = 1
					});
					context.Events.Add(new RoomBooking() {
						Name = "",
						resourceId = 5,
						StartDate = DateTime.Today.AddDays(-1),
						EndDate = DateTime.Today.AddDays(1).AddSeconds(-1),
						GuestId = 3,
						RoomStatus = 2,
						RoomType = 1
					});
					context.SaveChanges();
				}
			}
		}
	}
}