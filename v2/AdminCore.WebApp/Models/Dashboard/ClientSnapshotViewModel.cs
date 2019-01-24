using System.Collections.Generic;

namespace AdminCore.WebApi.Models.Dashboard
{
  public class ClientSnapshotViewModel
  {
    public int ClientId { get; set; }

    public string ClientName { get; set; }

    public ICollection<TeamSnapshotViewModel> Teams { get; set; }
  }
}