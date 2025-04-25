namespace BudgetBuddy_WebAPI.Domain.Entities;

public class Category : IActivable
{
    public enum CategoryType
    {
        Expense = 1,
        Revenue
    }

    public int Id { get; set; }
    public string Description { get; set; }
    public CategoryType Type { get; set; }
    public bool IsActive { get; set; }
    public string Color { get; set; }
}
