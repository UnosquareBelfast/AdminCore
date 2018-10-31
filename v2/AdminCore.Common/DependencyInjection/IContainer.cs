// --------------------------------------------------------------------------------------------------------------------
// <copyright file="IContainer.cs" company="Admincore">
//   Admincore
// </copyright>
// <summary>
//   Defines the IContainer type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace Admincore.Common.DependencyInjection
{
  /// <summary>
  /// The Container interface.
  /// </summary>
  public interface IContainer
  {
    /// <summary>
    /// The get instance.
    /// </summary>
    /// <typeparam name="T">
    /// </typeparam>
    /// <returns>
    /// The <see cref="T"/>.
    /// </returns>
    T GetInstance<T>() where T : class;
  }
}
