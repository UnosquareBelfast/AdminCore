using System;
using System.Collections.Generic;
using System.Text;

namespace AdminCore.Constants
{
  public static class UserDetailsConstants
  {
    public static readonly string UserEmail = "preferred_username";
    public static readonly string Aio = "aio";
    public static readonly string Name = "name";
    public static readonly string ObjectIdentifier = "http://schemas.microsoft.com/identity/claims/objectidentifier";
    public static readonly string NameIdentifier = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
    public static readonly string TenantId = "http://schemas.microsoft.com/identity/claims/tenantid";
    public static readonly string Uti = "uti";
  }
}
