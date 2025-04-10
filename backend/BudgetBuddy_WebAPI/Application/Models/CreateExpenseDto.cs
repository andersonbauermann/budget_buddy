﻿namespace BudgetBuddy_WebAPI.Application.Models;

public record CreateExpenseDto
{
    public int CategoryId { get; set; }
    public string Description { get; set; }
    public decimal Value { get; set; }
    public DateTime Date { get; set; }
    public bool Paid { get; set; }
    public int Installments { get; set; }
}
