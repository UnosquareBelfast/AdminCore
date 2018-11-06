using AdminCore.Common.Interfaces;
using AdminCore.DAL;
using AdminCore.DTOs.Client;
using AutoMapper;
using System.Collections.Generic;

namespace AdminCore.Services
{
  public class ClientService : IClientService
  {
    private readonly IDatabaseContext _databaseContext;

    private readonly IMapper _mapper;

    public IList<ClientDto> GetAll()
    {
      throw new System.NotImplementedException();
    }

    public void UpdateClient(ClientDto clientDto)
    {
      throw new System.NotImplementedException();
    }

    public void CreateClient(ClientDto clientDto)
    {
      throw new System.NotImplementedException();
    }

    public void SaveClient(ClientDto clientDto)
    {
      throw new System.NotImplementedException();
    }

    public void DeleteClient(int clientId)
    {
      throw new System.NotImplementedException();
    }

    public ClientDto GetClientById(int clientId)
    {
      throw new System.NotImplementedException();
    }

    public ClientDto GetClientByClientNameContaining(string clientName)
    {
      throw new System.NotImplementedException();
    }
  }
}