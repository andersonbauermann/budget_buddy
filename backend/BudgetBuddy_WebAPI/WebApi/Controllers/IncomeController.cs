using BudgetBuddy_WebAPI.Application.Services.Base;
using BudgetBuddy_WebAPI.Application.Services.Income;
using Microsoft.AspNetCore.Mvc;

namespace BudgetBuddy_WebAPI.WebApi.Controllers;

[Route("[controller]")]
[ApiController]
public class IncomeController(IServiceFactory serviceFactory) : ControllerBase
{
    private readonly IServiceFactory _serviceFactory = serviceFactory;

    [HttpGet("allIncomes")]
    public async Task<IActionResult> GetAllExpeses()
    {
        var service = _serviceFactory.Create<GetAllIncomesService>(Request);
        var input = new GetAllIncomesService.Input();
        var result = await service.Execute(input);

        return Ok(result.Value);
    }
}
