using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdminCore.DAL.Models
{
  [Table("contract")]
  public class Contract : ISoftDeletable
  {
    [Key]
    [Column("contract_id")]
    public int ContractId { get; set; }

    [Column("team_id")]
    public int TeamId { get; set; }

    [Column("employee_id")]
    public int EmployeeId { get; set; }

    [Column("start_date")]
    public DateTime StartDate { get; set; }

    [Column("end_date")] 
    public DateTime? EndDate { get; set; }
    
    [ForeignKey("EmployeeId")]
    public Employee Employee { get; set; }
    
    [ForeignKey("TeamId")]
    public Team Team { get; set; }
  }
}