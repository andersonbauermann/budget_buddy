using System.Text.Json.Serialization;

namespace BudgetBuddy_WebAPI.Domain.Entities
{
    public class ExpenseInstallment : IActivable
    {
        public int Id { get; set; }
        public int ExpenseId { get; set; }
        public DateTime Date { get; set; }
        public bool Paid { get; set; }
        public bool IsActive { get; set; } = true;

        [JsonIgnore]
        public Expense? Expense { get; set; }
    }
}
