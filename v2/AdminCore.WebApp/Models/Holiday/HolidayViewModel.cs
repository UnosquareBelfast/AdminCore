using System;
using System.Collections.Generic;
using AdminCore.DAL.Models;
using AdminCore.WebApi.Models.Employee;
using AdminCore.WebApi.Models.Event;

namespace AdminCore.WebApi.Models.Holiday
{
  public class HolidayViewModel
  {
    public int EventId { get; set; }

    public ICollection<EventDateViewModel> EventDates { get; set; }

    public EmployeeViewModel Employee { get; set; }

    public EventStatusViewModel EventStatus { get; set; }

    public EventTypeViewModel EventType { get; set; }

    public bool IsHalfDay { get; set; }

    public DateTime LastModified { get; set; }

    public DateTime DateCreated { get; set; }
  }
}