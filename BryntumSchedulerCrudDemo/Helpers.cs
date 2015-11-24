using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BryntumSchedulerCrudDemo
{
	public static class Helpers
	{
		public static DateTime StartOfDay(this DateTime theDate)
		{
			return theDate.Date;
		}

		public static DateTime EndOfDay(this DateTime theDate)
		{
			return theDate.Date.AddDays(1).AddTicks(-1);
		}
	}
}