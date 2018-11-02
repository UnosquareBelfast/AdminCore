// --------------------------------------------------------------------------------------------------------------------
// <copyright file="EmployeeStatus.cs" company="Admincore">
//   Admincore
// </copyright>
// <summary>
//   The patient.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace Admincore.DAL.Models
{
  using System.ComponentModel.DataAnnotations;
  using System.ComponentModel.DataAnnotations.Schema;

  /// <summary>
  /// The patient.
  /// </summary>
  [Table("Employee_Status")]
  public class EmployeeStatus
  {
    /// <summary>
    /// Gets or sets the employee_status_id.
    /// </summary>
    [Key]
    [Column("employee_status_id")]
    public int EmployeeStatusId { get; set; }

    /// <summary>
    /// Gets or sets the description.
    /// </summary>
    [StringLength(50)]
    [Column("description")]
    public string Description { get; set; }
  }
}