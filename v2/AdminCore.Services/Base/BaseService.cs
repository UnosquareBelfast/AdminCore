using AdminCore.Common.Interfaces;
using AdminCore.DAL;

namespace AdminCore.Services.Base
{
  public abstract class BaseService
  {
    public IAuthenticatedUser AuthenticatedUser { get; }

    public IDatabaseContext DatabaseContext { get; }

    protected BaseService(IDatabaseContext databaseContext)
    {
      DatabaseContext = databaseContext;
    }

    protected BaseService(IAuthenticatedUser authenticatedUser, IDatabaseContext databaseContext)
    {
      AuthenticatedUser = authenticatedUser;
      DatabaseContext = databaseContext;
    }
  }
}