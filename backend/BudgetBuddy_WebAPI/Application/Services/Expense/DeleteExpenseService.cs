using BudgetBuddy_WebAPI.Application.Interfaces;
using BudgetBuddy_WebAPI.Application.Services.Base;
using BudgetBuddy_WebAPI.Shared.Extensions;
using FluentResults;

namespace BudgetBuddy_WebAPI.Application.Services.Expense;

public class DeleteExpenseService(IUnitOfWork uof) 
    : ServiceBase<DeleteExpenseService.Input, Result<string>>(uof)
{
    public record Input (List<int> IdsToDelete);

    public override async Task<Result<string>> Execute(Input input)
    {
        var expenseInstallments = await _unitOfWork.ExpenseInstallmentRepository
            .GetAllAsync(onlyActives: true, inst => input.IdsToDelete.Contains(inst.Id));

        if (expenseInstallments.IsNullOrEmpty())
            return Result.Fail<string>("Nenhuma despesa encontrada com os ids informados.");

        await _unitOfWork.ExpenseInstallmentRepository.DeleteRangeAsync(input.IdsToDelete);
        await _unitOfWork.CommitAsync();

        return Result.Ok();
    }
}
