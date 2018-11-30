using AdminCore.Common.Interfaces;
using AdminCore.DAL;
using AdminCore.DTOs.Client;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using AdminCore.Common.Message;
using AdminCore.Common.Message.Elements;
using AdminCore.DAL.Models;

namespace AdminCore.Services
{
  public class ClientService : IClientService
  {
    private readonly IDatabaseContext _dbContext;
    private readonly IMapper _mapper;

    public ClientService(IDatabaseContext dbContext, IMapper mapper)
    {
      _dbContext = dbContext;
      _mapper = mapper;
    }

    public ResponseMessage<IList<ClientDto>> GetAll()
    {
      var clients = _dbContext.ClientRepository.Get();
      var clientDtos = _mapper.Map<IList<ClientDto>>(clients);
      return clientDtos.Any() ? new ResponseMessage<IList<ClientDto>>(clientDtos) : new ResponseMessage<IList<ClientDto>>(null).WithStatus(MessageConstants.MsgStatusNoRecords);
    }

    public ResponseMessage<EmptyMessage> Update(ClientDto newClientInfo)
    {
      var oldClientInfo = _dbContext.ClientRepository.GetSingle(x => x.ClientId == newClientInfo.ClientId);
      return oldClientInfo != null
        ? UpdateClientNameAndSaveToDb(oldClientInfo, newClientInfo)
        : ReturnUpdateFailedNotFoundError(); 
    }

    public ResponseMessage<ClientDto> Create(ClientDto clientDto)
    {
      try
      {
        var newClientEntry = _mapper.Map<Client>(clientDto);
        var insertedClientEntry = _dbContext.ClientRepository.Insert(newClientEntry);
        _dbContext.SaveChanges();
        var insertedClientDto = _mapper.Map<ClientDto>(insertedClientEntry);
        return new ResponseMessage<ClientDto>(insertedClientDto);
      }
      catch (Exception)
      {
        return new ResponseMessage<ClientDto>(null).WithStatus(MessageConstants.MsgStatusFailed);
      }
    }

    public ResponseMessage<EmptyMessage> Save(ClientDto clientDto)
    {
      throw new NotImplementedException();
    }

    public ResponseMessage<EmptyMessage> Delete(int id)
    {
      throw new NotImplementedException();
    }

    public ResponseMessage<ClientDto> GetByClientId(int id)
    {
      var clientListReturnedFromDb =_dbContext.ClientRepository.Get(x => x.ClientId == id);
      if (clientListReturnedFromDb.Any())
      {
        var clientDto = _mapper.Map<ClientDto>(clientListReturnedFromDb.First());
        return new ResponseMessage<ClientDto>(clientDto);
      }
      else
      {
        return new ResponseMessage<ClientDto>(null).WithStatus(MessageConstants.MsgStatusNoRecords);
      }
    }

    public ResponseMessage<IList<ClientDto>> GetByClientName(string clientName)
    {
      var clientListReturnedFromDb = _dbContext.ClientRepository.Get(x => x.ClientName == clientName);
      if (clientListReturnedFromDb.Any())
      {
        var clientDtos = _mapper.Map<IList<ClientDto>>(clientListReturnedFromDb);
        return new ResponseMessage<IList<ClientDto>>(clientDtos);
      }
      else
      {
        return new ResponseMessage<IList<ClientDto>>(null).WithStatus(MessageConstants.MsgStatusNoRecords);
      }
    }

    private ResponseMessage<EmptyMessage> ReturnUpdateFailedNotFoundError()
    {
      return ResponseMessage<EmptyMessage>.CreateEmptyResponse().WithStatus(MessageConstants.MsgStatusNoRecords);
    }

    private ResponseMessage<EmptyMessage> UpdateClientNameAndSaveToDb(Client oldClientInfo, ClientDto newClientInfo)
    {
      oldClientInfo.ClientName = newClientInfo.ClientName;
      _dbContext.SaveChanges();
      return ResponseMessage<EmptyMessage>.CreateEmptyResponse();
    }
  }
}