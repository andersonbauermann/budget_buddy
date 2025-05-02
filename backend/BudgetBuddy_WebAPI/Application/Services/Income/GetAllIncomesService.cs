using BudgetBuddy_WebAPI.Application.Interfaces;
using BudgetBuddy_WebAPI.Application.Mapping;
using BudgetBuddy_WebAPI.Application.Models;
using BudgetBuddy_WebAPI.Application.Services.Base;
using FluentResults;

namespace BudgetBuddy_WebAPI.Application.Services.Income;

public class GetAllIncomesService(IUnitOfWork uof)
    : ServiceBase<GetAllIncomesService.Input, Result<IEnumerable<IncomeDto>>>(uof)
{
    public async override Task<Result<IEnumerable<IncomeDto>>> Execute(Input input)
    {
        var incomes = await _unitOfWork.IncomeRepository
           .GetAllAsync() ?? [];

        return Result.Ok(incomes.Select(income => income.ToDto()));
    }

    public record Input();
}
