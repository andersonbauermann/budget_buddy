using BudgetBuddy_WebAPI.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BudgetBuddy_WebAPI.Infrastructure.Mapping;

public class ExpenseInstallmentMap : IEntityTypeConfiguration<ExpenseInstallment>
{
    public void Configure(EntityTypeBuilder<ExpenseInstallment> builder)
    {
        builder.HasKey(e => e.Id);

        builder.Property(e => e.Date)
            .IsRequired();

        builder.Property(e => e.Date)
            .IsRequired();

        builder.HasOne(e => e.Expense)
            .WithMany()
            .HasForeignKey(e => e.ExpenseId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.ToTable("ExpenseInstallments");
    }
}
