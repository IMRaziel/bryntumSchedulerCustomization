using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using Bryntum.Scheduler;


namespace BryntumSchedulerCrudDemo
{
	public class DemoScheduler: Scheduler<RoomBooking, Room>
	{
		public override int getResourceCount() {
			return this.getResources().Count();
		}

		public override IEnumerable<RoomBooking> getEvents(params string[] includes) {
			return new [] {
				new RoomBooking() {
						Id = 1,
						Name = "",
						resourceId = 3,
						StartDate = DateTime.Today.StartOfDay(),
						EndDate = DateTime.Today.EndOfDay(),
						GuestId = 1,
						Price = Decimal.Parse("123456765.45", CultureInfo.InvariantCulture),
                        Guest = new Guest() {
							GuestId = 1,
							Name = "Guest 1"
						}
					},
				new RoomBooking() {
						Id = 2,
						Name = "",
						resourceId = 4,
						StartDate = DateTime.Today.AddDays(1).StartOfDay(),
						EndDate = DateTime.Today.AddDays(4).EndOfDay(),
						GuestId = 2,
						RoomStatus = 2,
						RoomType = 1,
						Price = Decimal.Parse("0.45", CultureInfo.InvariantCulture),
						Guest = new Guest() {
							GuestId = 2,
							Name = "Guest 2"
						}
					},
				new RoomBooking() {
						Id = 3,
						Name = "",
						resourceId = 5,
						StartDate = DateTime.Today.AddDays(-1).StartOfDay(),
						EndDate = DateTime.Today.AddDays(1).EndOfDay(),
						GuestId = 3,
						RoomStatus = 2,
						RoomType = 1,
						Price = Decimal.Parse("123.45", CultureInfo.InvariantCulture),
                        Guest = new Guest() {
							GuestId = 1,
							Name = "Guest 1"
						}
					},
				new RoomBooking() {
						Id = 4,
						Name = "",
						resourceId = 5,
						StartDate = DateTime.Today.AddDays(2).StartOfDay(),
						EndDate = DateTime.Today.AddDays(5).EndOfDay(),
						GuestId = 3,
						RoomStatus = 2,
						RoomType = 1,
						Price = Decimal.Parse("123.45", CultureInfo.InvariantCulture),
                        Guest = new Guest() {
							GuestId = 1,
							Name = "Guest 1"
						}
					},
				new RoomBooking() {
						Id = 5,
						Name = "",
						resourceId = 5,
						StartDate = DateTime.Today.AddMonths(1).StartOfDay(),
						EndDate = DateTime.Today.AddMonths(10).EndOfDay(),
						GuestId = 3,
						RoomStatus = 2,
						RoomType = 1,
						Price = Decimal.Parse("123.45", CultureInfo.InvariantCulture),
                        Guest = new Guest() {
							GuestId = 1,
							Name = "Guest 2"
						}
					},
				new RoomBooking() {
						Id = 6,
						Name = "",
						resourceId = 8,
						StartDate = DateTime.Today.AddMonths(-3).StartOfDay(),
						EndDate = DateTime.Today.AddMonths(10).EndOfDay(),
						GuestId = 3,
						RoomStatus = 2,
						RoomType = 1,
						Price = Decimal.Parse("123.45", CultureInfo.InvariantCulture),
                        Guest = new Guest() {
							GuestId = 1,
							Name = "Guest out of time bound both sides"
						}
					},
				new RoomBooking() {
						Id = 7,
						Name = "",
						resourceId = 2,
						StartDate = DateTime.Today.AddMonths(-3).StartOfDay(),
						EndDate = DateTime.Today.AddDays(0).EndOfDay(),
						GuestId = 3,
						RoomStatus = 2,
						RoomType = 1,
						Price = Decimal.Parse("123.45", CultureInfo.InvariantCulture),
                        Guest = new Guest() {
							GuestId = 1,
							Name = "Guest out of time bound both sides"
						}
					}
			};
		}

		public override IEnumerable<Room> getResources() {
			return this.getResources(0, 1000);
		}

		public override IEnumerable<Room> getResources(int page, int pageSize) {
			return Enumerable.Range(0,10)
				.Select((x, i)=> new Room() {
					Name = "Room " + x,
					Id = i
				});
		}

		public override int getRevision() {
			return 1;
		}
	}
}