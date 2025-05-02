namespace BudgetBuddy_WebAPI.Application.Interfaces;

public interface IUnitOfWork
{
    IExpenseRepository ExpenseRepository { get; }
    ICategoryRepository CategoryRepository { get; }
    IExpenseInstallmentRepository ExpenseInstallmentRepository { get; }
    IIncomeRepository IncomeRepository { get; }

    Task CommitAsync();
}
