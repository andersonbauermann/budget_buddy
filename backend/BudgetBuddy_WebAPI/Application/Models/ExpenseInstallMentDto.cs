namespace BudgetBuddy_WebAPI.Application.Models;

public class ExpenseInstallmentDto
{
    public int Id { get; set; }
    public int ExpenseId { get; set; }
    public DateTime Date { get; set; }
    public bool Paid { get; set; }
}
