using System.Security.Claims;
using System.Text;
using AdminCore.Common.Interfaces;
using Microsoft.AspNetCore.Http;

namespace AdminCore.Services
{
    public class AuthenticatedUser : IAuthenticatedUser
    {
        private readonly IHttpContextAccessor _httpContentAccessor;
        
        public AuthenticatedUser(IHttpContextAccessor httpContextAccessor)
        {
            _httpContentAccessor = httpContextAccessor;
        }

        public int RetrieveUserId()
        {
            var employeeId = _httpContentAccessor.HttpContext.User.FindFirst(ClaimTypes.Name).Value;
            return int.Parse(employeeId);
        }
    }
}