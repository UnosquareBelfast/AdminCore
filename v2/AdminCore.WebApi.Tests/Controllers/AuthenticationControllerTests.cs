using AdminCore.DTOs;
using AdminCore.DTOs.Employee;
using AdminCore.WebApi.Models;
using AdminCore.WebApi.Models.Authentication;
using AdminCore.WebApi.Models.Employee;
using System.Net;
using Xunit;

namespace AdminCore.WebApi.Tests.Controllers
{
  using AdminCore.Common.Interfaces;
  using AdminCore.WebApi.Controllers;
  using AutoFixture;
  using AutoMapper;
  using NSubstitute;

  public class AuthenticationControllerTests : BaseControllerTest
  {
    private readonly AuthenticationController _controller;

    private readonly IAuthenticationService _authenticationService;

    private readonly IEmployeeService _employeeService;

    private readonly IFixture _fixture;

    private readonly IMapper _mapper;

    public AuthenticationControllerTests()
    {
      _authenticationService = Substitute.For<IAuthenticationService>();
      _employeeService = Substitute.For<IEmployeeService>();
      _mapper = Substitute.For<IMapper>();
      _fixture = new Fixture();

      _controller = new AuthenticationController(_authenticationService, _mapper, _employeeService);
    }

    [Fact]
    public void LoginWithCorrectUserDetails_WhenCalled_ReturnsAuthorizationToken()
    {
      // Arrange
      var loginRequest = _fixture.Build<LoginRequestModel>()
        .With(x => x.Email, "correctEmail@address.com")
        .With(x => x.Password, "correctPassword")
        .Create();

      var jwtAuthDto = _fixture.Build<JwtAuthDto>()
        .With(x => x.AccessToken, "AccessToken")
        .With(x => x.TokenType, "TokenType")
        .Create();

      var jwtAuthViewModel = _fixture.Build<JwtAuthViewModel>()
        .With(x => x.AccessToken, jwtAuthDto.AccessToken)
        .With(x => x.TokenType, jwtAuthDto.TokenType)
        .Create();

      _mapper.Map<JwtAuthViewModel>(Arg.Is(jwtAuthDto)).Returns(jwtAuthViewModel);
      _authenticationService.JwtSignIn(loginRequest.Email, loginRequest.Password).Returns(jwtAuthDto);

      //Act
      var result = _controller.Login(loginRequest);

      //Assert
      var actionResult = RetrieveValueFromActionResult<JwtAuthViewModel>(result, HttpStatusCode.Accepted);

      Assert.Equal(jwtAuthDto.AccessToken, actionResult.AccessToken);
      Assert.Equal(jwtAuthDto.TokenType, actionResult.TokenType);

      _authenticationService.Received(1).JwtSignIn(loginRequest.Email, loginRequest.Password);
    }

    [Fact]
    public void LoginWithInCorrectUserDetails_WhenCalled_ReturnsRejected()
    {
      //Arrange
      var loginRequest = _fixture.Build<LoginRequestModel>()
        .With(x => x.Email, "incorrectEmail@address.com")
        .With(x => x.Password, "incorrectPassword")
        .Create();

      //Act
      var result = _controller.Login(loginRequest);
      //ObjectResult obj = result.v
      //Assert
      //Assert.IsType<NotFoundObjectResult>(result);
      RetrieveValueFromActionResult<string>(result, HttpStatusCode.NotFound);
      _authenticationService.Received(1).JwtSignIn(loginRequest.Email, loginRequest.Password);
    }

    [Fact]
    public void RegisterWithUnregisteredEmailAddress_WhenCalled_ReturnsSuccessfullyRegistered()
    {
      //Arrange
      var registerModel = _fixture.Build<RegisterEmployeeViewModel>()
        .With(x => x.Email, "correctEmail@address.com")
        .Create();

      _employeeService.Create(_mapper.Map<EmployeeDto>(registerModel)).Returns(registerModel.Email);

      //Act
      var result = _controller.Register(registerModel);

      //Assert
      RetrieveValueFromActionResult<string>(result, HttpStatusCode.OK);
      _employeeService.Received(1).VerifyEmailExists(registerModel.Email);
    }

    [Fact]
    public void RegisterWithAlreadyRegisteredEmailAddress_WhenCalled_ReturnsUnsuccessfullyRegistered()
    {
      //Arrange
      var registerModel = _fixture.Build<RegisterEmployeeViewModel>()
        .With(x => x.Email, "incorrectEmail@address.com")
        .Create();

      _employeeService.VerifyEmailExists(registerModel.Email).Returns(true);

      //Act
      var result = _controller.Register(registerModel);

      //Assert
      RetrieveValueFromActionResult<string>(result, HttpStatusCode.BadRequest);
      _employeeService.Received(1).VerifyEmailExists(registerModel.Email);
    }
  }
}