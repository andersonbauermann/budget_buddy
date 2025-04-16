using BudgetBuddy_WebAPI.Application.Interfaces;
using BudgetBuddy_WebAPI.Application.Mapping;
using BudgetBuddy_WebAPI.Application.Models;
using BudgetBuddy_WebAPI.Application.Services.Base;
using FluentResults;

namespace BudgetBuddy_WebAPI.Application.Services.Category
{
    public class CreateOrUpdateCategoryService(IUnitOfWork uow) : ServiceBase<CategoryDto, Result<string>>
    {
        private readonly IUnitOfWork _unitOfWork = uow;

        public async override Task<Result<string>> Execute(CategoryDto input)
        {
            if (!input.IsActive)
            {
                var hasAnyExpense = await _unitOfWork.ExpenseRepository.ExistsAsync(e => e.CategoryId == input.Id);

                if (hasAnyExpense)
                {
                    return Result.Fail("Não é possível inativar esta categoria, pois existem despesas vinculadas a ela.");
                }
            }

            var category = input.MapToEntity();
            if (input.Id is > 0)
            {
                _unitOfWork.CategoryRepository.Update(category);
            } 
            else
            {
                _unitOfWork.CategoryRepository.Create(category);
            }

            await _unitOfWork.CommitAsync();
            return Result.Ok();
        }
    }
}
