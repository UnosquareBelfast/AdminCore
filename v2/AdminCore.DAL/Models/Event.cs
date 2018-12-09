using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdminCore.DAL.Models
{
  [Table("event")]
  public class Event
  {
    [Key]
    [Column("event_id")]
    public int EventId { get; set; }

    [Column("employee_id")]
    public virtual int EmployeeId { get; set; }

    [Column("date_created")]
    public DateTime DateCreated { get; set; }

    [Column("event_status_id")]
    public int EventStatusId { get; set; }

    [Column("event_type_id")]
    public int EventTypeId { get; set; }
    
    [Column("last_modified")]
    public DateTime LastModified { get; set; }

    [ForeignKey("EventId")]
    public ICollection<EventMessage> EventMessages { get; set; }   
    
    [ForeignKey("EventStatusId")]
    public virtual EventStatus EventStatus { get; set; }
    
    [ForeignKey("EmployeeId")]
    public virtual Employee Employee { get; set; }
    
    [ForeignKey("EventTypeId")]
    public virtual EventType EventType { get; set; }

    public virtual ICollection<EventDate> EventDates { get; set; }
  }
}