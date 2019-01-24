using AdminCore.Common.Interfaces;
using AdminCore.WebApi.Controllers;
using AdminCore.WebApi.Models.Client;
using AutoFixture;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using NSubstitute.ReturnsExtensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
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

      _clientService.GetAll().Returns(clientDtos);

      _mapper.Map<List<ClientViewModel>>(Arg.Is(clientDtos)).Returns(clientViewModels);

      // Act
      var result = _controller.GetAllClients();

      // Assert
      var resultValue = RetrieveValueFromActionResult<List<ClientViewModel>>(result);
      Assert.Equal(resultValue.Count(), numberOfClients);
    }

    [Fact]
    public void GetAllClientReturnsErrorMsgWhenNoClientsInDb()
    {
      // Service returns empty list.
      _clientService.GetAll().Returns(new List<ClientDto>());

      // Act
      var result = _controller.GetAllClients();

      // Assert
      var resultValue = RetrieveValueFromActionResult<string>(result, HttpStatusCode.InternalServerError);
      Assert.Equal("No client exist", resultValue);
    }

    [Fact]
    public void TestUpdateClientReturnsEmptyOkResponseWhenGivenValidInput()
    {
      var updateViewModel = new UpdateClientViewModel()
      {
        ClientId = 1,
        ClientName = "TestClient"
      };

      var result = _controller.UpdateClient(updateViewModel);

      Assert.IsType<OkResult>(result);
    }

    [Fact]
    public void TestUpdateClientReturnsOkResponseWithErrorMessageWhenSaveThrowsAnException()
    {
      var updateViewModel = new UpdateClientViewModel()
      {
        ClientId = 1,
        ClientName = "TestClient"
      };

      _clientService.When(x => x.Save(Arg.Any<ClientDto>())).Throw(new Exception("Test Exception"));

      var result = _controller.UpdateClient(updateViewModel);

      var resultValue = RetrieveValueFromActionResult<string>(result, HttpStatusCode.InternalServerError);
      Assert.Equal("Something went wrong, client was not updated.", resultValue);
    }

    [Fact]
    public void TestCreateClientReturnsEmptyOkResponseWhenGivenValidInput()
    {
      var updateViewModel = new CreateClientViewModel()
      {
        ClientName = "TestClient"
      };

      var result = _controller.CreateClient(updateViewModel);
      var resultValue = RetrieveValueFromActionResult<string>(result);
      Assert.Equal("Client TestClient has successfully been created", resultValue);
    }

    [Fact]
    public void TestCreateClientReturnsOkResponseWithErrorMessageWhenSaveThrowsAnException()
    {
      var updateViewModel = new CreateClientViewModel()
      {
        ClientName = "TestClient"
      };

      _clientService.When(x => x.Save(Arg.Any<ClientDto>())).Throw(new Exception("Test Exception"));

      var result = _controller.CreateClient(updateViewModel);

      var resultValue = RetrieveValueFromActionResult<string>(result, HttpStatusCode.InternalServerError);
      Assert.Equal("Something went wrong, client was not created.", resultValue);
    }

    [Fact]
    public void TestGetClientByIdReturnsOkObjectResultWithViewModelWhenGivenValidId()
    {
      const int testId = 1;
      const string testClientName = "testClient";

      var clientDtoReturnedFromService = new ClientDto()
      {
        ClientId = testId,
        ClientName = testClientName
      };

      var viewModelReturnedFromMapper = new ClientViewModel()
      {
        ClientId = testId,
        ClientName = testClientName
      };

      _mapper.Map<ClientViewModel>(clientDtoReturnedFromService).Returns(viewModelReturnedFromMapper);
      _clientService.GetByClientId(testId).Returns(clientDtoReturnedFromService);

      var result = _controller.GetClientById(testId);

      var resultValue = RetrieveValueFromActionResult<ClientViewModel>(result);
      Assert.Equal(viewModelReturnedFromMapper, resultValue);
    }

    [Fact]
    public void TestGetClientByIdReturnsOkObjectResultWithErrorMsgWhenGivenInvalidId()
    {
      const int testId = 1;

      _clientService.GetByClientId(testId).ReturnsNull();

      var result = _controller.GetClientById(testId);

      var resultValue = RetrieveValueFromActionResult<string>(result, HttpStatusCode.InternalServerError);
      Assert.Equal("No client found with an ID of 1", resultValue);
    }

    [Fact]
    public void TestGetClientByClientNameReturnsOkObjectResultWithClientViewModelWhenClientNameExists()
    {
      const int testId = 1;
      const string testClientName = "testClient";

      var listOfViewModelsReturnedFromMapper = new List<ClientViewModel>()
      {
        new ClientViewModel()
        {
          ClientId = testId,
          ClientName = testClientName
        }
      };

      var listOfDtosReturnedFromService = new List<ClientDto>()
      {
        new ClientDto()
        {
          ClientId = testId,
          ClientName = testClientName
        }
      };

      _clientService.GetByClientName(testClientName).Returns(listOfDtosReturnedFromService);
      _mapper.Map<IList<ClientViewModel>>(listOfDtosReturnedFromService).Returns(listOfViewModelsReturnedFromMapper);

      var result = _controller.GetClientByClientName(testClientName);

      var resultValue = RetrieveValueFromActionResult<IList<ClientViewModel>>(result);
      Assert.Equal(listOfViewModelsReturnedFromMapper, resultValue);
    }

    [Fact]
    public void TestGetClientByClientNameReturnsOkObjectResultWithErrorMsgWhenClientNameDoesNotExist()
    {
      const string testClientName = "testClient";

      var listOfDtosReturnedFromService = new List<ClientDto>();
      _clientService.GetByClientName(testClientName).Returns(listOfDtosReturnedFromService);

      var result = _controller.GetClientByClientName(testClientName);

      var resultValue = RetrieveValueFromActionResult<string>(result, HttpStatusCode.InternalServerError);
      Assert.Equal("No client found with client name testClient", resultValue);
    }
  }
}