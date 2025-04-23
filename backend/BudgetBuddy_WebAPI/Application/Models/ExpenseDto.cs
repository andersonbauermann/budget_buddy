namespace BudgetBuddy_WebAPI.Application.Models;

public record ExpenseDto
{
    public int? Id { get; set; }
    public int CategoryId { get; set; }
    public string Description { get; set; }
    public decimal Value { get; set; }
    public DateTime Date { get; set; }
    public int Installments { get; set; } = 1;
}