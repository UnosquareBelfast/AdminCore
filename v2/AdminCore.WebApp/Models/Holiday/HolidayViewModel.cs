using System;
using AdminCore.DAL.Models;

namespace AdminCore.WebApi.Models.Holiday
{
  public class HolidayViewModel
  {
    public int EventId { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public EmployeeViewModel Employee { get; set; }

    public EventStatus EventStatus { get; set; }

    public bool IsHalfDay { get; set; }

    public DateTime LastModified { get; set; }

    public DateTime DateCreated { get; set; }
  }
}