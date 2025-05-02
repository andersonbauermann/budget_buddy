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
        var result = await service.Execute(request);

        if (result.IsFailed)
        {
            return BadRequest(result.Errors.FirstOrDefault()?.Message);
        }

        return Created();
    }

    [HttpPut("{id:int}")] 
    public async Task<IActionResult> Update(int id, ExpenseWithInstallmentDto request)
    {
        var service = _serviceFactory.Create<UpdateExpenseService>(Request);
        request = request with { Id = id };
        await service.Execute(request);

        return NoContent();
    }

    [HttpPut("inactive")]
    public async Task<IActionResult> InactiveExpense([FromBody] InactiveExpenseService.Input idsToDelete)
    {
        var service = _serviceFactory.Create<InactiveExpenseService>(Request);
        await service.Execute(idsToDelete);

        return NoContent();
    }

    [HttpGet("allExpenses")]
    public async Task<IActionResult> GetAllExpeses()
    {
        var service = _serviceFactory.Create<GetAllExpensesService>(Request);
        var input = new GetAllExpensesService.Input();
        var result = await service.Execute(input);

        return Ok(result.Value);
    }

    [HttpPatch("{id:int}/toggle-paid")]
    public async Task<IActionResult> ToggleExpensePaid(int id, [FromBody] bool paid)
    {
        var service = _serviceFactory.Create<ToggleExpensePaidService>(Request);
        var result = await service.Execute(new ToggleExpensePaidService.Input(id, paid));

        if (result.IsFailed)
        {
            return NotFound(result.Errors.FirstOrDefault()?.Message);
        }

        return Ok(result.Value);
    }
}
