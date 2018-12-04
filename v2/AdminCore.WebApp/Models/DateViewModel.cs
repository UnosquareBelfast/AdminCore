using System;

namespace AdminCore.WebApi.Models
{
  public class DateViewModel
  {
    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public bool IsHalfDay { get; set; }
  }
}