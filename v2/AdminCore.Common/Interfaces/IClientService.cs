using AdminCore.DTOs.Client;
using System.Collections.Generic;

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