// --------------------------------------------------------------------------------------------------------------------
// <copyright file="ServiceLocator.cs" company="AdminCore">
//   AdminCore
// </copyright>
// <summary>
//   Defines the ServiceLocator type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using AdminCore.Common.DependencyInjection;

namespace AdminCore.Common
{
  /// <summary>
  ///   The service locator.
  /// </summary>
  public static class ServiceLocator
  {
    /// <summary>
    ///   Gets or sets the instance.
    /// </summary>
    public static IContainer Instance { get; set; }
  }
}