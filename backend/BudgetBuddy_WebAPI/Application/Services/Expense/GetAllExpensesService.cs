using BudgetBuddy_WebAPI.Application.Interfaces;
using BudgetBuddy_WebAPI.Application.Mapping;
using BudgetBuddy_WebAPI.Application.Models;
using BudgetBuddy_WebAPI.Application.Services.Base;
using FluentResults;

namespace BudgetBuddy_WebAPI.Application.Services.Expense
{
    public class GetAllExpensesService(IUnitOfWork uof) 
        : ServiceBase<GetAllExpensesService.Input, Result<IEnumerable<ExpenseWithInstallmentDto>>>(uof)
    { 
        public record Input();

        public async override Task<Result<IEnumerable<ExpenseWithInstallmentDto>>> Execute(Input input)
        {
            var expenseInstallments = await _unitOfWork.ExpenseInstallmentRepository
                .GetAllAsync(onlyActives: true, installment => installment.Expense);

            return Result.Ok(expenseInstallments.ToFlatDto());
        }
    }
}
