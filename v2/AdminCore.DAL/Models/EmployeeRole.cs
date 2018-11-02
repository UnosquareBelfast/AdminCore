// --------------------------------------------------------------------------------------------------------------------
// <copyright file="EmployeeRole.cs" company="Admincore">
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
  [Table("Employee_Role")]
  public class EmployeeRole
  {
    /// <summary>
    /// Gets or sets the employee_role_id.
    /// </summary>
    [Key]
    [Column("employee_role_id")]
    public int EmployeeRoleId { get; set; }

    /// <summary>
    /// Gets or sets the description.
    /// </summary>
    [StringLength(50)]
    [Column("description")]
    public string Description { get; set; }
  }
}