// --------------------------------------------------------------------------------------------------------------------
// <copyright file="Client.cs" company="AdminCore">
//   Unosquare
// </copyright>
// <summary>
//   Defines the Client type.
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
  public class Client
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