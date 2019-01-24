using System.Collections.Generic;
using AdminCore.DAL.Models.Base;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdminCore.DAL.Models
{
  [Table("client")]
  public class Client : ISoftDeletable
  {
    [Key]
    [Column("client_id")]
    public int ClientId { get; set; }

    [StringLength(50)]
    [Column("client_name")]
    public string ClientName { get; set; }

    [ForeignKey("TeamId")]
    public virtual ICollection<Team> Teams { get; set; }
  }
}