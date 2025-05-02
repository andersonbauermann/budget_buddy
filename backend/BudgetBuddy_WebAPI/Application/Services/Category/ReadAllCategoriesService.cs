using BudgetBuddy_WebAPI.Application.Interfaces;
using BudgetBuddy_WebAPI.Application.Mapping;
using BudgetBuddy_WebAPI.Application.Models;
using BudgetBuddy_WebAPI.Application.Services.Base;
using FluentResults;

namespace BudgetBuddy_WebAPI.Application.Services.Category;

public class ReadAllCategoriesService(IUnitOfWork uow)
    : ServiceBase<ReadAllCategoriesService.Input, Result<IEnumerable<CategoryDto>>>(uow)
{
    public record Input();

    public async override Task<Result<IEnumerable<CategoryDto>>> Execute(Input input)
    {
        var categories = await _unitOfWork.CategoryRepository.GetAllAsync() ?? [];

        var mappedCategories = categories
            .Where(category => category.IsActive)
            .Select(category => category.MapToDto());

        return Result.Ok(mappedCategories.Any() ? mappedCategories : []);
    }
}
