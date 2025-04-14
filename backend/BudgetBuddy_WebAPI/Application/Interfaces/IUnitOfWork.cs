namespace BudgetBuddy_WebAPI.Application.Interfaces;

public interface IUnitOfWork
{
    IExpenseRepository ExpenseRepository { get; }
    ICategoryRepository CategoryRepository { get; }

    Task CommitAsync();
}
