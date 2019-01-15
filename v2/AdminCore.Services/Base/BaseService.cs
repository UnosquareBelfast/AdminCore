using AdminCore.Common.Interfaces;
using AdminCore.DAL;

namespace AdminCore.Services.Base
{
    public abstract class BaseService
    {
        public IDatabaseContext DatabaseContext { get; }
        
        protected BaseService(IDatabaseContext databaseContext)
        {
            DatabaseContext = databaseContext;
        }
    }
}