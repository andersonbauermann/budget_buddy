using BudgetBuddy_WebAPI.Application.Interfaces;
using BudgetBuddy_WebAPI.Application.Mapping;
using BudgetBuddy_WebAPI.Application.Models;
using BudgetBuddy_WebAPI.Application.Services.Base;
using BudgetBuddy_WebAPI.Application.Utils;
using FluentResults;

namespace BudgetBuddy_WebAPI.Application.Services.Expense;

public class FilterExpenseByDateService(IUnitOfWork uof) : ServiceBase<FilterExpenseByDateService.Input, Result<IEnumerable<ExpenseDto>>>
{
    public record Input(int Month, int Year);

    private readonly IUnitOfWork _unitOfWork = uof;

    public async override Task<Result<IEnumerable<ExpenseDto>>> Execute(Input input)
    {
        if (!ValidateInput.IsValidMonth(input.Month) || !ValidateInput.IsValidMonth(input.Year))
        {
            return Result.Fail<IEnumerable<ExpenseDto>>("O ano ou o mês informados são inválidos.");
        }

        var expenses = await _unitOfWork.ExpenseRepository.GetFilteredExpense(input.Month, input.Year);
        return  Result.Ok(expenses.Select(expense => expense.MapToDto()));
    }
}