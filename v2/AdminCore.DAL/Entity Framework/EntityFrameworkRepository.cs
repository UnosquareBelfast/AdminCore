// --------------------------------------------------------------------------------------------------------------------
// <copyright file="EntityFrameworkRepository.cs" company="AdminCore">
//   AdminCore
// </copyright>
// <summary>
//   Defines the EntityFrameworkRepository type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace AdminCore.DAL.Entity_Framework
{
  using Microsoft.EntityFrameworkCore;
  using System;
  using System.Collections.Generic;
  using System.Linq;
  using System.Linq.Expressions;

  /// <summary>
  /// The entity framework repository.
  /// </summary>
  /// <typeparam name="T">
  /// </typeparam>
  public class EntityFrameworkRepository<T> : IRepository<T>
    where T : class
  {
    /// <summary>
    /// The _db set.
    /// </summary>
    private readonly DbSet<T> _dbSet;

    public EntityFrameworkRepository(IDatabaseContext databaseContext)
    {
      _dbSet = ((EntityFrameworkContext)databaseContext).Set<T>();
    }

    /// <summary>
    /// The get.
    /// </summary>
    /// <param name="filter">
    /// The filter.
    /// </param>
    /// <returns>
    /// The <see cref="IList"/>.
    /// </returns>
    public IList<T> Get(Expression<Func<T, bool>> filter = null)
    {
      var queryableData = _dbSet.AsQueryable();

      if (filter != null)
      {
        queryableData = queryableData.Where(filter);
      }

      return queryableData.ToList();
    }

    /// <summary>
    /// The get by id.
    /// </summary>
    /// <param name="id">
    /// The id.
    /// </param>
    /// <returns>
    /// The <see cref="T"/>.
    /// </returns>
    public T GetById(object id)
    {
      return _dbSet.Find(id);
    }

    /// <summary>
    /// The insert.
    /// </summary>
    /// <param name="entity">
    /// The entity.
    /// </param>
    /// <returns>
    /// The <see cref="T"/>.
    /// </returns>
    public T Insert(T entity)
    {
      return _dbSet.Add(entity)?.Entity;
    }
  }
}