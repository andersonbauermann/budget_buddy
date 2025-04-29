using BudgetBuddy_WebAPI.Application.Interfaces;
using BudgetBuddy_WebAPI.Application.Services.Base;
using FluentResults;

namespace BudgetBuddy_WebAPI.Application.Services.Expense;

public class ToggleExpensePaidService(IUnitOfWork uow) 
    : ServiceBase<ToggleExpensePaidService.Input, Result<string>>(uow)
{
    public record Input(int Id, bool Paid);

    public override async Task<Result<string>> Execute(Input input)
    {
        var installment = await _unitOfWork.ExpenseInstallmentRepository.GetAsync(e => e.Id == input.Id);

        if (installment is null)
        {
            return Result.Fail<string>("Nenhuma despesa encontrada.");
        }

        installment.Paid = input.Paid;
        _unitOfWork.ExpenseInstallmentRepository.Update(installment);
        await _unitOfWork.CommitAsync();

        return Result.Ok();
    }
}