namespace BudgetBuddy_WebAPI.Application.Models;

public record ExpenseWithInstallmentDto
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public bool Paid { get; set; }
    public int ExpenseId { get; set; }
    public int CategoryId { get; set; }
    public string Description { get; set; }
    public decimal Value { get; set; }
}
