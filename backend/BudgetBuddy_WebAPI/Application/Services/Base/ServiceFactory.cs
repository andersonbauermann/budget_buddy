namespace BudgetBuddy_WebAPI.Application.Services.Base;

public class ServiceFactory(IServiceProvider serviceProvider) : IServiceFactory
{
    private readonly IServiceProvider _serviceProvider = serviceProvider;

    public TService Create<TService>(HttpRequest request) where TService : class
    {
        // TODO pegar o token da request
        return ActivatorUtilities.CreateInstance<TService>(_serviceProvider);
    }
}
