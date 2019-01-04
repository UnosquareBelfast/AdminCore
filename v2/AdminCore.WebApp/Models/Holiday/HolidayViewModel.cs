using System;
using System.Collections.Generic;
using AdminCore.DAL.Models;
using AdminCore.WebApi.Models.Employee;

namespace AdminCore.WebApi.Models.Holiday
{
  public class HolidayViewModel
  {
    public int EventId { get; set; }

    public ICollection<EventDate> EventDate { get; set; }

    public EmployeeViewModel Employee { get; set; }

    public EventStatus EventStatus { get; set; }

    public EventType EventType { get; set; }

    public bool IsHalfDay { get; set; }

    public DateTime LastModified { get; set; }

    public DateTime DateCreated { get; set; }
  }
}