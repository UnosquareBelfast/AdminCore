namespace AdminCore.DTOs.Event
{
  public class HolidayStatsDto
  {
    public double AvailableHolidays { get; set; }

    public double PendingHolidays { get; set; }

    public double ApprovedHolidays { get; set; }

    public double TotalHolidays { get; set; }
  }
}