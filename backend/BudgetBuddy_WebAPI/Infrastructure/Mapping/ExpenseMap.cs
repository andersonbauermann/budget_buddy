using BudgetBuddy_WebAPI.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BudgetBuddy_WebAPI.Infrastructure.Mapping;

public class ExpenseMap : IEntityTypeConfiguration<Expense>
{
    public void Configure(EntityTypeBuilder<Expense> builder)
    {
        // Define a chave primária
        builder.HasKey(e => e.Id);

        // Define a chave estrangeira
        builder.HasOne(e => e.Category) // Relacionamento com ExpenseCategory
               .WithMany() // Muitas Expenses podem ter uma única categoria
               .HasForeignKey(e => e.CategoryId) // Define a chave estrangeira
               .OnDelete(DeleteBehavior.Restrict); // Define o comportamento ao excluir

        builder.Property(e => e.Description)
               .IsRequired()
               .HasMaxLength(500);

        builder.Property(e => e.Value)
               .HasColumnType("decimal(18,2)");

        builder.Property(e => e.Date)
               .IsRequired();

        builder.Property(e => e.Paid)
          .IsRequired();

        builder.ToTable("Expenses");
    }
}
