//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Bryntum.Scheduler
{
    using System;
    using System.Collections.Generic;
    
    public partial class Guest
    {
        public Guest()
        {
            this.RoomBooking = new HashSet<RoomBooking>();
        }
    
        public int GuestId { get; set; }
        public string Name { get; set; }
    
        public virtual ICollection<RoomBooking> RoomBooking { get; set; }
    }
}