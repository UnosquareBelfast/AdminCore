using System;
using System.Collections.Generic;
using AdminCore.Common.Interfaces;
using AdminCore.DTOs.Client;

namespace AdminCore.Services
{
  public class ClientService : IClientService
  {
    public IList<ClientDto> GetAll()
    {
      throw new NotImplementedException();
    }

    public void Update(ClientDto clientDto)
    {
      throw new NotImplementedException();
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