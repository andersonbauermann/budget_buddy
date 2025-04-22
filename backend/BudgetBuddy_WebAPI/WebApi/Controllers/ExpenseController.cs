using Microsoft.AspNetCore.Mvc;
using BudgetBuddy_WebAPI.Application.Models;
using BudgetBuddy_WebAPI.Application.Services.Base;
using BudgetBuddy_WebAPI.Application.Services.Expense;

namespace BudgetBuddy_WebAPI.WebApi.Controllers;

[Route("[controller]")]
[ApiController]
public class ExpenseController(IServiceFactory serviceFactory) : ControllerBase
{
    private readonly IServiceFactory _serviceFactory = serviceFactory;

    [HttpPost]
    public async Task<IActionResult> Create(ExpenseDto request)
    {
        var service = _serviceFactory.Create<CreateExpenseService>(Request);
        await service.Execute(request);

        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> GetAllExpeses()
    {
        var service = _serviceFactory.Create<GetAllExpensesService>(Request);
        var input = new GetAllExpensesService.Input();
        var result = await service.Execute(input);

        return Ok(result.Value);
    }
}
