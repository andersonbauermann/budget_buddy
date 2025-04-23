using BudgetBuddy_WebAPI.Application.Models;
using BudgetBuddy_WebAPI.Domain.Entities;

namespace BudgetBuddy_WebAPI.Application.Mapping;

public static class ExpenseInstallmentExtensions
{
    public static IEnumerable<ExpenseWithInstallmentDto> ToFlatDto(this IEnumerable<ExpenseInstallment> expenses)
    {
        return expenses.Select(exp =>
        {
            return new ExpenseWithInstallmentDto
            {
                Id = exp.Id,
                Date = exp.Date,
                Paid = exp.Paid,
                ExpenseId = exp.ExpenseId,
                CategoryId = exp.Expense.CategoryId,
                Description = exp.Expense.Description,
                Value = exp.Expense.Value
            };
        });
    }
}
