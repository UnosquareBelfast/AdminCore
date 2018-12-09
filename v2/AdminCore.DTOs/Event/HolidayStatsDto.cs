namespace AdminCore.DTOs.Event
{
  public class HolidayStatsDto
  {
    public int AvailableHolidays { get; set; }

    public int PendingHolidays { get; set; }

    public int ApprovedHolidays { get; set; }

    public int TotalHolidays { get; set; }
  }
}