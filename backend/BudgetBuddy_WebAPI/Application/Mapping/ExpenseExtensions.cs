using BudgetBuddy_WebAPI.Application.Models;
using BudgetBuddy_WebAPI.Domain.Entities;

namespace BudgetBuddy_WebAPI.Application.Mapping;

public static class ExpenseExtensions
{
    public static ExpenseDto MapToDto(this Expense input)
    {
        return new ExpenseDto
        {
            Id = input.Id,
            CategoryId = input.CategoryId,
            Description = input.Description,
            Value = input.Value,
        };
    }

    public static Expense MapToEntity(this ExpenseDto input)
    {
        return new Expense
        {
            Id = input.Id ?? default,
            CategoryId = input.CategoryId,
            Description = input.Description,
            Value = input.Value
        };
    }
}