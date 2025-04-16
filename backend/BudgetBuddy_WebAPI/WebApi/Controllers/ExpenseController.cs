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

    [HttpGet("filter")]
    public async Task<IActionResult> GetFilteredByDate(int month, int year)
    {
        var service = _serviceFactory.Create<FilterExpenseByDateService>(Request);
        var input = new FilterExpenseByDateService.Input(month, year);
        var result = await service.Execute(input);
        
        if (result.IsFailed)
        {
            return BadRequest(result.Errors.FirstOrDefault()?.Message);
        }

        return Ok(result.Value);
    }
}
