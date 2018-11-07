using System.Collections.Generic;
using AdminCore.DTOs.Client;

namespace AdminCore.Common.Interfaces
{
  public interface IClientService
  {
    IList<ClientDto> GetAll();

    void UpdateClient(ClientDto clientDto);
  }
}