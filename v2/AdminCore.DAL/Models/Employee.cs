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
  using System.ComponentModel.DataAnnotations;
  using System.ComponentModel.DataAnnotations.Schema;

  /// <summary>
  /// The patient.
  /// </summary>
  [Table("employee")]
  public class Employee
  {
    /// <summary>
    /// Gets or sets the employee id.
    /// </summary>
    [Key]
    [Column("employee_id")]
    public int EmployeeId { get; set; }

    /// <summary>
    /// Gets or sets the name.
    /// </summary>
    [StringLength(50)]
    [Column("forename")]
    public string Forename { get; set; }

    /// <summary>
    /// Gets or sets the surname.
    /// </summary>
    [StringLength(50)]
    [Column("surname")]
    public string Surname { get; set; }

    /// <summary>
    /// Gets or sets the password.
    /// </summary>
    [StringLength(50)]
    [Column("password")]
    public string Password { get; set; }

    /// <summary>
    /// Gets or sets the email.
    /// </summary>
    [StringLength(50)]
    [Column("email")]
    public string Email { get; set; }
  }
}
