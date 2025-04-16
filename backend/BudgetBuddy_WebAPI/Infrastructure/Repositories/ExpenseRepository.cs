using BudgetBuddy_WebAPI.Application.Interfaces;
using BudgetBuddy_WebAPI.Domain.Entities;
using BudgetBuddy_WebAPI.Infrastructure.Context;

namespace BudgetBuddy_WebAPI.Infrastructure.Repositories;

public class ExpenseRepository(AppDbContext context) : Repository<Expense>(context), IExpenseRepository
{
    public async Task<IEnumerable<Expense>> GetFilteredExpense(int month, int year)
    {
        var expenses =  await GetAllAsync();
        return expenses.Where(e => e.Date.Month == month && e.Date.Year == year) ?? [];
    }
 }
