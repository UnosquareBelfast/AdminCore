using System;
using System.Collections.Generic;
using AdminCore.DTOs.Employee;
using AdminCore.DTOs.EventDates;
using AdminCore.DTOs.Team;

namespace AdminCore.DTOs.Event
{
  public class EventDto
  {
    public DateTime DateCreated { get; set; }

    public int EmployeeId { get; set; }

    public EmployeeDto Employee { get; set; }

    public ICollection<EventDateDto> EventDates { get; set; }

    public int EventId { get; set; }

    public string EventStatusDescription { get; set; }

    public int EventStatusId { get; set; }

    public string EventTypeDescription { get; set; }

    public int EventTypeId { get; set; }

    public bool IsHalfDay { get; set; }

    public DateTime LastModified { get; set; }

    public EventMessageDto LatestMessage { get; set; }

    public TeamDto Team { get; set; }
  }
}