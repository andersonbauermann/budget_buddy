using System.Linq.Expressions;

namespace BudgetBuddy_WebAPI.Application.Interfaces;

public interface IRepository<T>
{
    Task<bool> ExistsAsync(Expression<Func<T, bool>> predicate);
    Task<IEnumerable<T>> GetAllAsync();
    Task<T?> GetAsync(Expression<Func<T, bool>> predicate);
    T Create(T entity);
    T Update(T entity);
    T Delete(T entity);
}
