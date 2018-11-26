using AdminCore.Common.Interfaces;
using AdminCore.DAL;
using AdminCore.DTOs.Client;
using AutoMapper;
using System;
using System.Collections.Generic;

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

    public IList<ClientDto> GetAll()
    {
      var clients = _dbContext.ClientRepository.Get();
      var clientDtos = _mapper.Map<IList<ClientDto>>(clients);
      return clientDtos;
    }

    public void Update(ClientDto newClientInfo)
    {
      var oldClientInfo = _dbContext.ClientRepository.GetById(newClientInfo.ClientId);
      oldClientInfo.ClientName = newClientInfo.ClientName;
      _dbContext.SaveChanges();
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