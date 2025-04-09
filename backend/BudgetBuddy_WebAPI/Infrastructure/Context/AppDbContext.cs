﻿using BudgetBuddy_WebAPI.Domain.Entities;
using BudgetBuddy_WebAPI.Infrastructure.Mapping;
using Microsoft.EntityFrameworkCore;

namespace BudgetBuddy_WebAPI.Infrastructure.Context;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Expense> Expenses { get; set; }
    public DbSet<Category> ExpenseCategories { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
       
        builder.ApplyConfiguration(new ExpenseMap());
        builder.ApplyConfiguration(new CategoryMap());
    }
}
