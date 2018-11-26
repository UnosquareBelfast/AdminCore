using AdminCore.Common.Interfaces;
using AdminCore.DTOs.Client;
using AdminCore.WebApi.Controllers;
using AdminCore.WebApi.Models.Client;
using AutoFixture;
using AutoMapper;
using NSubstitute;
using System.Collections.Generic;
using System.Linq;
using AdminCore.DAL;
using AdminCore.DAL.Models;
using AdminCore.Services;
using Xunit;

namespace AdminCore.WebApi.Tests.Controllers
{
  public class ClientControllerTests : BaseControllerTest
  {
    private readonly IClientService _clientService;
    private readonly ClientController _controller;
    private readonly IFixture _fixture;
    private readonly IMapper _mapper;
    private IDatabaseContext _dbContext;

    public ClientControllerTests()
    {
      _dbContext = Substitute.For<IDatabaseContext>();
      _mapper = Substitute.For<IMapper>();
      _clientService = new ClientService(_dbContext, _mapper);
      _fixture = new Fixture();
      _controller = new ClientController(_clientService, _mapper);
    }

    [Fact]
    public void GetAllClient_WhenCalled_ReturnsAllClients()
    {
      // Arrange
      const int numberOfClients = 9;

      var clients = _fixture.CreateMany<Client>(numberOfClients).ToList();
      var clientViewModels = _fixture.CreateMany<ClientViewModel>(numberOfClients).ToList();
      var clientDtos = _fixture.CreateMany<ClientDto>(numberOfClients).ToList();

      _dbContext.ClientRepository.Get().Returns(clients);

      _mapper.Map<List<ClientViewModel>>(Arg.Is(clientDtos)).Returns(clientViewModels);
      _mapper.Map<IList<ClientDto>>(Arg.Is(clients)).Returns(clientDtos);

      // Act
      var result = _controller.GetAllClients();

      // Assert
      var resultValue = RetrieveValueFromActionResult<List<ClientViewModel>>(result);
      Assert.Equal(resultValue.Count(), numberOfClients);
    }

    [Fact]
    public void TestUpdateClientChangesClientNameFromNotNiallToNiall()
    {
      // Arrange
      const int testId = 1;
      const string newName = "Niall";
      const string oldName = "Not Niall";

      var updateClientViewModel = new UpdateClientViewModel()
      {
        ClientId = testId,
        ClientName = newName
      };

      var clientDtoMappedFromViewModel = new ClientDto()
      {
        ClientId = testId,
        ClientName = newName
      };

      var clientResultReturnedFromDb = new Client()
      {
        ClientId = testId,
        ClientName = oldName
      };

      //Setup Mocks
      _dbContext.ClientRepository.GetById(testId).Returns(clientResultReturnedFromDb);
      _mapper.Map<ClientDto>(Arg.Is(updateClientViewModel)).Returns(clientDtoMappedFromViewModel);

      // Act
      var result = _controller.UpdateClient(updateClientViewModel);

      // Assert
      var resultValue = RetrieveValueFromActionResult<string>(result);

      Assert.Equal(newName, clientResultReturnedFromDb.ClientName);
      Assert.Equal($"Client with ID {testId}'s name has been updated to {newName}", resultValue);
    }
  }
}