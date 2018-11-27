using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace AdminCore.Services
{
    public class AuthenticatedUser
    {
        private readonly IHttpContextAccessor _httpContentAccessor;
        
        public AuthenticatedUser(IHttpContextAccessor httpContextAccessor)
        {
            _httpContentAccessor = httpContextAccessor;
        }

        public string RetrieveUserId()
        {
            return _httpContentAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
        }
    }
}