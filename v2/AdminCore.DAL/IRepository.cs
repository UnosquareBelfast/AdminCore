using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace AdminCore.DAL
{
  public interface IRepository<T>
  {
    void Delete(object id);

    void Delete(T entityToDelete);

    IList<T> Get(Expression<Func<T, bool>> filter = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
        params Expression<Func<T, object>>[] includeProperties);

    T GetSingle(Expression<Func<T, bool>> filter = null, params Expression<Func<T, object>>[] includes);

    IQueryable<T> GetAsQueryable(Expression<Func<T, bool>> filter = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
        params Expression<Func<T, object>>[] includes);

    T Insert(T entity);

    void Update(T entityToUpdate);
  }
}