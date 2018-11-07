using AdminCore.DTOs.Client;
using System.Collections.Generic;

namespace AdminCore.Common.Interfaces
{
  public interface IClientService
  {
    IList<ClientDto> GetAll();

    void UpdateClient(ClientDto clientDto);

    void CreateClient(ClientDto clientDto);

    void SaveClient(ClientDto clientDto);

    void DeleteClient(int id);

    ClientDto GetClientById(int id);

    ClientDto GetClientByClientName(string clientName);
  }
}