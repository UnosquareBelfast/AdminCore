namespace AdminCore.WebApi.Models.Event
{
  public class HolidayStatsViewModel
  {
    public double AvailableHolidays { get; set; }

    public double PendingHolidays { get; set; }

    public double ApprovedHolidays { get; set; }

    public double TotalHolidays { get; set; }
  }
}