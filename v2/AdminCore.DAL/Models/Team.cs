// --------------------------------------------------------------------------------------------------------------------
// <copyright file="Team.cs" company="AdminCore">
//   Unosquare
// </copyright>
// <summary>
//   Defines the Team type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace AdminCore.DAL.Models
{
  using System.ComponentModel.DataAnnotations;
  using System.ComponentModel.DataAnnotations.Schema;

  /// <summary>
  /// The team.
  /// </summary>
  [Table("team")]
  public class Team
  {
    /// <summary>
    /// Gets or sets the team id.
    /// </summary>
    [Key]
    [Column("team_id")]
    public int TeamId { get; set; }

    /// <summary>
    /// Gets or sets the client id.
    /// </summary>
    [Column("client_id")]
    public int ClientId { get; set; }

    /// <summary>
    /// Gets or sets the client.
    /// </summary>
    [ForeignKey("ClientId")]
    public Client Client { get; set; }

    /// <summary>
    /// Gets or sets the team name.
    /// </summary>
    [Column("team_name")]
    public string TeamName { get; set; }

    /// <summary>
    /// Gets or sets the contact email.
    /// </summary>
    [Column("contact_email")]
    public string ContactEmail { get; set; }

    /// <summary>
    /// Gets or sets the contact name.
    /// </summary>
    [Column("contact_name")]
    public string ContactName { get; set; }
  }
}