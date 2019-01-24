using System.Security.Authentication;
using AdminCore.Common.Interfaces;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using AdminCore.Common;
using AdminCore.Common.Exceptions;
using AdminCore.Constants;
using AdminCore.DTOs.Employee;

namespace AdminCore.Services
{
  public class AuthenticatedUser : IAuthenticatedUser
  {
    private readonly IHttpContextAccessor _httpContentAccessor;
    private readonly IEmployeeService _employeeService;

    public AuthenticatedUser(IHttpContextAccessor httpContextAccessor, IEmployeeService employeeService)
    {
      _httpContentAccessor = httpContextAccessor;
      _employeeService = employeeService;
    }

    public EmployeeDto RetrieveLoggedInUser()
    {
      var userDetails = GetLoggedInUserDetails();
      var employee = _employeeService.GetEmployeeByEmail(userDetails[UserDetailsConstants.UserEmail]);
      return employee ?? throw new UserNotRegisteredException($"User with email {userDetails[UserDetailsConstants.UserEmail]} is not registered. Log in first.");
    }

    public UserDetailsHelper GetLoggedInUserDetails()
    {
      var identity = _httpContentAccessor.HttpContext.User.Identity as ClaimsIdentity;
      var userDetails = new UserDetailsHelper(identity.Claims);
      return userDetails.Count > 0 ? userDetails : throw new AuthenticationException("No user is currently authenticated");
    }
  }
}