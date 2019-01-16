using System.Collections.Generic;
using System.Security.Claims;

namespace AdminCore.Common
{
  public class UserDetailsHelper : Dictionary<string, string>
  {
    public UserDetailsHelper(IEnumerable<Claim> claimList)
    {
      foreach (var claim in claimList)
      {
        Add(claim.Type, claim.Value);
      }
    }
  }
}
