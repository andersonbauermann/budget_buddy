namespace BudgetBuddy_WebAPI.Application.Models;

public record IncomeDto
{
    public int? Id { get; set; }
    public int CategoryId { get; set; }
    public string Description { get; set; }
    public decimal Value { get; set; }
    public DateTime Date { get; set; }
    public bool Received { get; set; }
    public bool IsActive { get; set; }
}
