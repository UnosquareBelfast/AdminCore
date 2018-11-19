using System;

namespace AdminCore.DTOs.EventDates
{
  public class EventDateDto
  {
    public int EventDateId { get; set; }

    public DateTime startDate { get; set; }

    public DateTime endDate { get; set; }
  }
}