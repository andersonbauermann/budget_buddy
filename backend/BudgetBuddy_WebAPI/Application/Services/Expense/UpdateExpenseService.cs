using BudgetBuddy_WebAPI.Application.Interfaces;
using BudgetBuddy_WebAPI.Application.Models;
using BudgetBuddy_WebAPI.Application.Services.Base;
using FluentResults;

namespace BudgetBuddy_WebAPI.Application.Services.Expense;

public class UpdateExpenseService(IUnitOfWork uow) : ServiceBase<ExpenseWithInstallmentDto, Result<string>>(uow)
{
    public override async Task<Result<string>> Execute(ExpenseWithInstallmentDto input)
    {
        var expenseInstallment = await _unitOfWork.ExpenseInstallmentRepository
            .GetAsync(inst => inst.Id == input.Id, inst => inst.Expense);

        if (expenseInstallment is null)
            return Result.Fail<string>($"Não foi localizada nenhuma despesa com o id {input.Id}");

        bool isExpenseInstallmentUpdated = false;
        if (expenseInstallment.Date != input.Date)
        {
            expenseInstallment.Date = input.Date;
            isExpenseInstallmentUpdated = true;
        }

        if (expenseInstallment.Paid != input.Paid)
        {
            expenseInstallment.Paid = input.Paid;
            isExpenseInstallmentUpdated = true;
        }

        var expense = expenseInstallment.Expense;
        bool isExpenseUpdated = false;
        if (expense.CategoryId != input.CategoryId)
        {
            expense.CategoryId = input.CategoryId;
            isExpenseUpdated = true;
        }

        if (expense.Description != input.Description)
        {
            expense.Description = input.Description;
            isExpenseUpdated = true;
        }

        if (expense.Value != input.Value)
        {
            expense.Value = input.Value;
            isExpenseUpdated = true;
        }

        if (isExpenseInstallmentUpdated || isExpenseUpdated)
        {
            await _unitOfWork.CommitAsync();
        }

        return Result.Ok<string>("Despesa atualizada com sucesso.");
    }

}
