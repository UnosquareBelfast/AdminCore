using AdminCore.DTOs.Client;
using System.Collections.Generic;

namespace AdminCore.Common.Interfaces
{
  public interface IClientService
  {
    IList<ClientDto> GetAll();

    void UpdateClient(ClientDto);

    void CreateClient(ClientDto clientDto);

    void SaveClient(ClientDto clientDto);

    void DeleteClient(int clientId);

    ClientDto GetClientById(int clientId);

    ClientDto GetClientByClientNameContaining(string clientName);
  }
}