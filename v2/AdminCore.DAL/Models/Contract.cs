// --------------------------------------------------------------------------------------------------------------------
// <copyright file="Contract.cs" company="AdminCore">
//   Unosquare
// </copyright>
// <summary>
//   Defines the Contract type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace AdminCore.DAL.Models
{
  using System;
  using System.ComponentModel.DataAnnotations;
  using System.ComponentModel.DataAnnotations.Schema;

  /// <summary>
  /// The contract.
  /// </summary>
  [Table("contract")]
  public class Contract
  {
    /// <summary>
    /// Gets or sets the contract id.
    /// </summary>
    [Key]
    [Column("contract_id")]
    public int ContractId { get; set; }

    /// <summary>
    /// Gets or sets the team.
    /// </summary>
    [Column("team_id")]
    public int TeamId { get; set; }

    /// <summary>
    /// Gets or sets the team.
    /// </summary>
    [ForeignKey("TeamId")]
    public Team Team { get; set; }

    /// <summary>
    /// Gets or sets the employee.
    /// </summary>
    [Column("employee_id")]
    public int EmployeeId { get; set; }

    /// <summary>
    /// Gets or sets the employee.
    /// </summary>
    [ForeignKey("EmployeeId")]
    public Employee Employee { get; set; }

    /// <summary>
    /// Gets or sets the start date.
    /// </summary>
    [Column("start_date")]
    public DateTime StartDate { get; set; }

    /// <summary>
    /// Gets or sets the end date.
    /// </summary>
    [Column("end_date")]
    public DateTime EndDate { get; set; }
  }
}