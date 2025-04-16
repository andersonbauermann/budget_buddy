namespace BudgetBuddy_WebAPI.Application.Utils;

public static class ValidateInput
{
    public static bool IsValidMonth(int month) => month >= 1 && month <= 12;
    public static bool IsValidYear(int year) => year >= 2000 && year <= 2100;
}
