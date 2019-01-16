using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AdminCore.Common;
using AdminCore.Common.Interfaces;
using AdminCore.DTOs.Employee;
using AdminCore.WebApi.Exceptions;
using AutoMapper;

namespace AdminCore.WebApi.Controllers
{
  public abstract class LoggedInUserController : BaseController
  {
    protected EmployeeDto LoggedInUser;
    protected IEmployeeService EmployeeService;

    protected LoggedInUserController(IMapper mapper, IEmployeeService employeeService) : base(mapper)
    {
      EmployeeService = employeeService;
    }

    protected int RetrieveLoggedInUserId()
    {
      if (LoggedInUser != null)
      {
        return LoggedInUser.EmployeeId;
      }
      RefreshLoggedInUser();
      return LoggedInUser.EmployeeId;
    }

    protected void RefreshLoggedInUser()
    {
      var userDetails = GetLoggedInUserDetails();
      var userEmail = userDetails["preferred_username"];
      var employee = EmployeeService.getEmployeeByEmail(userEmail);
      LoggedInUser = employee ?? throw new UserNotRegisteredException($"User with email {userEmail} is not registered.");
    }

    protected UserDetailsHelper GetLoggedInUserDetails()
    {
      var identity = User.Identity as ClaimsIdentity;
      return new UserDetailsHelper(identity.Claims);
    }
  }
}

