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
            // TODO antes de inativar, verificar se existe algum Expense cadastrado com essa category, bloquear inativação
            var category = input.MapToEntity();
            if (input.Id.HasValue)
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
