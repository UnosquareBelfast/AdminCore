using Microsoft.AspNetCore.Mvc;
using System.Net;
using Xunit;

namespace AdminCore.WebApi.Tests.Controllers
{
  public abstract class BaseControllerTest
  {
    protected T RetrieveValueFromActionResult<T>(IActionResult result, HttpStatusCode expectedStatus = HttpStatusCode.OK) where T : class
    {
      var objectResult = VerifyActionResult(result, expectedStatus);

      return (T)objectResult.Value;
    }

    protected ObjectResult VerifyActionResult(IActionResult result, HttpStatusCode expectedStatus = HttpStatusCode.OK)
    {
      VerifyHttpStatusCode(result, expectedStatus);

      var objectResult = result as ObjectResult;
      Assert.NotNull(objectResult);

      return objectResult;
    }

    private static void VerifyHttpStatusCode(IActionResult result, HttpStatusCode expectedStatus)
    {
      switch (expectedStatus)
      {
        case HttpStatusCode.OK:
          Assert.IsType<OkResult>(result);
          break;

        case HttpStatusCode.NotFound:
          Assert.IsType<NotFoundResult>(result);
          break;
      }
    }
  }
}