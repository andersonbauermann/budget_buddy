namespace BudgetBuddy_WebAPI.Application.Models;

public record CategoryDto
{
    public string Description { get; set; }
    public bool IsActive { get; set; }
}
