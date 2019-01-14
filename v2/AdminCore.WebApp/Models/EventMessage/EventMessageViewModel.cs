using System;
using AdminCore.WebApi.Models.Employee;

namespace AdminCore.WebApi.Models.EventMessage
{
  public class EventMessageViewModel
  {
    public int EventMessageId { get; set; }

    public int EventId { get; set; }

    public EmployeeViewModel Employee { get; set; }

    public string Message { get; set; }

    public DateTime LastModified { get; set; }
  }
}