using BudgetBuddy_WebAPI.Application.Models;
using BudgetBuddy_WebAPI.Domain.Entities;

namespace BudgetBuddy_WebAPI.Application.Mapping;

public static class ExpenseMap
{
    public static CreateExpenseDto MapToDto(this Expense input)
    {
        return new CreateExpenseDto
        {
            CategoryId = input.CategoryId,
            Description = input.Description,
            Value = input.Value,
            Date = input.Date
        };
    }

    public static Expense MapToEntity(this CreateExpenseDto input)
    {
        throw new NotImplementedException();
    }
}
