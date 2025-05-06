using BudgetBuddy_WebAPI.Application.Models;
using BudgetBuddy_WebAPI.Domain.Entities;

namespace BudgetBuddy_WebAPI.Application.Mapping;

public static class IncomeExtensions
{
    public static IncomeDto MapToDto(this Income income)
    {
        return new IncomeDto
        {
            Id = income.Id,
            CategoryId = income.CategoryId,
            Description = income.Description,
            Value = income.Value,
            Date = income.Date,
            Received = income.Received,
            IsActive = income.IsActive
        };
    }

    public static Income MapToEntity(this IncomeDto dto)
    {
        return new Income
        {
            Id = dto.Id ?? default,
            CategoryId = dto.CategoryId,
            Description = dto.Description,
            Value = dto.Value,
            Date = dto.Date,
            Received = dto.Received,
            IsActive = dto.IsActive
        };
    }
}
