using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BudgetBuddy_WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class ColumnIsActiveExpenseInstallment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "Paid",
                table: "ExpenseInstallments",
                type: "INTEGER",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "INTEGER");

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "ExpenseInstallments",
                type: "INTEGER",
                nullable: false,
                defaultValue: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "ExpenseInstallments");

            migrationBuilder.AlterColumn<bool>(
                name: "Paid",
                table: "ExpenseInstallments",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "INTEGER",
                oldDefaultValue: false);
        }
    }
}
