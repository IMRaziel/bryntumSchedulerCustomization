using Bryntum.CRUD.Request;
using System;
using System.Collections.Generic;

namespace Bryntum.Scheduler.Request.Handler
{
    public class EventSyncHandler<T, TR> : SyncStoreRequestHandler<T> where T: Event where TR: Resource{

        private Scheduler<T, TR> Scheduler;

        public EventSyncHandler(Scheduler<T, TR> Scheduler, string dateFormat) : base(dateFormat) {
            this.Scheduler = Scheduler;
        }

        public override T GetEntity(IDictionary<String, Object> changes) {
            return Scheduler.getEvent(Convert.ToInt32(changes["Id"]));
        }

        protected IDictionary<String, Object> PrepareData(Event eventRecord)
        {
            // initialize returning hash
            IDictionary<String, Object> result = new Dictionary<String, Object>();

            var phantomResourceId = eventRecord.PhantomResourceId;
            if (eventRecord.resourceId == 0 && !String.IsNullOrEmpty(phantomResourceId))
            {
                int? resourceId = Scheduler.getResourceIdByPhantom(phantomResourceId);
                eventRecord.resourceId = resourceId.Value;
                result.Add("ResourceId", resourceId);
            }

            return result;
        }

        public override IDictionary<String, Object> Add(T eventRecord) {
            IDictionary<String, Object> response = PrepareData(eventRecord);

            Scheduler.saveEvent(eventRecord);

            return response;
        }

        public override IDictionary<String, Object> Update(T eventRecord, IDictionary<String, Object> changes)
        {
            if (changes.ContainsKey("Cls")) eventRecord.Сls = (string)changes["Cls"];
            if (changes.ContainsKey("Name")) eventRecord.Name = (string)changes["Name"];
            if (changes.ContainsKey("StartDate")) eventRecord.StartDate = (DateTime)changes["StartDate"];
            if (changes.ContainsKey("EndDate")) eventRecord.EndDate = (DateTime)changes["EndDate"];
            if (changes.ContainsKey("Draggable")) eventRecord.Draggable = Convert.ToBoolean(changes["Draggable"]);
            if (changes.ContainsKey("Resizable")) eventRecord.Resizable = Convert.ToBoolean(changes["Resizable"]);
            if (changes.ContainsKey("ResourceId")) eventRecord.ResourceId = Convert.ToString(changes["ResourceId"]);

            IDictionary<String, Object> response = PrepareData(eventRecord);

            Scheduler.saveEvent(eventRecord);

	        WriteAdditionalData(eventRecord, changes);

			return response;
        }

	    public void WriteAdditionalData(T eventRecord, IDictionary<String, Object> changes) {}

	    public override IDictionary<String, Object> Remove(T eventRecord)
        {
            Scheduler.removeEvent(eventRecord);
            return new Dictionary<String, Object>();
        }
    }
}
