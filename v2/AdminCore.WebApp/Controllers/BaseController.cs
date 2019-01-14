using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;

namespace AdminCore.WebApi.Controllers
{
  public class BaseController : ControllerBase
  {
    protected readonly IMapper Mapper;
    protected readonly ILogger Logger;

    public BaseController(IMapper mapper)
    {
      Mapper = mapper;
      var loggerFactory = new LoggerFactory()
        .AddConsole()
        .AddDebug();
      Logger = loggerFactory.CreateLogger<BaseController>();
    }

    // Leaving method here unused. Will chat with Mark about possible usage.
    public IActionResult GenerateGetAllResponse<TypeOfList, TypeBeingReturned>(IList<TypeOfList> getAllResults, string errorMsg)
    {
      return getAllResults != null ? Ok(Mapper.Map<TypeBeingReturned>(getAllResults)) : Ok(errorMsg);
    }
  }
}