using System;

namespace AdminCore.DTOs.EventDates
{
  public class EventDateDto
  {
    public int EventDateId { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }
  }
}