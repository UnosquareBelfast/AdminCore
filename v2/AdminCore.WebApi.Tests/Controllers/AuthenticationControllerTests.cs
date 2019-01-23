using AdminCore.Common.Interfaces;
using AdminCore.WebApi.Controllers;
using NSubstitute;

namespace AdminCore.WebApi.Tests.Controllers
{

  public class AuthenticationControllerTests : BaseControllerTest
  {
    private readonly AuthenticationController _controller;


    public AuthenticationControllerTests()
    {
      _controller = new AuthenticationController(Substitute.For<IAuthenticatedUser>(), Substitute.For<IEmployeeService>());
    }
  }
}