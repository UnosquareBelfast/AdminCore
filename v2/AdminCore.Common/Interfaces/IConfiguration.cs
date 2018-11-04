// --------------------------------------------------------------------------------------------------------------------
// <copyright file="IConfiguration.cs" company="AdminCore">
//   Unosquare
// </copyright>
// <summary>
//   Defines the IConfiguration type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace Admincore.Common.Interfaces
{
  /// <summary>
  /// The Configuration interface.
  /// </summary>
  public interface IConfiguration
  {
    /// <summary>
    /// The retrieve connection string.
    /// </summary>
    /// <returns>
    /// The <see cref="string"/>.
    /// </returns>
    string RetrieveConnectionString();
  }
}