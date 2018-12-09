namespace AdminCore.WebApi.Models.Holiday
{
  public class HolidayStatsViewModel
  {
    public int AvailableHolidays { get; set; }

    public int PendingHolidays { get; set; }

    public int ApprovedHolidays { get; set; }

    public int TotalHolidays { get; set; }
  }
}