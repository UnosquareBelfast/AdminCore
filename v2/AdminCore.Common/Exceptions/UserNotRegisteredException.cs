using System;

namespace AdminCore.Common.Exceptions
{
  public class UserNotRegisteredException : Exception
  {
    public UserNotRegisteredException(string message) : base(message)
    {
    }
  }
}