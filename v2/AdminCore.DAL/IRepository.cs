// --------------------------------------------------------------------------------------------------------------------
// <copyright file="IRepository.cs" company="Admincore">
//   Admincore
// </copyright>
// <summary>
//   Defines the IRepository type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace Admincore.DAL
{
  using System;
  using System.Collections.Generic;
  using System.Linq.Expressions;

  /// <summary>
  /// The Repository interface.
  /// </summary>
  /// <typeparam name="T">
  /// </typeparam>
  public interface IRepository<T>
  {
    /// <summary>
    /// The get.
    /// </summary>
    /// <param name="filter">
    /// The filter.
    /// </param>
    /// <returns>
    /// The <see cref="IList"/>.
    /// </returns>
    IList<T> Get(Expression<Func<T, bool>> filter = null);

    /// <summary>
    /// The insert.
    /// </summary>
    /// <param name="entity">
    /// The entity.
    /// </param>
    /// <returns>
    /// The <see cref="T"/>.
    /// </returns>
    T Insert(T entity);

    /// <summary>
    /// The get by id.
    /// </summary>
    /// <param name="id">
    /// The id.
    /// </param>
    /// <returns>
    /// The <see cref="T"/>.
    /// </returns>
    T GetById(object id);
  }
}