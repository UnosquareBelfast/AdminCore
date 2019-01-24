using System;
using System.Collections.Generic;
using System.Text;

namespace AdminCore.DTOs.Dashboard
{
  public class ClientSnapshotDto
  {
    public int ClientId { get; set; }

    public string ClientName { get; set; }

    public ICollection<TeamSnapshotDto> Teams { get; set; }
  }
}
