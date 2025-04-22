using BudgetBuddy_WebAPI.Application.Interfaces;
using BudgetBuddy_WebAPI.Application.Mapping;
using BudgetBuddy_WebAPI.Application.Models;
using BudgetBuddy_WebAPI.Application.Services.Base;
using BudgetBuddy_WebAPI.Domain.Entities;
using FluentResults;

namespace BudgetBuddy_WebAPI.Application.Services.Expense;

public class CreateExpenseService(IUnitOfWork uow) 
    : ServiceBase<ExpenseDto, Result<string>>
{
    private readonly IUnitOfWork _unitOfWork = uow;

    public async override Task<Result<string>> Execute(ExpenseDto input)
    {
        if (input.Installments <= 0)
        {
            return Result.Fail<string>("O número de prestações deve ser maior do que 0");
        }

        var category = await _unitOfWork.CategoryRepository.GetAsync(category => category.Id == input.CategoryId);

        if (category is null)
        {
            return Result.Fail<string>("Não existe nenhuma categoria cadastrada com esse Id.");
        }

        // TODO implementar beginTransaction
        if (!input.Id.HasValue)
        {
            var expense = input.MapToEntity();
            var expenseCreated = _unitOfWork.ExpenseRepository.Create(expense);
            await _unitOfWork.CommitAsync();

            for (var i = 0; i <= input.Installments; i++)
            {
                var expenseIntallment = new ExpenseInstallment
                {
                    ExpenseId = expense.Id,
                    Date = i == 0 ? input.Date : input.Date.AddMonths(i),
                };
               
                _unitOfWork.ExpenseInstallmentRepository.Create(expenseIntallment);
            }

            await _unitOfWork.CommitAsync();
        }

        return Result.Ok();
    }
}
