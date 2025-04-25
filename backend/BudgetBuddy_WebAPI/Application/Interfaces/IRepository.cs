using System.Linq.Expressions;

namespace BudgetBuddy_WebAPI.Application.Interfaces;

public interface IRepository<T>
{
    Task<bool> ExistsAsync(Expression<Func<T, bool>> predicate);
    Task<IEnumerable<T>> GetAllAsync(bool onlyActives = false, params Expression<Func<T, object>>[] includes);
    Task<T?> GetAsync(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includes);
    T Create(T entity);
    T Update(T entity);
    T Delete(T entity);
}
