using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdminCore.DAL.Models
{
  [Table("event_dates")]
  public class EventDate
  {
    [Key]
    [Column("event_dates_id")]
    public int EventDatesId { get; set; }

    [Column("event_id")]
    public int EventId { get; set; }

    [Column("start_date")]
    public DateTime StartDate { get; set; }

    [Column("end_date")]
    public DateTime EndDate { get; set; }

    [Column("is_half_day")]
    public bool IsHalfDay { get; set; }
    
    [ForeignKey("EventId")]
    public Event Event { get; set; }
  }
}