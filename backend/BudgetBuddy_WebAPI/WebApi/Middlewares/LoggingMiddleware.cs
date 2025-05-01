using Serilog.Context;

namespace BudgetBuddy_WebAPI.WebApi.Middlewares;

public class LoggingMiddleware(RequestDelegate next)
{
    private readonly RequestDelegate _next = next;

    public async Task Invoke(HttpContext context, ILogger<LoggingMiddleware> logger)
    {
        var route = context.Request.Path;
        var method = context.Request.Method;

        using (LogContext.PushProperty("Route", route))
        using (LogContext.PushProperty("Method", method))
        {
            logger.LogInformation("Requisição recebida: {Method} {Route}");
            await _next(context);
        }
    }
}
