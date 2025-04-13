namespace BudgetBuddy_WebAPI.Application.Services.Base
{
    public abstract class ServiceBase<TInput, TResult> : IServiceBase<TInput, TResult>
    {
        public abstract Task<TResult> Execute(TInput input);
    }
}
