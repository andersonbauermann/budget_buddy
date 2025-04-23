using BudgetBuddy_WebAPI.Application.Models;
using BudgetBuddy_WebAPI.Domain.Entities;

namespace BudgetBuddy_WebAPI.Application.Mapping;

public static class CategoryExtensions
{
    public static Category MapToEntity(this CategoryDto dto)
    {
        return new Category
        {
            Id = dto.Id ?? default,
            Description = dto.Description,
            Type = dto.Type,
            IsActive = dto.IsActive,
            Color = dto.Color
        };
    }

    public static CategoryDto MapToDto(this Category category)
    {
        return new CategoryDto
        {
            Id = category.Id,
            Description = category.Description,
            Type = category.Type,
            IsActive = category.IsActive,
            Color = category.Color  
        };
    }
}
