using System.Text.Json.Serialization;

namespace BudgetBuddy_WebAPI.Domain.Entities
{
    public class ExpenseInstallment
    {
        public int Id { get; set; }
        public int ExpenseId { get; set; }
        public DateTime Date { get; set; }
        public bool Paid { get; set; }

        [JsonIgnore]
        public Expense Expense { get; set; }
    }
}
