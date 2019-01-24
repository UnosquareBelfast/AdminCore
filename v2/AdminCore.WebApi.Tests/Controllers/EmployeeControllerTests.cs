using AdminCore.Common.Interfaces;
using AdminCore.DTOs.Employee;
using AdminCore.WebApi.Controllers;
using AdminCore.WebApi.Mappings;
using AdminCore.WebApi.Models.Employee;
using AutoFixture;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using NSubstitute.ReturnsExtensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using Xunit;

namespace AdminCore.WebApi.Tests.Controllers
{
  public class EmployeeControllerTests : BaseControllerTest
  {
    private readonly IEmployeeService _employeeService;
    private readonly EmployeeController _employeeController;
    private readonly IFixture _fixture;

    public EmployeeControllerTests()
    {
      _employeeService = Substitute.For<IEmployeeService>();
      IMapper mapper = new Mapper(new MapperConfiguration(cfg => cfg.AddProfile(new WebMappingProfile())));
      _fixture = new Fixture();
      _employeeController = new EmployeeController(_employeeService, mapper, Substitute.For<IAuthenticatedUser>());
    }

    [Fact]
    public void GetAllEmployee_WhenCalled_ReturnsAllEmployees()
    {
      // Arrange
      const int numberOfEmployees = 9;

      var employeeDtos = _fixture.CreateMany<EmployeeDto>(numberOfEmployees).ToList();

      _employeeService.GetAll().Returns(employeeDtos);

      // Act
      var result = _employeeController.GetAllEmployees();

      // Assert
      var resultValue = RetrieveValueFromActionResult<List<EmployeeViewModel>>(result);
      Assert.Equal(resultValue.Count(), numberOfEmployees);
    }

    [Fact]
    public void GetAllEmployeeReturnsErrorMsgWhenNoEmployeesInDb()
    {
      // Service returns empty list.
      _employeeService.GetAll().Returns(new List<EmployeeDto>());

      // Act
      var result = _employeeController.GetAllEmployees();

      // Assert
      var resultValue = RetrieveValueFromActionResult<string>(result, HttpStatusCode.InternalServerError);
      Assert.Equal("No employees currently exist.", resultValue);
    }

    [Fact]
    public void TestUpdateEmployeeReturnsEmptyOkResponseWhenGivenValidInput()
    {
      var updateViewModel = BuildUpdateEmployeeViewModel();

      var result = _employeeController.UpdateEmployee(updateViewModel);

      Assert.IsType<OkResult>(result);
    }

    [Fact]
    public void TestUpdateEmployeeReturnsOkResponseWithErrorMessageWhenSaveThrowsAnException()
    {
      var updateViewModel = BuildUpdateEmployeeViewModel();

      _employeeService.When(x => x.Save(Arg.Any<EmployeeDto>())).Throw(new Exception("Test Exception"));

      var result = _employeeController.UpdateEmployee(updateViewModel);

      var resultValue = RetrieveValueFromActionResult<string>(result, HttpStatusCode.InternalServerError);
      Assert.Equal("Something went wrong, employee was not updated.", resultValue);
    }

    [Fact]
    public void TestCreateEmployeeReturnsEmptyOkResponseWhenGivenValidInput()
    {
      var registerViewModel = BuildRegisterEmployeeViewModel();

      //var result = _employeeController.CreateEmployee(registerViewModel);

      //var resultValue = RetrieveValueFromActionResult<string>(result);
      //Assert.Equal("Employee Test Employee has successfully been created", resultValue);
    }

    [Fact]
    public void TestCreateEmployeeReturnsOkResponseWithErrorMessageWhenSaveThrowsAnException()
    {
      var registerViewModel = BuildRegisterEmployeeViewModel();

      _employeeService.When(x => x.Save(Arg.Any<EmployeeDto>())).Throw(new Exception("Test Exception"));

      //var result = _employeeController.CreateEmployee(registerViewModel);

      //var resultValue = RetrieveValueFromActionResult<string>(result, HttpStatusCode.InternalServerError);
      //Assert.Equal("Something went wrong, employee was not created.", resultValue);
    }

    [Fact]
    public void TestGetEmployeeByIdReturnsOkObjectResultWithViewModelWhenGivenValidId()
    {
      const int testId = 1;
      var employeeDtoReturnedFromService = BuildEmployeeDto();

      _employeeService.Get(testId).Returns(employeeDtoReturnedFromService);

      var result = _employeeController.GetEmployeeById(testId);

      RetrieveValueFromActionResult<EmployeeViewModel>(result);
    }

    [Fact]
    public void TestGetEmployeeByIdReturnsOkObjectResultWithErrorMsgWhenGivenInvalidId()
    {
      const int testId = 1;

      _employeeService.Get(testId).ReturnsNull();

      var result = _employeeController.GetEmployeeById(testId);

      var resultValue = RetrieveValueFromActionResult<string>(result, HttpStatusCode.InternalServerError);
      Assert.Equal("No employee found with an ID of 1", resultValue);
    }

