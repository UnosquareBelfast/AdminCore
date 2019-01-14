using AdminCore.DTOs.Employee;
using System;

namespace AdminCore.DTOs.EventMessage
{
  public class EventMessageDto
  {
    public int EventMessageId { get; set; }

    public int EventId { get; set; }

    public EmployeeDto Employee { get; set; }

    public string Message { get; set; }

    public DateTime LastModified { get; set; }
  }
}