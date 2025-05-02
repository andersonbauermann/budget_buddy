using BudgetBuddy_WebAPI.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BudgetBuddy_WebAPI.Infrastructure.Mapping;

public class IncomeMap : IEntityTypeConfiguration<Income>
{
    public void Configure(EntityTypeBuilder<Income> builder)
    {
        builder.ToTable("Incomes");

        builder.HasKey(e => e.Id);

        builder.Property(e => e.Description)
            .IsRequired()
            .HasMaxLength(255);

        builder.Property(e => e.Value)
            .HasColumnType("decimal(18,2)");

        builder.Property(e => e.Date)
            .IsRequired();

        builder.Property(e => e.Received)
            .HasDefaultValue(false);

        builder.HasOne(e => e.Category)
            .WithMany()
            .HasForeignKey(e => e.CategoryId)
            .OnDelete(DeleteBehavior.Restrict);
    }   
}
