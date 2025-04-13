using BudgetBuddy_WebAPI.Application.Interfaces;
using BudgetBuddy_WebAPI.Application.Models;
using BudgetBuddy_WebAPI.Application.Services.Base;
using static BudgetBuddy_WebAPI.Application.Services.Expense.CreateExpenseService;

namespace BudgetBuddy_WebAPI.Application.Services.Expense;

public class CreateExpenseService(IUnitOfWork uow, IExpenseRepository expenseRepo) 
    : ServiceBase<CreateExpenseDto, Result>
{
    public record Result();

    private readonly IExpenseRepository _expenseRepository = expenseRepo;
    private readonly IUnitOfWork _unitOfWork = uow;

    public override Task<Result> Execute(CreateExpenseDto input)
    {
        throw new NotImplementedException();
    }
}
