using System;
using AdminCore.Constants.Enums;

namespace AdminCore.WebApi.Models.WorkingFromHome
{
  public class CreateWorkingFromHomeViewModel
  {
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
  }
}