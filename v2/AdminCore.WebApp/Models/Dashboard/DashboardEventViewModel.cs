using AdminCore.DTOs.Event;
using AdminCore.DTOs.EventMessage;
using System;
using System.Collections.Generic;

namespace AdminCore.WebApi.Models.Dashboard
{
  public class DashboardEventViewModel
  {
    public int EventId { get; set; }

    public int EmployeeId { get; set; }

    public DateTime DateCreated { get; set; }

    public int EventStatusId { get; set; }

    public int EventTypeId { get; set; }

    public ICollection<EventMessageDto> EventMessages { get; set; }

    public string LatestMessage { get; set; }

    public ICollection<EventDateDto> EventDates { get; set; }

    public DateTime LastModified { get; set; }
  }
}