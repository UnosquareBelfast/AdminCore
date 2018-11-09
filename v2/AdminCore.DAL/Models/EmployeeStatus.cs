// --------------------------------------------------------------------------------------------------------------------
// <copyright file="EmployeeStatus.cs" company="AdminCore">
//   AdminCore
// </copyright>
// <summary>
//   The patient.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdminCore.DAL.Models
{
  /// <summary>
  ///   The patient.
  /// </summary>
  [Table("employee_status")]
  public class EmployeeStatus
  {
    /// <summary>
    ///   Gets or sets the description.
    /// </summary>
    [StringLength(50)]
    [Column("description")]
    public string Description { get; set; }

    /// <summary>
    ///   Gets or sets the employee_status_id.
    /// </summary>
    [Key]
    [Column("employee_status_id")]
    public int EmployeeStatusId { get; set; }
  }
}