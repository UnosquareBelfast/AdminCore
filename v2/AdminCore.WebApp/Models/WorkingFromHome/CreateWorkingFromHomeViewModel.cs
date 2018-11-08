using AdminCore.DAL.Models;

namespace AdminCore.WebApi.Models.WorkingFromHome
{
  public class CreateWorkingFromHomeViewModel
  {
    public int EmployeeId { get; set; }

    public EventDates EventDates { get; set; }
  }
}