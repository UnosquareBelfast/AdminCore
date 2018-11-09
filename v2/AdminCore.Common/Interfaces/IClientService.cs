using AdminCore.DTOs.Client;
using System.Collections.Generic;

namespace AdminCore.Common.Interfaces
{
  public interface IClientService
  {
    IList<ClientDto> GetAll();

    void Update(ClientDto clientDto);

    void Create(ClientDto clientDto);

    void Save(ClientDto clientDto);

    void Delete(int id);

    ClientDto Get(int id);

    ClientDto GetByClientName(string clientName);
  }
}