using static BudgetBuddy_WebAPI.Domain.Entities.Category;

namespace BudgetBuddy_WebAPI.Application.Models;

public record CategoryDto
{
    public int? Id { get; set; }
    public string Description { get; set; }
    public CategoryType Type { get; set; }
    public bool IsActive { get; set; }
}
