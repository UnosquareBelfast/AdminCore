using System;
using AdminCore.Common.Interfaces;
using AdminCore.DTOs.Client;
using AdminCore.WebApi.Controllers;
using AdminCore.WebApi.Models.Client;
using AutoFixture;
using AutoMapper;
using NSubstitute;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using AdminCore.DAL;
using AdminCore.DAL.Models;
using AdminCore.DAL.Models.Message;
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

    public ClientControllerTests()
    {
      _mapper = Substitute.For<IMapper>();
      _clientService = Substitute.For<IClientService>();
      _fixture = new Fixture();
      _controller = new ClientController(_clientService, _mapper);
    }

    [Fact]
    public void GetAllClient_WhenCalled_ReturnsAllClients()
    {
      // Arrange
      const int numberOfClients = 9;

      var clientViewModels = _fixture.CreateMany<ClientViewModel>(numberOfClients).ToList();
      var clientDtos = _fixture.CreateMany<ClientDto>(numberOfClients).ToList();

      var clientsResponseMessage = new ResponseMessage<IList<ClientDto>>(clientDtos);

      _clientService.GetAll().Returns(clientsResponseMessage);

      _mapper.Map<List<ClientViewModel>>(Arg.Is(clientDtos)).Returns(clientViewModels);

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
      const string name = "Niall";
      var successMsg = $"Client with ID {testId}'s name has been updated to '{name}'";

      var updateClientViewModel = new UpdateClientViewModel()
      {
        ClientId = testId,
        ClientName = name
      };

      var clientDtoMappedFromViewModel = new ClientDto()
      {
        ClientId = testId,
        ClientName = name
      };

      //Setup Mocks
      var updateResponseMessage = new ResponseMessage<string>(successMsg);
      _clientService.Update(clientDtoMappedFromViewModel).Returns(updateResponseMessage);
      _mapper.Map<ClientDto>(Arg.Is(updateClientViewModel)).Returns(clientDtoMappedFromViewModel);

      // Act
      _controller.UpdateClient(updateClientViewModel);

      // Assert
      _clientService.Received(1).Update(clientDtoMappedFromViewModel);

    }
  }
}