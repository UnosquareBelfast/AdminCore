namespace AdminCore.WebApi.Models.Team
{
  public class CreateTeamViewModel
  {
    public int ClientId { get; set; }
    public int TeamId { get; set; }
    public string TeamName { get; set; }
  }
}