// --------------------------------------------------------------------------------------------------------------------
// <copyright file="Holiday.cs" company="AdminCore">
//   Unosquare
// </copyright>
// <summary>
//   Defines the Holiday type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace AdminCore.DAL.Models
{
  using System.ComponentModel.DataAnnotations;
  using System.ComponentModel.DataAnnotations.Schema;

  /// <summary>
  /// The client.
  /// </summary>
  [Table("client")]
  public class Holiday
  {
    /// <summary>
    /// Gets or sets the client id.
    /// </summary>
    [Key]
    [Column("client_id")]
    public int ClientId { get; set; }

    /// <summary>
    /// Gets or sets the client name.
    /// </summary>
    [StringLength(50)]
    [Column("client_name")]
    public string ClientName { get; set; }
  }
}