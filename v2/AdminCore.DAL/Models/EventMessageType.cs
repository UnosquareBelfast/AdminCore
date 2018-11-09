// --------------------------------------------------------------------------------------------------------------------
// <copyright file="EventMessageType.cs" company="AdminCore">
//   Unosquare
// </copyright>
// <summary>
//   Defines the EventMessageType type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdminCore.DAL.Models
{
  /// <summary>
  ///   The event message type.
  /// </summary>
  [Table("event_message_type")]
  public class EventMessageType
  {
    /// <summary>
    ///   Gets or sets the event message id.
    /// </summary>
    [Key]
    [Column("event_message_type_id")]
    public int EventMessageId { get; set; }

    /// <summary>
    ///   Gets or sets the description.
    /// </summary>
    [Column("description")]
    public string Description { get; set; }
  }
}