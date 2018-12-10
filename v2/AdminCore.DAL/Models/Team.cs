using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdminCore.DAL.Models
{
  [Table("team")]
  public class Team
  {
    [Key]
    [Column("team_id")]
    public int TeamId { get; set; }

    [Column("client_id")]
    public int ClientId { get; set; }

    [Column("team_name")]
    public string TeamName { get; set; }

    [Column("contact_email")]
    public string ContactEmail { get; set; }

    [Column("contact_name")]
    public string ContactName { get; set; }
    
    [ForeignKey("ClientId")]
    public virtual Client Client { get; set; }
  }
}