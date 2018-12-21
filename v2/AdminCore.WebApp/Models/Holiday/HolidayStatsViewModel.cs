namespace AdminCore.WebApi.Models.Holiday
{
  public class HolidayStatsViewModel
  {
    public double AvailableHolidays { get; set; }

    public double PendingHolidays { get; set; }

    public double ApprovedHolidays { get; set; }

    public double TotalHolidays { get; set; }
  }
}