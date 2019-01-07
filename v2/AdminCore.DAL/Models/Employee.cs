using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdminCore.DAL.Models
{
  [Table("employee")]
  public class Employee : ISoftDeletable
  {  
    [Key]
    [Column("employee_id")]
    public int EmployeeId { get; set; }

    [Column("country_id")]
    public int CountryId { get; set; }

    [Column("email")]
    public string Email { get; set; }

    [Column("employee_role_id")]
    public int EmployeeRoleId { get; set; }

    [Column("employee_status_id")]
    public int EmployeeStatusId { get; set; }

    [StringLength(50)]
    [Column("forename")]
    public string Forename { get; set; }

    [StringLength(50)]
    [Column("password")]
    public string Password { get; set; }

    [Column("start_date")]
    public DateTime StartDate { get; set; }

    [StringLength(50)]
    [Column("surname")]
    public string Surname { get; set; }

    [Column("total_holidays")]
    public int TotalHolidays { get; set; }

    [ForeignKey("CountryId")]
    public virtual Country Country { get; set; }
    
    [ForeignKey("EmployeeRoleId")]
    public virtual EmployeeRole EmployeeRole { get; set; }
    
    [ForeignKey("EmployeeStatusId")]
    public virtual EmployeeStatus EmployeeStatus { get; set; }
  }
}