using System;

namespace AdminCore.WebApi.Models.Event
{
  public class UpdateEventViewModel
  {
    public int EventId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public bool IsHalfDay { get; set; }
    public string Message { get; set; }
  }
}