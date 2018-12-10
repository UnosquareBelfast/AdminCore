using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdminCore.DAL.Models
{
  [Table("event_message_type")]
  public class EventMessageType
  {
    [Key]
    [Column("event_message_type_id")]
    public int EventMessageId { get; set; }

    [Column("description")]
    public string Description { get; set; }
  }
}