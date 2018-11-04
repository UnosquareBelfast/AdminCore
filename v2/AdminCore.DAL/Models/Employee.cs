// --------------------------------------------------------------------------------------------------------------------
// <copyright file="Employee.cs" company="Admincore">
//   Admincore
// </copyright>
// <summary>
//   The patient.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace Admincore.DAL.Models
{
  using System;
  using System.ComponentModel.DataAnnotations;
  using System.ComponentModel.DataAnnotations.Schema;

  /// <summary>
  /// The patient.
  /// </summary>
  [Table("employee")]
  public class Employee
  {
    /// <summary>
    /// Gets or sets the country.
    /// </summary>
    [ForeignKey("country_id")]
    public Country Country { get; set; }

    /// <summary>
    /// Gets or sets the email.
    /// </summary>
    [Column("email")]
    public string Email { get; set; }

    /// <summary>
    /// Gets or sets the employee id.
    /// </summary>
    [Key]
    [Column("employee_id")]
    public int EmployeeId { get; set; }

    /// <summary>
    /// Gets or sets the employeeRole
    /// </summary>
    [ForeignKey("employee_role_id")]
    public EmployeeRole EmployeeRole { get; set; }

    /// <summary>
    /// Gets or sets the employeeStatus
    /// </summary>
    [ForeignKey("employee_status_id")]
    public EmployeeStatus EmployeeStatus { get; set; }

    /// <summary>
    /// Gets or sets the name.
    /// </summary>
    [StringLength(50)]
    [Column("forename")]
    public string Forename { get; set; }

    /// <summary>
    /// Gets or sets the password.
    /// </summary>
    [StringLength(50)]
    [Column("password")]
    public string Password { get; set; }

    /// <summary>
    /// Gets or sets the startDate
    /// </summary>
    [Column("start_date")]
    public DateTime StartDate { get; set; }

    /// <summary>
    /// Gets or sets the surname.
    /// </summary>
    [StringLength(50)]
    [Column("surname")]
    public string Surname { get; set; }

    /// <summary>
    /// Gets or sets the totalHolidays
    /// </summary>
    [Column("total_holidays")]
    public int TotalHolidays { get; set; }
  }
}