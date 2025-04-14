﻿using BudgetBuddy_WebAPI.Application.Models;
using BudgetBuddy_WebAPI.Application.Services.Base;
using BudgetBuddy_WebAPI.Application.Services.Category;
using Microsoft.AspNetCore.Mvc;
namespace BudgetBuddy_WebAPI.WebApi.Controllers;

[Route("[controller]")]
[ApiController]
public class CategoryController(IServiceFactory serviceFactory) : ControllerBase
{
    private readonly IServiceFactory _serviceFactory = serviceFactory;

    [HttpGet("allCategories")]
    public async Task<IActionResult> GetAll()
    {
        var service = _serviceFactory.Create<ReadAllCategoriesService>(Request);
        var result = await service.Execute(new ReadAllCategoriesService.Input());

        if (result.IsFailed)
        {
            return NotFound(result.Errors.FirstOrDefault()?.Message);
        }

        return Ok(result.Value);
    }

    [HttpPost]
    public async Task<IActionResult> CreateOrUpdate(CategoryDto request)
    {
        //try
        //{
            var service = _serviceFactory.Create<CreateOrUpdateCategoryService>(Request);
            await service.Execute(request);

            return Ok();
        //}
        //catch (Exception ex)
        //{

        //}
    }
}
