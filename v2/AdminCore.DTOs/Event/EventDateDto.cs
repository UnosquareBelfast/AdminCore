using System;

namespace AdminCore.DTOs.Event
{
  public class EventDateDto
  {
    public int EventDateId { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public bool IsHalfDay { get; set; }

    public EventDto Event { get; set; }

    public int EventId { get; set; }
  }
}