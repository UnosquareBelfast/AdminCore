// --------------------------------------------------------------------------------------------------------------------
// <copyright file="EntityFrameworkRepository.cs" company="AdminCore">
//   AdminCore
// </copyright>
// <summary>
//   Defines the EntityFrameworkRepository type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace AdminCore.DAL.Entity_Framework
{
  /// <summary>
  ///   The entity framework repository.
  /// </summary>
  /// <typeparam name="T">
  /// </typeparam>
  public class EntityFrameworkRepository<T> : IRepository<T>
    where T : class
  {
    private readonly IDatabaseContext _context;
    private readonly DbSet<T> _dbSet;

    public EntityFrameworkRepository(IDatabaseContext databaseContext)
    {
      _context = databaseContext;
      _dbSet = ((EntityFrameworkContext) databaseContext).Set<T>();
    }
    
    public void Delete(object id)
    {
      var entityToDelete = _dbSet.Find(id);
      Delete(entityToDelete);
    }

    public void Delete(T entityToDelete)
    {
      if (((EntityFrameworkContext) _context).Entry(entityToDelete).State == EntityState.Detached)
      {
        _dbSet.Attach(entityToDelete);
      }

      _dbSet.Remove(entityToDelete);
    }

    public IList<T> Get(Expression<Func<T, bool>> filter = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, params Expression<Func<T, object>>[] includeProperties)
    {
      return GetAsQueryable(filter, orderBy, includeProperties).ToList();
    }

    public T GetSingle(Expression<Func<T, bool>> filter = null, params Expression<Func<T, object>>[] includes)
    {
      var query = GetAsQueryable(filter, null, includes);

      return query.SingleOrDefault();
    }
    
    public T Insert(T entity)
    {
      return _dbSet.Add(entity)?.Entity;
    }
    
    public IQueryable<T> GetAsQueryable(Expression<Func<T, bool>> filter = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, params Expression<Func<T, object>>[] includes)
    {
      var queryableData = _dbSet.AsQueryable();

      if (filter != null)
      {
        queryableData = queryableData.Where(filter);
      }

      queryableData = IncludeEntities(queryableData, includes);


      if (orderBy != null)
      {
        queryableData = queryableData.OrderBy(x => orderBy);
      }

      return queryableData;
    }
    
    public void Update(T entityToUpdate)
    {
      _dbSet.Attach(entityToUpdate);
      ((EntityFrameworkContext) _context).Entry(entityToUpdate).State = EntityState.Modified;
    }
    
    public IQueryable<T> IncludeEntities(IQueryable<T> query, Expression<Func<T, object>>[] includeProperties)
    {
      if (includeProperties != null)
      {
        foreach (var includeProperty in includeProperties)
        {
          query = query.Include(includeProperty);
        }
      }

      return query;
    }
  }
}