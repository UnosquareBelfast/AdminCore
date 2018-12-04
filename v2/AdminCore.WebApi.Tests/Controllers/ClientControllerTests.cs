/*using System;
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
using System.Net;
using AdminCore.Common.Message;
using AdminCore.Common.Message.Elements;
using AdminCore.DAL;
using AdminCore.DAL.Models;
using AdminCore.Services;
using Xunit;
using ClientDto = AdminCore.DTOs.Client.ClientDto;

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
      var updateResponseMessage = new ResponseMessage<EmptyMessage>(new EmptyMessage());
      _clientService.Update(clientDtoMappedFromViewModel).Returns(updateResponseMessage);
      _mapper.Map<ClientDto>(Arg.Is(updateClientViewModel)).Returns(clientDtoMappedFromViewModel);

      // Act
      _controller.UpdateClient(updateClientViewModel);

      // Assert
      _clientService.Received(1).Update(clientDtoMappedFromViewModel);

    }

    [Fact]
    public void TestCreateClientReturnsOkResponseWhenClientServiceReturnsSuccess()
    {
      const string testName = "testName";

      var createClientViewModel = new CreateClientViewModel()
      {
        ClientName = testName
      };

      var clientDtoPassedToService = new ClientDto()
      {
        ClientName = testName
      };

      var clientDtoReturnedFromService = new ClientDto()
      {
        ClientId = 1,
        ClientName = testName
      };

      var clientViewModelPassedToUi = new ClientViewModel()
      {
        ClientId = 1,
        ClientName = testName
      };

      _mapper.Map<ClientDto>(createClientViewModel).Returns(clientDtoPassedToService);
      _mapper.Map<ClientViewModel>(clientDtoReturnedFromService).Returns(clientViewModelPassedToUi);
      _clientService.Create(clientDtoPassedToService).Returns(new ResponseMessage<ClientDto>(clientDtoReturnedFromService));

      var result = _controller.CreateClient(createClientViewModel);

      VerifyActionResult(result);
      _clientService.Received(1).Create(clientDtoPassedToService);
    }

    [Fact]
    public void TestCreateClientReturnsStatusCode500ResponseWhenClientServiceReturnsFailure()
    {
      const string testName = "testName";

      var createClientViewModel = new CreateClientViewModel()
      {
        ClientName = testName
      };

      var clientDtoPassedToService = new ClientDto()
      {
        ClientName = testName
      };

      _mapper.Map<ClientDto>(createClientViewModel).Returns(clientDtoPassedToService);
      _clientService.Create(clientDtoPassedToService).Returns(new ResponseMessage<ClientDto>(null).WithStatus(MessageConstants.MsgStatusFailed));

      var result = _controller.CreateClient(createClientViewModel);

      VerifyActionResult(result, HttpStatusCode.InternalServerError);
      _clientService.Received(1).Create(clientDtoPassedToService);
    }

    [Fact]
    public void TestGetClientByIdReturnsOkResponseWhenClientServiceReturnsAResult()
    {
      const int testId = 1;
      const string testName = "Client";

      ClientViewModel viewModelReturned = new ClientViewModel()
      {
        ClientId = testId,
        ClientName = testName
      };

      ClientDto clientDtoReturned = new ClientDto()
      {
        ClientId = testId,
        ClientName = testName
      };

      _mapper.Map<ClientViewModel>(clientDtoReturned).Returns(viewModelReturned);
      _clientService.GetByClientId(testId).Returns(new ResponseMessage<ClientDto>(clientDtoReturned));

      var result = _controller.GetClientById(testId);

      VerifyActionResult(result);
      _clientService.Received(1).GetByClientId(testId);
    }

    [Fact]
    public void TestGetClientByIdReturnsNotFoundResponseWhenClientServiceDoesNotReturnAResult()
    {
      const int testId = 1;

      _clientService.GetByClientId(testId).Returns(new ResponseMessage<ClientDto>(null).WithStatus(MessageConstants.MsgStatusNoRecords));

      var result = _controller.GetClientById(testId);

      VerifyActionResult(result, HttpStatusCode.NotFound);
      _clientService.Received(1).GetByClientId(testId);
    }

    [Fact]
    public void TestGetClientByNameReturnOkResponseWhenClientServiceReturnsAResult()
    {
      const int testId = 1;
      const string testName = "Niall";

      var viewModelReturned = new ClientViewModel()
      {
        ClientId = testId,
        ClientName = testName
      };

      var clientDtoReturned = new ClientDto()
      {
        ClientId = testId,
        ClientName = testName
      };

      var listReturned = new List<ClientDto>()
      {
        clientDtoReturned
      };

      _mapper.Map<ClientViewModel>(clientDtoReturned).Returns(viewModelReturned);
      _clientService.GetByClientName(testName).Returns(new ResponseMessage<IList<ClientDto>>(listReturned));

      var result = _controller.GetClientByClientName(testName);

      VerifyActionResult(result);
      _clientService.Received(1).GetByClientName(testName);
    }

    [Fact]
    public void TestGetClientByNameReturnNotFoundResponseWhenClientServiceDoesNotReturnAResult()
    {
      const string testName = "Niall";

      _clientService.GetByClientName(testName).Returns(new ResponseMessage<IList<ClientDto>>(null).WithStatus(MessageConstants.MsgStatusNoRecords));

      var result = _controller.GetClientByClientName(testName);

      VerifyActionResult(result, HttpStatusCode.NotFound);
      _clientService.Received(1).GetByClientName(testName);
    }
  }
}*/