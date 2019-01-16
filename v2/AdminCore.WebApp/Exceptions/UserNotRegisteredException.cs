using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminCore.WebApi.Exceptions
{
  public class UserNotRegisteredException : Exception
  {
    public UserNotRegisteredException(string message) : base(message){}
  }
}
