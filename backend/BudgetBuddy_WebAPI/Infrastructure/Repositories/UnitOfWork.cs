using BudgetBuddy_WebAPI.Application.Interfaces;
using BudgetBuddy_WebAPI.Infrastructure.Context;

namespace BudgetBuddy_WebAPI.Infrastructure.Repositories
{
    public class UnitOfWork(AppDbContext context) : IUnitOfWork
    {
        private IExpenseRepository? _expenseRepository;
        private ICategoryRepository? _categoryRepository;
        private IExpenseInstallmentRepository? _expenseInstallmentRepository;
        private IIncomeRepository? _incomeRepository;

        private readonly AppDbContext _context = context;

        public IExpenseRepository ExpenseRepository
            => _expenseRepository ??= new ExpenseRepository(_context);
        public ICategoryRepository CategoryRepository 
            => _categoryRepository ??= new CategoryRepository(_context);
        public IExpenseInstallmentRepository ExpenseInstallmentRepository 
            => _expenseInstallmentRepository ??= new ExpenseInstallmenRepository(_context);
        public IIncomeRepository IncomeRepository
            => _incomeRepository ??= new IncomeRepository(_context);

        public async Task CommitAsync()
        {
            await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
