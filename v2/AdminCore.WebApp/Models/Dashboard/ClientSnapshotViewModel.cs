using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace AdminCore.WebApi.Models.Dashboard
{
  public class ClientSnapshotViewModel
  {
    public int ClientId { get; set; }

    public string ClientName { get; set; } 

    public ICollection<TeamSnapshotViewModel> Teams { get; set; }
  }
}
