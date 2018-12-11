using System;

namespace AdminCore.Common.Interfaces
{
    public interface IDateService
    {
        DateTime GetStartOfYearDate();
        DateTime GetEndOfYearDate();
        DateTime GetCurrentDateTime();
    }
}