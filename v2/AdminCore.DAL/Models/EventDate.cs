using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdminCore.DAL.Models
{
  [Table("event_date")]
  public class EventDate
  {
    [Key]
    [Column("event_date_id")]
    public int EventDateId { get; set; }

    [Column("event_id")]
    public int EventId { get; set; }

    [Column("start_date")]
    public DateTime StartDate { get; set; }

    [Column("end_date")]
    public DateTime EndDate { get; set; }

    [Column("is_half_day")]
    public bool IsHalfDay { get; set; }

    [ForeignKey("EventId")]
    public virtual Event Event { get; set; }
  }
}