using AdminCore.WebApi.Models.Employee;
using AdminCore.WebApi.Models.Event;
using AdminCore.WebApi.Models.EventMessage;
using System;
using System.Collections.Generic;

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

    public ICollection<EventMessageViewModel> EventMessages { get; set; }

    public string LatestMessage { get; set; }

    public DateTime LastModified { get; set; }

    public DateTime DateCreated { get; set; }
  }
}