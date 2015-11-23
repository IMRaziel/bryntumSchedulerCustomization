using Bryntum.CRUD.Request;

namespace Bryntum.Scheduler.Request
{
    public class SchedulerSyncRequest<T, TR> : SyncRequest where T: Event where TR:Resource{
        /// <summary>
        /// Resource store changes.
        /// </summary>
        public SyncStoreRequest<TR> resources;

        /// <summary>
        /// Event store changes.
        /// </summary>
        public SyncStoreRequest<T> events;
    }
}
