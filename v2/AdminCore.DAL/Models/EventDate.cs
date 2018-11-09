// --------------------------------------------------------------------------------------------------------------------
// <copyright file="EventDates.cs" company="AdminCore">
//   Unosquare
// </copyright>
// <summary>
//   Defines the EventDates type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdminCore.DAL.Models
{
  /// <summary>
  ///   The event dates.
  /// </summary>
  [Table("event_date")]
  public class EventDate
  {
    /// <summary>
    ///   Gets or sets the event dates id.
    /// </summary>
    [Key]
    [Column("event_date_id")]
    public int EventDatesId { get; set; }

    /// <summary>
    ///   Gets or sets the event.
    /// </summary>
    [Column("event_id")]
    public int EventId { get; set; }

    /// <summary>
    ///   Gets or sets the event.
    /// </summary>
    [ForeignKey("EventId")]
    public Event Event { get; set; }

    /// <summary>
    ///   Gets or sets the start date.
    /// </summary>
    [Column("start_date")]
    public DateTime StartDate { get; set; }

    /// <summary>
    ///   Gets or sets the end date.
    /// </summary>
    [Column("end_date")]
    public DateTime EndDate { get; set; }

    /// <summary>
    ///   Gets or sets a value indicating whether is half day.
    /// </summary>
    [Column("is_half_day")]
    public bool IsHalfDay { get; set; }
  }
}