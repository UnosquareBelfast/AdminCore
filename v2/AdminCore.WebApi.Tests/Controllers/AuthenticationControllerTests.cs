using AdminCore.DTOs;
using AdminCore.DTOs.Employee;
using AdminCore.WebApi.Models.Authentication;
using AdminCore.WebApi.Models.Employee;
using Microsoft.AspNetCore.Mvc;
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
    public void LoginWithCorrectUserDetails_WhenCalled_ReturnsAccepted()
    {
      // Arrange
      var loginRequest = _fixture.Build<LoginRequestModel>()
        .With(x => x.Email, "correctEmail@address.com")
        .With(x => x.Password, "correctPassword")
        .Create();

      var jwtAuthDto = _fixture.Create<JwtAuthDto>();
      _authenticationService.JwtSignIn(loginRequest.Email, loginRequest.Password).Returns(jwtAuthDto);

      //TODO Accept "correct" login mock

      //Act
      var result = _controller.Login(loginRequest);

      //Assert
      Assert.IsType<AcceptedResult>(result);
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

      //Assert
      Assert.IsType<NotFoundObjectResult>(result);
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
      _employeeService.Received(1).VerifyEmailExists(registerModel.Email);
      Assert.IsType<OkObjectResult>(result);
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
      _employeeService.Received(1).VerifyEmailExists(registerModel.Email);
      Assert.IsType<BadRequestObjectResult>(result);
    }
  }
}