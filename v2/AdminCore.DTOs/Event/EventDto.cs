using AdminCore.DTOs.Employee;
using AdminCore.DTOs.EventDates;
using System;
using System.Collections.Generic;

namespace AdminCore.DTOs.Event
{
  public class EventDto
  {
    public DateTime DateCreated { get; set; }

    public EmployeeDto Employee { get; set; }

    public IList<EventDatesDto> EventDates { get; set; }

    public int EventId { get; set; }

    public String EventStatusDescription { get; set; }

    public int EventStatusId { get; set; }

    public String EventTypeDescription { get; set; }

    public int EventTypeId { get; set; }

    public bool IsHalfDay { get; set; }

    public DateTime LastModified { get; set; }

    public EventMessageDto LatestMessage { get; set; }

    public TeamDto Team { get; set; }
  }
}