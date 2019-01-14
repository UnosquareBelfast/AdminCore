using AdminCore.Common.Interfaces;
using AdminCore.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AdminCore.Services
{
  public class DateService : IDateService
  {
    public DateTime GetCurrentDateTime()
    {
      return DateTime.Now; ;
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

    public static bool DateIsBetweenRangeOfDates(DateTime date, DateTime startOfRange, DateTime endOfRange)
    {
      return startOfRange <= date && endOfRange >= date;
    }

    public static bool CurrentDateIsBetweenRangeOfDates(DateTime startOfRange, DateTime endOfRange)
    {
      return DateIsBetweenRangeOfDates(DateTime.Now, startOfRange, endOfRange);
    }

    public static DateTime GetMonthEndDate(DateTime date)
    {
      return new DateTime(date.Year, date.Month, DateTime.DaysInMonth(date.Year, date.Month));
    }

    public static DateTime GetMonthStartDate(DateTime date)
    {
      return new DateTime(date.Year, date.Month, 1);
    }

    public static bool CurrentDateIsBetweenContractStartAndEndDate(Contract contract)
    {
      var currentDate = DateTime.Now;
      return contract.EndDate == null || contract.StartDate <= currentDate && contract.EndDate >= currentDate;
    }

    public static bool EventContainsEventDatesThatHappenDuringMonth(ICollection<EventDate> eventDates, DateTime date)
    {
      return eventDates.Any(eventDate => EventDateFallsWithinMonth(date, eventDate));
    }

    public static bool EventDateFallsWithinMonth(DateTime date, EventDate eventDate)
    {
      return EventDateHappensDuringMonth(date, eventDate) && EventDateIsInTheSameYear(date, eventDate);
    }

    public static bool EventDateIsInTheSameYear(DateTime date, EventDate eventDate)
    {
      return (eventDate.StartDate.Year == date.Year || eventDate.EndDate.Year == date.Year);
    }

    public static bool EventDateHappensDuringMonth(DateTime date, EventDate eventDate)
    {
      return (eventDate.StartDate.Month == date.Month) || (eventDate.EndDate.Month == date.Month);
    }

    public static bool DateRangesOverlap(DateTime startDateOfRange1, DateTime endDateOfRange1,
      DateTime startDateOfRange2, DateTime endDateOfRange2)
    {
      return
      (startDateOfRange1 <= startDateOfRange2 && endDateOfRange1 >= endDateOfRange2) ||
      (startDateOfRange1 <= startDateOfRange2 && DateIsBetweenRangeOfDates(endDateOfRange1, startDateOfRange2, endDateOfRange2)) ||
      (startDateOfRange1 >= startDateOfRange2 && endDateOfRange1 <= endDateOfRange2) ||
      (DateIsBetweenRangeOfDates(startDateOfRange1, startDateOfRange2, endDateOfRange2) && endDateOfRange1 >= endDateOfRange2);
    }

    public static bool ContractIsActiveDuringDate(Contract contract, DateTime date)
    {
      return (contract.EndDate.HasValue && DateIsBetweenRangeOfDates(date, contract.StartDate, contract.EndDate.Value)) ||
             (!contract.EndDate.HasValue && contract.StartDate < date);
    }

    public static bool ContractIsActiveDuringRangeOfDates(Contract contract, DateTime startOfRange, DateTime endOfRange)
    {
      return (contract.EndDate.HasValue && DateRangesOverlap(contract.StartDate, contract.EndDate.Value, startOfRange, endOfRange)) ||
             (!contract.EndDate.HasValue && contract.StartDate < endOfRange);
    }
  }
}