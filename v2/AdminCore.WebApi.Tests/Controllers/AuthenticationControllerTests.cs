using AdminCore.WebApi.Controllers;

namespace AdminCore.WebApi.Tests.Controllers
{

  public class AuthenticationControllerTests : BaseControllerTest
  {
    private readonly AuthenticationController _controller;


    public AuthenticationControllerTests()
    {
      _controller = new AuthenticationController();
    }
  }
}