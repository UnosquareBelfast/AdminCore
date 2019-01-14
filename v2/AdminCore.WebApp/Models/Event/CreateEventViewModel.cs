using System;

namespace AdminCore.WebApi.Models.Event
{
  public class CreateEventViewModel
  {
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public bool IsHalfDay { get; set; }
  }
}