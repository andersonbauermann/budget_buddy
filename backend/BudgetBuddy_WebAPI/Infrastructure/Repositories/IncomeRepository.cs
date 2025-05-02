using BudgetBuddy_WebAPI.Application.Interfaces;
using BudgetBuddy_WebAPI.Domain.Entities;
using BudgetBuddy_WebAPI.Infrastructure.Context;

namespace BudgetBuddy_WebAPI.Infrastructure.Repositories;

public class IncomeRepository(AppDbContext context) : Repository<Income>(context), IIncomeRepository
{
}
