using AdminCore.DAL.Models;

namespace AdminCore.WebApi.Models.Holiday
{
  public class UpdateHolidayViewModel
  {
    public int EventId { get; set; }

    public EventDate EventDates { get; set; }

    public bool IsHalfDay { get; set; }
  }
}