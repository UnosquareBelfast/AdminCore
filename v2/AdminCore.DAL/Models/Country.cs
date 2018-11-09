// --------------------------------------------------------------------------------------------------------------------
// <copyright file="Country.cs" company="AdminCore">
//   AdminCore
// </copyright>
// <summary>
//   The patient.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdminCore.DAL.Models
{
  /// <summary>
  ///   The country.
  /// </summary>
  [Table("country")]
  public class Country
  {
    /// <summary>
    ///   Gets or sets the country id.
    /// </summary>
    [Key]
    [Column("country_id")]
    public int CountryId { get; set; }

    /// <summary>
    ///   Gets or sets the description.
    /// </summary>
    [StringLength(50)]
    [Column("description")]
    public string Description { get; set; }
  }
}