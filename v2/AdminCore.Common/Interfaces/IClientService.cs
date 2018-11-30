using System.Collections.Generic;
using AdminCore.Common.Message;
using AdminCore.Common.Message.Elements;
using AdminCore.DTOs.Client;

namespace AdminCore.Common.Interfaces
{
  public interface IClientService
  {
    ResponseMessage<IList<ClientDto>> GetAll();

    ResponseMessage<EmptyMessage> Update(ClientDto clientDto);

    ResponseMessage<ClientDto> Create(ClientDto clientDto);

    ResponseMessage<EmptyMessage> Save(ClientDto clientDto);

    ResponseMessage<EmptyMessage> Delete(int id);

    ResponseMessage<ClientDto> GetByClientId(int id);

    ResponseMessage<IList<ClientDto>> GetByClientName(string clientName);
  }
}