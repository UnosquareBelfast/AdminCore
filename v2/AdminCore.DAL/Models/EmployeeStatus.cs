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
  [Table("employee_status")]
  public class EmployeeStatus
  {
    [Key]
    [Column("employee_role_id")]
    public int EmployeeRoleId { get; set; }
    
    [StringLength(50)]
    [Column("description")]
    public string Description { get; set; }
  }
}