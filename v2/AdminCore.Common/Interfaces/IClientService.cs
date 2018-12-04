using System.Collections.Generic;
using AdminCore.DTOs.Client;

namespace AdminCore.Common.Interfaces
{
  public interface IClientService
  {
    IList<ClientDto> GetAll();

    void Save(ClientDto clientDto);

    void Delete(int id);

    ClientDto GetByClientId(int id);

    IList<ClientDto> GetByClientName(string clientName);
  }
}