using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdminCore.DAL.Models
{
  [Table("event_status")]
  public class EventStatus
  {
    [Key]
    [Column("event_status_id")]
    public int EventStatusId { get; set; }

    [Column("description")]
    public string Description { get; set; }
  }
}