using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdminCore.DAL.Models
{
  [Table("country")]
  public class Country
  {
    [Key]
    [Column("country_id")]
    public int CountryId { get; set; }
    
    [StringLength(50)]
    [Column("description")]
    public string Description { get; set; }
  }
}