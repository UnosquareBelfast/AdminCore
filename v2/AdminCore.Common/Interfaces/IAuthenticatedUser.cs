using System;
using System.Collections.Generic;
using System.Text;
using AdminCore.DTOs.Employee;

namespace AdminCore.Common.Interfaces
{
  public interface IAuthenticatedUser
  {
    EmployeeDto RetrieveLoggedInUser();

    UserDetailsHelper GetLoggedInUserDetails();
  }
}
