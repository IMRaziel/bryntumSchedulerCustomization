using Bryntum.CRUD.Request;
using System;
using System.Collections.Generic;

namespace Bryntum.Scheduler.Request.Handler
{
    public class ResourceSyncHandler<TE, T> : SyncStoreRequestHandler<T> where T : Resource where TE : Event{

        private Scheduler<TE, T> Scheduler;

        public ResourceSyncHandler(Scheduler<TE, T> Scheduler) {
            this.Scheduler = Scheduler;
        }

        public override T GetEntity(IDictionary<String, Object> changes) {
            return Scheduler.getResource(Convert.ToInt32(changes["Id"]));
        }

        public override IDictionary<String, Object> Add(T resource)
        {
            Scheduler.saveResource(resource);
            return new Dictionary<String, Object>();
        }

        public override IDictionary<String, Object> Update(T resource, IDictionary<String, Object> changes)
        {
            // apply changes to the entity
            if (changes.ContainsKey("Name")) resource.Name = changes["Name"] as string;
            
            Scheduler.saveResource(resource);
            return new Dictionary<String, Object>();
        }

        public override IDictionary<String, Object> Remove(T resource)
        {
            Scheduler.removeResource(resource);
            return new Dictionary<String, Object>();
        }
    }
}
