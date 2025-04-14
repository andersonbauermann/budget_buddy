using BudgetBuddy_WebAPI.Application.Interfaces;
using BudgetBuddy_WebAPI.Application.Mapping;
using BudgetBuddy_WebAPI.Application.Models;
using BudgetBuddy_WebAPI.Application.Services.Base;
using FluentResults;

namespace BudgetBuddy_WebAPI.Application.Services.Category;

public class ReadAllCategoriesService(IUnitOfWork uof)
    : ServiceBase<ReadAllCategoriesService.Input, Result<IEnumerable<CategoryDto>>>
{
    public record Input();

    private readonly IUnitOfWork _unitOfWork = uof;

    public async override Task<Result<IEnumerable<CategoryDto>>> Execute(Input input)
    {
        var categories = await _unitOfWork.CategoryRepository.GetAllAsync();

        if (categories is null || !categories.Any())
        {
            return Result.Fail<IEnumerable<CategoryDto>>("Nenhuma categoria encontrada.");
        }

        var mappedCategories = categories.Select(category => category.MapToDto());

        return Result.Ok(mappedCategories);
    }
}
