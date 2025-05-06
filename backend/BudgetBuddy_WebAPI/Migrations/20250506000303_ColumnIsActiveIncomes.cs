using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BudgetBuddy_WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class ColumnIsActiveIncomes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Incomes",
                type: "INTEGER",
                nullable: false,
                defaultValue: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Incomes");
        }
    }
}
