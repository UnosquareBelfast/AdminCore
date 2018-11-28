using AdminCore.Common.Interfaces;
using AdminCore.DAL;
using AdminCore.DTOs.Client;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Reflection.Metadata.Ecma335;
using AdminCore.DAL.Models;
using AdminCore.DAL.Models.Message;

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
      return new ResponseMessage<IList<ClientDto>>(clientDtos);
    }

    public ResponseMessage<string> Update(ClientDto newClientInfo)
    {
      var oldClientInfo = _dbContext.ClientRepository.GetSingle(x => x.ClientId == newClientInfo.ClientId);
      return oldClientInfo != null
        ? UpdateClientNameAndSaveToDb(oldClientInfo, newClientInfo)
        : ReturnUpdateFailed_NotFoundError(newClientInfo); 
    }

    private ResponseMessage<string> ReturnUpdateFailed_NotFoundError(ClientDto newClientInfo)
    {
      return new ResponseMessage<string>($"Client with ID {newClientInfo.ClientId} could not be found")
      {
        Status = MessageConstants.MsgStatusNoRecords
      };
    }

    private ResponseMessage<string> UpdateClientNameAndSaveToDb(Client oldClientInfo, ClientDto newClientInfo)
    {
      oldClientInfo.ClientName = newClientInfo.ClientName;
      _dbContext.SaveChanges();
      return new ResponseMessage<string>($"Client with ID {newClientInfo.ClientId}'s name has been updated to '{newClientInfo.ClientName}'");
    }

    public void Create(ClientDto clientDto)
    {
      throw new NotImplementedException();
    }

    public void Save(ClientDto clientDto)
    {
      throw new NotImplementedException();
    }

    public void Delete(int id)
    {
      throw new NotImplementedException();
    }

    public ClientDto Get(int id)
    {
      throw new NotImplementedException();
    }

    public ClientDto GetByClientName(string clientName)
    {
      throw new NotImplementedException();
    }
  }
}