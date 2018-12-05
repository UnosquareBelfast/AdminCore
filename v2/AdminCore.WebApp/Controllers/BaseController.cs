using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AdminCore.Common.Interfaces;
using AdminCore.Services.Base;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

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
