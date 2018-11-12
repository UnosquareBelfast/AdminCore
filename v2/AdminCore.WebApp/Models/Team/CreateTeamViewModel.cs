namespace AdminCore.WebApi.Models.Team
{
  public class CreateTeamViewModel
  {
    public int clientId { get; set; }
    public int teamId { get; set; }
    public string teamName { get; set; }
  }
}