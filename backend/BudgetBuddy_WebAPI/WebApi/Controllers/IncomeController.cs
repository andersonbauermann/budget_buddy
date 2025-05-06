using BudgetBuddy_WebAPI.Application.Models;
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

    [HttpPost]
    public async Task<IActionResult> Create(IncomeDto request)
    {
        var service = _serviceFactory.Create<CreateOrUpdateIncomeService>(Request);
        var result = await service.Execute(request);

        if (result.IsFailed)
        {
            return BadRequest(result.Errors.FirstOrDefault()?.Message);
        }

        return Created();
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(IncomeDto request)
    {
        request = request with { Id = request.Id };
        var service = _serviceFactory.Create<CreateOrUpdateIncomeService>(Request);
        var result = await service.Execute(request);

        if (result.IsFailed)
        {
            return BadRequest(result.Errors.FirstOrDefault()?.Message);
        }

        return Created();
    }
}
