using AdminCore.DAL.Models;
using System;

namespace AdminCore.WebApi.Models.WorkingFromHome
{
  public class WorkingFromHomeViewModel
  {
    private DateTime dateCreated;
    private EmployeeDTO employee;
    private EventDates eventDates;
    private int eventId;
    private String eventStatusDescription;
    private int eventStatusId;
    private DateTime lastModified;
  }
}