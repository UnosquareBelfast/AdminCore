using System;

namespace AdminCore.WebApi.Models.Holiday
{
  public class CreateHolidayViewModel
  {
    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public bool IsHalfDay { get; set; }
  }
}