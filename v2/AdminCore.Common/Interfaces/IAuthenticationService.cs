using AdminCore.DTOs;

namespace AdminCore.Common.Interfaces
{
  public interface IAuthenticationService
  {
    JwtAuthDto JwtSignIn(string email, string password);
  }
}