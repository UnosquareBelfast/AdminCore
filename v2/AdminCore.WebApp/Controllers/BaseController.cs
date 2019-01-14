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
  }
}