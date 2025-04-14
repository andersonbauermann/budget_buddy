using BudgetBuddy_WebAPI.Application.Interfaces;
using BudgetBuddy_WebAPI.Domain.Entities;
using BudgetBuddy_WebAPI.Infrastructure.Context;

namespace BudgetBuddy_WebAPI.Infrastructure.Repositories;

public class CategoryRepository(AppDbContext context) : Repository<Category>(context), ICategoryRepository
{
    public async Task<IEnumerable<Category>> GetCategoriesAsync()
    {
        return await GetAllAsync();
    }
}
