using AdminCore.Common.Interfaces;
using AdminCore.DAL;
using AdminCore.DTOs.Client;
using AutoMapper;
using System;
using System.Collections.Generic;
using AdminCore.DAL.Models;
using AdminCore.Services.Base;

namespace AdminCore.Services
{
  public class ClientService : BaseService, IClientService
  {
    private readonly IMapper _mapper;

    public ClientService(IDatabaseContext databaseContext, IMapper mapper) 
      : base(databaseContext)
    {
      _mapper = mapper;
    }

    public IList<ClientDto> GetAll()
    {
      var clients = DatabaseContext.ClientRepository.Get();
      return _mapper.Map<IList<ClientDto>>(clients);
    }

    public void Save(ClientDto clientDto)
    {
        if (clientDto.ClientId == 0)
        {
          var newClientEntry = _mapper.Map<Client>(clientDto);
          DatabaseContext.ClientRepository.Insert(newClientEntry);
        }
        else
        {
          var client = GetByClientId(clientDto.ClientId);
          client.ClientName = clientDto.ClientName;
        }
     
        DatabaseContext.SaveChanges();
    }

    public void Delete(int id)
    {
      var clientToDelete = DatabaseContext.ClientRepository.GetSingle(x => x.ClientId == id);
      if (clientToDelete != null)
      {
        DatabaseContext.ClientRepository.Delete(clientToDelete);
        DatabaseContext.SaveChanges();
      }
    }

    public ClientDto GetByClientId(int id)
    {
      var client = DatabaseContext.ClientRepository.GetSingle(x => x.ClientId == id);
      return _mapper.Map<ClientDto>(client);
    }

    public IList<ClientDto> GetByClientName(string clientName)
    {
      var client = DatabaseContext.ClientRepository.GetSingle(x =>
        x.ClientName.Equals(clientName, StringComparison.CurrentCultureIgnoreCase));
      return _mapper.Map<IList<ClientDto>>(client);
    }
  }
}