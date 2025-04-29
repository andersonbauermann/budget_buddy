using BudgetBuddy_WebAPI.Application.Interfaces;
using BudgetBuddy_WebAPI.Application.Services.Base;
using FluentResults;

namespace BudgetBuddy_WebAPI.Application.Services.Expense;

public class InactiveExpenseService(IUnitOfWork uof) 
    : ServiceBase<InactiveExpenseService.Input, Result<string>>(uof)
{
    public record Input (List<int> IdsToDelete);

    public override async Task<Result<string>> Execute(Input input)
    {
        var expenseInstallments = await _unitOfWork.ExpenseInstallmentRepository
         .GetAllAsync(onlyActives: true);

        var validIds = input.IdsToDelete.Where(id => expenseInstallments.Any(inst => inst.Id == id)).ToList();
        var invalidIds = input.IdsToDelete.Except(validIds).ToList();

        if (validIds.Count == 0)
        {
            return Result.Fail<string>("Nenhuma despesa encontrada com os IDs informados.");
        }

        await _unitOfWork.ExpenseInstallmentRepository.InactiveRangeAsync(validIds);
        await _unitOfWork.CommitAsync();

        if (invalidIds.Count != 0)
        {
            return Result.Fail<string>($"As despesas com os seguintes IDs não foram encontradas e não foram inativadas: {string.Join(", ", invalidIds)}.");
        }

        return Result.Ok();
    }
}
