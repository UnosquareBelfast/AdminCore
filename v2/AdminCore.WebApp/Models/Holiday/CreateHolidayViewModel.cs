using AdminCore.Constants.Enums;
using AdminCore.DAL.Models;

namespace AdminCore.WebApi.Models.Holiday
{
  public class CreateHolidayViewModel
  {
    public EventTypes EventType { get; set; }
  }
}