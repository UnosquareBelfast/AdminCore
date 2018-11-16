using Microsoft.AspNetCore.Mvc;
using System.Net;
using Xunit;

namespace AdminCore.WebApi.Tests.Controllers
{
  public abstract class BaseControllerTest
  {
    protected void AssertObjectResultIsNull<T>(IActionResult result, HttpStatusCode expectedStatus = HttpStatusCode.OK) where T : class
    {
      VerifyHttpStatusCode<T>(result, expectedStatus);

      var objectResult = result as ObjectResult;
      Assert.Null(objectResult);
    }

    protected T RetrieveValueFromResult<T>(IActionResult result, HttpStatusCode expectedStatus = HttpStatusCode.OK) where T : class
    {
      VerifyHttpStatusCode<T>(result, expectedStatus);

      var objectResult = result as ObjectResult;
      Assert.NotNull(objectResult);

      return (T)objectResult.Value;
    }

    private static void VerifyHttpStatusCode<T>(IActionResult result, HttpStatusCode expectedStatus) where T : class
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