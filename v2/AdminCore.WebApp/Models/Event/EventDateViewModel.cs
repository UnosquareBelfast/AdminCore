using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AdminCore.DTOs.Event;

namespace AdminCore.WebApi.Models.Event
{
  public class EventDateViewModel
  {
    public int EventDateId { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public bool IsHalfDay { get; set; }

    public int EventId { get; set; }
  }
}