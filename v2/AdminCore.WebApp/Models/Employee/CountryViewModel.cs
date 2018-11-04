// --------------------------------------------------------------------------------------------------------------------
// <copyright file="CountryViewModel.cs" company="AdminCore">
//   Unosquare
// </copyright>
// <summary>
//   Defines the CountryViewModel type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace AdminCore.WebApi.Models.Employee
{
  /// <summary>
  /// The country view model.
  /// </summary>
  public class CountryViewModel
  {
    /// <summary>
    /// Gets or sets the country id.
    /// </summary>
    public int CountryId { get; set; }

    /// <summary>
    /// Gets or sets the description.
    /// </summary>
    public string Description { get; set; }
  }
}