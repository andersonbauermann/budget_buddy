using BudgetBuddy_WebAPI.Application.Interfaces;
using System.Security.Cryptography;

namespace BudgetBuddy_WebAPI.Application.Services.Base
{
    public abstract class ServiceBase<TInput, TResult>(IUnitOfWork uof) 
        : IServiceBase<TInput, TResult>
    {
        protected readonly IUnitOfWork _unitOfWork = uof;

        public abstract Task<TResult> Execute(TInput input);
    }
}
