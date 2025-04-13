namespace BudgetBuddy_WebAPI.Application.Services.Base
{
    public interface IServiceFactory
    {
        TService Create<TService>(HttpRequest request) where TService : class;
    }
}
