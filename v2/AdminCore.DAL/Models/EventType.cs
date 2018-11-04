// --------------------------------------------------------------------------------------------------------------------
// <copyright file="EventType.cs" company="AdminCore">
//   Unosquare
// </copyright>
// <summary>
//   Defines the EventType type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace AdminCore.DAL.Models
{
  using System.ComponentModel.DataAnnotations;
  using System.ComponentModel.DataAnnotations.Schema;

  /// <summary>
  /// The event type.
  /// </summary>
  [Table("event_type")]
  public class EventType
  {
    /// <summary>
    /// Gets or sets the event type id.
    /// </summary>
    [Key]
    [Column("event_type_id")]
    public int EventTypeId { get; set; }

    /// <summary>
    /// Gets or sets the description.
    /// </summary>
    [Column("description")]
    public string Description { get; set; }
  }
}