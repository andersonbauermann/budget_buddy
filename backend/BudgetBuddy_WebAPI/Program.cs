using BudgetBuddy_WebAPI.Application.Interfaces;
using BudgetBuddy_WebAPI.Application.Services.Base;
using BudgetBuddy_WebAPI.Infrastructure.Context;
using BudgetBuddy_WebAPI.Infrastructure.Repositories;
using BudgetBuddy_WebAPI.WebApi.Filters;
using BudgetBuddy_WebAPI.WebApi.Middlewares;
using Microsoft.EntityFrameworkCore;
using Serilog;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        var configuration = builder.Configuration;
        var connectionString = configuration.GetConnectionString("DefaultConnection");
        string dbBath = connectionString.Replace("Data Source=", "").TrimEnd(';');
        var outputTemplate = "{Timestamp:dd-MM-yyyy HH:mm:ss} [{Level:u3}] {Message:lj}{NewLine}{Exception}";

        Log.Logger = new LoggerConfiguration()
            .Enrich.FromLogContext()
            .WriteTo.SQLite(dbBath, tableName: "Logs", batchSize: 1, restrictedToMinimumLevel: Serilog.Events.LogEventLevel.Warning)
            .WriteTo.Console(outputTemplate: outputTemplate, theme: Serilog.Sinks.SystemConsole.Themes.AnsiConsoleTheme.Code)
            .CreateLogger();

        builder.Logging.ClearProviders();
        builder.Host.UseSerilog();

        builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite(connectionString));

        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddScoped<IServiceFactory, ServiceFactory>();
        builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
        builder.Services.AddScoped<IExpenseRepository, ExpenseRepository>();
        builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
        builder.Services.AddScoped<IExpenseInstallmentRepository, ExpenseInstallmenRepository>();

        builder.Services.AddControllers(options =>
        {
            options.Filters.Add<ExceptionFilter>();
        });

        var app = builder.Build();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseMiddleware<LoggingMiddleware>();
        app.UseHttpsRedirection();
        app.UseAuthorization();
        app.UseCors(option => option.AllowAnyHeader()
                                    .AllowAnyMethod()
                                    .AllowAnyOrigin());

        app.MapControllers();
        app.Run();
        Log.CloseAndFlush();
    }
}
