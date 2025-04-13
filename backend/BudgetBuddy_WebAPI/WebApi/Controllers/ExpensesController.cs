using Microsoft.AspNetCore.Mvc;
using BudgetBuddy_WebAPI.Application.Models;
using BudgetBuddy_WebAPI.Application.Services.Base;
using BudgetBuddy_WebAPI.Application.Services.Expense;

namespace BudgetBuddy_WebAPI.WebApi.Controllers;

[Route("[controller]")]
[ApiController]
public class ExpensesController(IServiceFactory serviceFactory) : ControllerBase
{
    private readonly IServiceFactory _serviceFactory = serviceFactory;

    [HttpPost]
    public async Task<IActionResult> Create(CreateExpenseDto request)
    {
        var service = _serviceFactory.Create<CreateExpenseService>(Request);
        var result = service.Execute(request);
        //return CreatedAtRoute(nameof(GetById), new { id = newExpense.Id }, request);
        return Ok();
    }
}
