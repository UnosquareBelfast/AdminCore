using AdminCore.DAL.Models;
using AdminCore.WebApi.Models.Employee;
using System;
using System.Collections.Generic;

namespace AdminCore.WebApi.Models.WorkingFromHome
{
  public class WorkingFromHomeViewModel
  {
    public int EventId { get; set; }

    public ICollection<EventDate> EventDates { get; set; }

    public EmployeeViewModel Employee { get; set; }

    public EventStatus EventStatus { get; set; }

    public EventType EventType { get; set; }

    public bool IsHalfDay { get; set; }

    public DateTime LastModified { get; set; }

    public DateTime DateCreated { get; set; }
  }
}