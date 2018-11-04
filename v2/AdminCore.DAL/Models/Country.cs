// --------------------------------------------------------------------------------------------------------------------
// <copyright file="Country.cs" company="Admincore">
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
  /// The country.
  /// </summary>
  [Table("country")]
  public class Country
  {
    /// <summary>
    /// Gets or sets the country id.
    /// </summary>
    [Key]
    [Column("country_id")]
    public int CountryId { get; set; }

    /// <summary>
    /// Gets or sets the description.
    /// </summary>
    [StringLength(50)]
    [Column("description")]
    public string Description { get; set; }
  }
}