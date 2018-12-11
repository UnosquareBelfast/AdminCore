using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdminCore.DAL.Models
{
  [Table("event_message")]
  public class EventMessage
  {
    [Key]
    [Column("event_message_id")]
    public int EventMessageId { get; set; }

    [Column("event_id")]
    public int EventId { get; set; }

    [Column("message")]
    public string Message { get; set; }

    [Column("event_message_type_id")]
    public int EventMessageTypeId { get; set; }

    [ForeignKey("EventMessageTypeId")]
    public EventMessageType EventMessageType { get; set; }

    [Column("last_modified")]
    public DateTime LastModified { get; set; }

    [Column("employee_id")]
    public int EmployeeId { get; set; }

    [ForeignKey("EmployeeId")]
    public Employee Employee { get; set; }
       
    [ForeignKey("EventId")]
    public Event Event { get; set; }
  }
}