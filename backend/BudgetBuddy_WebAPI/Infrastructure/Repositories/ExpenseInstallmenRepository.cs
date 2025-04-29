using BudgetBuddy_WebAPI.Application.Interfaces;
using BudgetBuddy_WebAPI.Domain.Entities;
using BudgetBuddy_WebAPI.Infrastructure.Context;
using BudgetBuddy_WebAPI.Shared.Extensions;
using Microsoft.EntityFrameworkCore;

namespace BudgetBuddy_WebAPI.Infrastructure.Repositories;

public class ExpenseInstallmenRepository(AppDbContext context)
    : Repository<ExpenseInstallment>(context), IExpenseInstallmentRepository
{
    public async Task InactiveRangeAsync(List<int> ids)
    {
        if (ids.IsNullOrEmpty())
            throw new ArgumentException("A lista de IDs não pode estar vazia.");

        var expenses = await _context.ExpensesInstallments
            .Where(e => ids.Contains(e.Id))
            .ToListAsync();

        if (expenses.Count == 0)
            return;

        foreach (var expense in expenses)
        {
            expense.IsActive = false;
        }
    }
}
