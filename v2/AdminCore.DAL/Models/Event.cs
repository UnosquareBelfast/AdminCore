// --------------------------------------------------------------------------------------------------------------------
// <copyright file="Event.cs" company="AdminCore">
//   Unosquare
// </copyright>
// <summary>
//   Defines the Event type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace AdminCore.DAL.Models
{
  using System;
  using System.Collections.Generic;
  using System.ComponentModel.DataAnnotations;
  using System.ComponentModel.DataAnnotations.Schema;

  using Admincore.DAL.Models;

  /// <summary>
  /// The event.
  /// </summary>
  [Table("event")]
  public class Event
  {
    /// <summary>
    /// Gets or sets the event id.
    /// </summary>
    [Key]
    [Column("event_id")]
    public int EventId { get; set; }

    /// <summary>
    /// Gets or sets the employee.
    /// </summary>
    [ForeignKey("employee_id")]
    public int EmployeeId { get; set; }

    /// <summary>
    /// Gets or sets the date created.
    /// </summary>
    [Column("date_created")]
    public DateTime DateCreated { get; set; }

    /// <summary>
    /// Gets or sets the event status.
    /// </summary>
    [ForeignKey("event_status_id")]
    public int EventStatusId { get; set; }

    /// <summary>
    /// Gets or sets the event type.
    /// </summary>
    [ForeignKey("event_type_id")]
    public int EventTypeId { get; set; }

    /// <summary>
    /// Gets or sets the last modified.
    /// </summary>
    [Column("last_modified")]
    public DateTime LastModified { get; set; }
  }
}