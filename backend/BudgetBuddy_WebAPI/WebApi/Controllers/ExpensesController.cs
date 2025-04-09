using Microsoft.AspNetCore.Mvc;
using BudgetBuddy_WebAPI.Application.Models;
using BudgetBuddy_WebAPI.Application.Interfaces;
using BudgetBuddy_WebAPI.Domain.Entities;

namespace BudgetBuddy_WebAPI.WebApi.Controllers;

[Route("[controller]")]
[ApiController]
public class ExpensesController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    [HttpPost]
    public async Task<IActionResult> Create(CreateExpenseDto request)
    {

        //return CreatedAtRoute(nameof(GetById), new { id = newExpense.Id }, request);
        return Ok();
    }
}
