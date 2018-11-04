// --------------------------------------------------------------------------------------------------------------------
// <copyright file="EventDates.cs" company="AdminCore">
//   Unosquare
// </copyright>
// <summary>
//   Defines the EventDates type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace AdminCore.DAL.Models
{
  using System;
  using System.ComponentModel.DataAnnotations;
  using System.ComponentModel.DataAnnotations.Schema;

  /// <summary>
  /// The event dates.
  /// </summary>
  [Table("event_dates")]
  public class EventDates
  {
    /// <summary>
    /// Gets or sets the event dates id.
    /// </summary>
    [Key]
    [Column("event_dates_id")]
    public int EventDatesId { get; set; }

    /// <summary>
    /// Gets or sets the event.
    /// </summary>
    [ForeignKey("event_id")]
    public int EventId { get; set; }

    /// <summary>
    /// Gets or sets the start date.
    /// </summary>
    [Column("start_date")]
    public DateTime StartDate { get; set; }

    /// <summary>
    /// Gets or sets the end date.
    /// </summary>
    [Column("end_date")]
    public DateTime EndDate { get; set; }

    /// <summary>
    /// Gets or sets a value indicating whether is half day.
    /// </summary>
    [Column("is_half_day")]
    public bool IsHalfDay { get; set; }
  }
}