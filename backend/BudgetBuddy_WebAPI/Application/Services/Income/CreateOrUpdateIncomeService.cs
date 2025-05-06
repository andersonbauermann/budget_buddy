using BudgetBuddy_WebAPI.Application.Interfaces;
using BudgetBuddy_WebAPI.Application.Mapping;
using BudgetBuddy_WebAPI.Application.Models;
using BudgetBuddy_WebAPI.Application.Services.Base;
using FluentResults;

namespace BudgetBuddy_WebAPI.Application.Services.Income;

public class CreateOrUpdateIncomeService(IUnitOfWork uow)
    : ServiceBase<IncomeDto, Result<string>>(uow)
{
    public async override Task<Result<string>> Execute(IncomeDto input)
    {
        var category = await _unitOfWork.CategoryRepository.GetAsync(category => category.Id == input.CategoryId);

        if (category is null)
        {
            return Result.Fail<string>("Não existe nenhuma categoria cadastrada com esse Id.");
        }

        if (!input.Id.HasValue)
        {
            var income = input.MapToEntity();
            var incomeCreated = _unitOfWork.IncomeRepository.Create(income);
        } 
        else
        {
            var existing = await _unitOfWork.IncomeRepository.GetAsync(i => i.Id == input.Id.Value);

            if (existing is null)
                return Result.Fail<string>("Receita não encontrada.");

            existing.Description = input.Description;
            existing.Value = input.Value;
            existing.Date = input.Date;
            existing.Received = input.Received;
            existing.CategoryId = input.CategoryId;
            existing.IsActive = input.IsActive;
        }

        await _unitOfWork.CommitAsync();
        return Result.Ok();
    }
}
