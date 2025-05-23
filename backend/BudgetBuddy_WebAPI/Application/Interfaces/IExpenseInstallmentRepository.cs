﻿using BudgetBuddy_WebAPI.Domain.Entities;

namespace BudgetBuddy_WebAPI.Application.Interfaces;

public interface IExpenseInstallmentRepository : IRepository<ExpenseInstallment>
{
    Task InactiveRangeAsync(List<int> ids);
}
