using System.Collections.Generic;
using AdminCore.DAL.Models.Message;
using AdminCore.DTOs.Client;

namespace AdminCore.Common.Interfaces
{
  public interface IClientService
  {
    ResponseMessage<IList<ClientDto>> GetAll();

    ResponseMessage<string> Update(ClientDto clientDto);

    void Create(ClientDto clientDto);

    void Save(ClientDto clientDto);

    void Delete(int id);

    ClientDto Get(int id);

    ClientDto GetByClientName(string clientName);
  }
}