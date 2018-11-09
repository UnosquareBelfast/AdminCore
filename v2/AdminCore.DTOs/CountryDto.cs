// --------------------------------------------------------------------------------------------------------------------
// <copyright file="CountryDto.cs" company="AdminCore">
//   Unosquare
// </copyright>
// <summary>
//   Defines the CountryDto type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace AdminCore.DTOs
{
  /// <summary>
  ///   The country dto.
  /// </summary>
  public class CountryDto
  {
    /// <summary>
    ///   Gets or sets the country code id.
    /// </summary>
    public int CountryId { get; set; }

    /// <summary>
    ///   Gets or sets the description.
    /// </summary>
    public string Description { get; set; }
  }
}