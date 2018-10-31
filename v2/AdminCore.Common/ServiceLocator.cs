// --------------------------------------------------------------------------------------------------------------------
// <copyright file="ServiceLocator.cs" company="Admincore">
//   Admincore
// </copyright>
// <summary>
//   Defines the ServiceLocator type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace Admincore.Common
{
  using Admincore.Common.DependencyInjection;

  /// <summary>
  /// The service locator.
  /// </summary>
  public static class ServiceLocator
  {
    /// <summary>
    /// Gets or sets the instance.
    /// </summary>
    public static IContainer Instance { get; set; }
  }
}
