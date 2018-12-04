using System.Collections;
using System.Collections.Generic;
using AdminCore.Constants.Enums;
using AdminCore.DAL.Models;

namespace AdminCore.WebApi.Models.Holiday
{
  public class CreateHolidayViewModel
  {
    public DateViewModel DateRange { get; set; }

    public int EmployeeId { get; set; }
  }
}