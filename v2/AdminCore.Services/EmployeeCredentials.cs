using AdminCore.Common.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace AdminCore.Services
{
  public class EmployeeCredentials : IEmployeeCredentials
  {
    private readonly IAuthenticatedUser _authenticatedUser;

    public EmployeeCredentials(IAuthenticatedUser authenticatedUser)
    {
      _authenticatedUser = authenticatedUser;
    }

    public int GetUserId()
    {
      return _authenticatedUser.RetrieveUserId();
    }
  }
}
