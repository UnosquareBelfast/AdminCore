using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace AdminCore.WebApi.Util
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
