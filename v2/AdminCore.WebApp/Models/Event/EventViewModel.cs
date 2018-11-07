using System;
using System.Collections.Generic;
using AdminCore.DAL.Models;

namespace AdminCore.WebApi.Models.Event
{
  public class EventViewModel
  {
    public int EventId { get; set; }

    public IList<EventDates> EventDates { get; set; }

    public EmployeeViewModel Employee { get; set; }

    public EventStatus EventStatus { get; set; }

    public bool IsHalfDay { get; set; }

    public DateTime LastModified { get; set; }

    public DateTime DateCreated { get; set; }
  }
}