namespace BudgetBuddy_WebAPI.Application.Services.Base
{
    public interface IServiceBase<TInput, TResult>
    {
        public abstract Task<TResult> Execute(TInput input);
    }
}
