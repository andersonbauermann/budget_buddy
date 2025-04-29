using BudgetBuddy_WebAPI.Application.Interfaces;
using BudgetBuddy_WebAPI.Application.Mapping;
using BudgetBuddy_WebAPI.Application.Models;
using BudgetBuddy_WebAPI.Application.Services.Base;
using FluentResults;

namespace BudgetBuddy_WebAPI.Application.Services.Category
{
    public class InactiveCategoryService(IUnitOfWork uow) : ServiceBase<InactiveCategoryService.Input, Result<CategoryDto>>(uow)
    {
        public record Input(int Id);

        public async override Task<Result<CategoryDto>> Execute(Input input)
        {
            var category = await _unitOfWork.CategoryRepository.GetAsync(c => c.Id == input.Id);

            if (category is null) return Result.Fail("Nenhuma categoria encontrada.");

            category.IsActive = false;

            _unitOfWork.CategoryRepository.Update(category);
            await _unitOfWork.CommitAsync();

            return Result.Ok(category.MapToDto());
        }
    }
}
