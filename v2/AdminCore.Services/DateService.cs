using System;
using AdminCore.Common.Interfaces;

namespace AdminCore.Services
{
    public class DateService : IDateService
    {

        public DateTime GetCurrentDateTime()
        {
            return DateTime.Now;;
        }

        public DateTime GetStartOfYearDate()
        {
            var nowDate = DateTime.Now;
            return new DateTime(nowDate.Year, 1, 1);
        }
        
        public DateTime GetEndOfYearDate()
        {
            var nowDate = DateTime.Now;
            return new DateTime(nowDate.Year, 12, 31, 23, 59, 59);
        }
    }
}