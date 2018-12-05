using System;
using System.Collections.Generic;
using AdminCore.DTOs.Employee;
using AdminCore.DTOs.EventDates;
using AdminCore.DTOs.Team;

namespace AdminCore.DTOs.Event
{
  public class EventDto
  {
    public int EventId { get; set; }
    
    public int EmployeeId { get; set; }
    
    public EmployeeDto EmployeeDto { get; set; }

    public DateTime DateCreated { get; set; }
    
    public int EventStatusId { get; set; }
    
    public EventStatusDto EventStatusDto { get; set; }
    
    public int EventTypeId { get; set; }
    
    public EventTypeDto EventTypeDto { get; set; }
    
    public ICollection<EventMessageDto> EventMessageDtos { get; set; }
    
    public string LatestMessage { get; set; }

    public ICollection<EventDateDto> EventDates { get; set; }
   
    public DateTime LastModified { get; set; }
  }
}