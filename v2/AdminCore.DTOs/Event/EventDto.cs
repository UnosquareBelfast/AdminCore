using System;
using System.Collections.Generic;
using AdminCore.DTOs.Employee;
using AdminCore.DTOs.EventDates;

namespace AdminCore.DTOs.Event
{
  public class EventDto
  {
    public int EventId { get; set; }

    public IList<EventDatesDto> EventDates { get; set; }

    public int EventTypeID { get; set; }

    public String EventTypeDescription { get; set; }

    public int EventStatusId { get; set; }

    public String EventStatusDescription { get; set; }

    public EmployeeDto Employee { get; set; }

    public bool IsHalfDay { get; set; }

    public DateTime LastModified { get; set; }

    public DateTime DateCreated { get; set; }

    public TeamDto Team { get; set; }

    public EventMessageDto LatestMessage { get; set; }
  }
}