    [Fact]
    public void TestGetEmployeeByEmployeeNameReturnsOkObjectResultWithEmployeeViewModelWhenEmployeeNameExists()
    {
      const string testEmployeeForename = "Test";
      const string testEmployeeSurname = "Employee";

      var listOfDtosReturnedFromService = new List<EmployeeDto>()
      {
        BuildEmployeeDto()
      };

      _employeeService.GetByForenameAndSurname(testEmployeeForename, testEmployeeSurname).Returns(listOfDtosReturnedFromService);

      var result = _employeeController.GetByForenameAndSurname(testEmployeeForename, testEmployeeSurname);

      RetrieveValueFromActionResult<IList<EmployeeViewModel>>(result);
    }

    [Fact]
    public void TestGetEmployeeByEmployeeNameReturnsOkObjectResultWithErrorMsgWhenEmployeeNameDoesNotExist()
    {
      const string testEmployeeForename = "Test";
      const string testEmployeeSurname = "Employee";

      var listOfDtosReturnedFromService = new List<EmployeeDto>();
      _employeeService.GetByForenameAndSurname(testEmployeeForename, testEmployeeSurname).Returns(listOfDtosReturnedFromService);

      var result = _employeeController.GetByForenameAndSurname(testEmployeeForename, testEmployeeSurname);

      var resultValue = RetrieveValueFromActionResult<string>(result, HttpStatusCode.InternalServerError);
      Assert.Equal("No employee found with a forename of Test and a surname of Employee", resultValue);
    }

    [Fact]
    public void TestGetEmployeeByCountryIdReturnsOkObjectResultWithEmployeeViewModelWhenEmployeeExistsWithThatCountryId()
    {
      const int testEmployeeId = 1;

      var listOfDtosReturnedFromService = new List<EmployeeDto>()
      {
        BuildEmployeeDto()
      };

      _employeeService.GetByCountryId(testEmployeeId).Returns(listOfDtosReturnedFromService);

      var result = _employeeController.GetByCountryId(testEmployeeId);

      RetrieveValueFromActionResult<IList<EmployeeViewModel>>(result);
    }

    [Fact]
    public void TestGetEmployeeByCountryIdReturnsOkObjectResultWithErrorMsgWhenEmployeeDoesNotExistWithThatCountryId()
    {
      const int testEmployeeId = 1;

      var listOfDtosReturnedFromService = new List<EmployeeDto>();
      _employeeService.GetByCountryId(testEmployeeId).Returns(listOfDtosReturnedFromService);

      var result = _employeeController.GetByCountryId(testEmployeeId);

      var resultValue = RetrieveValueFromActionResult<string>(result, HttpStatusCode.InternalServerError);
      Assert.Equal("No employee found with country ID 1", resultValue);
    }

    [Fact]
    public void TestDeleteEmployeeReturnsOkObjectResultWithSuccessMessageWhenEmployeeExists()
    {
      const int testEmployeeId = 1;

      var result = _employeeController.DeleteEmployee(testEmployeeId);
      var resultValue = RetrieveValueFromActionResult<string>(result);

      Assert.Equal("Employee with Employee ID 1 has been successfully deleted.", resultValue);
    }

    [Fact]
    public void TestDeleteEmployeeReturnsOkObjectResultWithErrorMessageWhenEmployeeDoesNotExist()
    {
      const int testEmployeeId = 1;

      _employeeService.When(x => x.Delete(Arg.Any<int>())).Throw(new Exception("Test Exception"));

      var result = _employeeController.DeleteEmployee(testEmployeeId);
      var resultValue = RetrieveValueFromActionResult<string>(result, HttpStatusCode.InternalServerError);

      Assert.Equal("Something went wrong, employee was not deleted.", resultValue);
    }

    private static RegisterEmployeeViewModel BuildRegisterEmployeeViewModel()
    {
      return new RegisterEmployeeViewModel()
      {
        CountryId = 1,
        EmployeeRoleId = 1,
        EmployeeStatusId = 1,
        StartDate = new DateTime()
      };
    }

    private static UpdateEmployeeViewModel BuildUpdateEmployeeViewModel()
    {
      return new UpdateEmployeeViewModel()
      {
        EmployeeId = 1,
        Forename = "Test",
        Surname = "Employee",
        Email = "test@employee.com",
        CountryId = 1,
        EmployeeRoleId = 1,
        EmployeeStatusId = 1,
        StartDate = new DateTime()
      };
    }

    private static EmployeeDto BuildEmployeeDto()
    {
      return new EmployeeDto()
      {
        EmployeeId = 1,
        Forename = "Test",
        Surname = "Employee",
        Email = "test@employee.com",
        CountryId = 1,
        EmployeeRoleId = 1,
        EmployeeStatusId = 1,
        StartDate = new DateTime()
      };
    }
  }
}