using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdminCore.DAL.Models
{
  [Table("employee_role")]
  public class EmployeeRole
  {
    [Key]
    [Column("employee_role_id")]
    public int EmployeeRoleId { get; set; }
    
    [StringLength(50)]
    [Column("description")]
    public string Description { get; set; }
  }
}