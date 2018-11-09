using AdminCore.DAL.Models;
using System;

namespace AdminCore.WebApi.Models.WorkingFromHome
{
  public class WorkingFromHomeViewModel
  {
    public DateTime DateCreated { get; set; }

    public EmployeeDTO Employee { get; set; }

    public EventDates EventDates { get; set; }

    public int EventId { get; set; }

    public String EventStatusDescription { get; set; }

    public int EventStatusId { get; set; }

    public DateTime LastModified { get; set; }
  }
}