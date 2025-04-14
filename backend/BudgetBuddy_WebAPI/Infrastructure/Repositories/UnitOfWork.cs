﻿using BudgetBuddy_WebAPI.Application.Interfaces;
using BudgetBuddy_WebAPI.Infrastructure.Context;

namespace BudgetBuddy_WebAPI.Infrastructure.Repositories
{
    public class UnitOfWork(AppDbContext context) : IUnitOfWork
    {
        private IExpenseRepository? _expenseRepository;
        private ICategoryRepository? _categoryRepository;

        private readonly AppDbContext _context = context;

        public IExpenseRepository ExpenseRepository => _expenseRepository ??= new ExpenseRepository(_context);
        public ICategoryRepository CategoryRepository => _categoryRepository ??= new CategoryRepository(_context);

        public Task CommitAsync()
        {
            _context.SaveChangesAsync();
            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
