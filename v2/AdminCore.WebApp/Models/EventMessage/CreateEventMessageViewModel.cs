using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminCore.WebApi.Models.EventMessage
{
  public class CreateEventMessageViewModel
  {
    public int EventId { get; set; }
    public string Message { get; set; }
  }
}