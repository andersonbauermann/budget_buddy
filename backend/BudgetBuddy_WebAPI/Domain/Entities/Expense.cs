using System.Text.Json.Serialization;

namespace BudgetBuddy_WebAPI.Domain.Entities;

public class Expense
{
    public int Id { get; set; }
    public int CategoryId { get; set; }
    public string Description { get; set; }
    public decimal Value { get; set; }

    [JsonIgnore]
    public virtual Category? Category { get; set; }
}
