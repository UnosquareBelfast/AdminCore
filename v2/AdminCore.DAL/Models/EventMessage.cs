// --------------------------------------------------------------------------------------------------------------------
// <copyright file="EventMessage.cs" company="AdminCore">
//   Unosquare
// </copyright>
// <summary>
//   Defines the EventMessage type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace AdminCore.DAL.Models
{
  using System;
  using System.ComponentModel.DataAnnotations;
  using System.ComponentModel.DataAnnotations.Schema;

  /// <summary>
  /// The event message.
  /// </summary>
  [Table("event_message")]
  public class EventMessage
  {
    /// <summary>
    /// Gets or sets the event message id.
    /// </summary>
    [Key]
    [Column("employee_message_id")]
    public int EventMessageId { get; set; }

    /// <summary>
    /// Gets or sets the event id.
    /// </summary>
    [ForeignKey("event_id")]
    public int EventId { get; set; }

    /// <summary>
    /// Gets or sets the message.
    /// </summary>
    [Column("message")]
    public string Message { get; set; }

    /// <summary>
    /// Gets or sets the event message type id.
    /// </summary>
    [ForeignKey("event_message_type_id")]
    public int EventMessageTypeId { get; set; }

    /// <summary>
    /// Gets or sets the last modified.
    /// </summary>
    [Column("last_modified")]
    public DateTime LastModified { get; set; }

    /// <summary>
    /// Gets or sets the employee id.
    /// </summary>
    [ForeignKey("employee_id")]
    public int EmployeeId { get; set; }
  }
}