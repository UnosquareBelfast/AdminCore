using System.Security.Authentication;
using AdminCore.Common.Interfaces;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using AdminCore.Common;
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
      if (!userDetails.ContainsKey(UserDetailsConstants.UserEmail))
        throw new AuthenticationException("No user currently authenticated.");
      var employee = _employeeService.GetEmployeeByEmail(userDetails[UserDetailsConstants.UserEmail]);
      return employee;
    }

    public UserDetailsHelper GetLoggedInUserDetails()
    {
      var identity = _httpContentAccessor.HttpContext.User.Identity as ClaimsIdentity;
      return new UserDetailsHelper(identity.Claims);
    }
  }

}