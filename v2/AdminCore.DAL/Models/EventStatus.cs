// --------------------------------------------------------------------------------------------------------------------
// <copyright file="EventStatus.cs" company="AdminCore">
//   Unosquare
// </copyright>
// <summary>
//   Defines the EventStatus type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdminCore.DAL.Models
{
  /// <summary>
  ///   The event status.
  /// </summary>
  [Table("event_status")]
  public class EventStatus
  {
    /// <summary>
    ///   Gets or sets the event status id.
    /// </summary>
    [Key]
    [Column("event_status_id")]
    public int EventStatusId { get; set; }

    /// <summary>
    ///   Gets or sets the description.
    /// </summary>
    [Column("description")]
    public string Description { get; set; }
  }
}