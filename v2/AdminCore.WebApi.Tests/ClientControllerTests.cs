using System;
using Xunit;

namespace AdminCore.WebApi.Tests
{
  using System.Collections.Generic;
  using System.Linq;

  using AdminCore.Common.Interfaces;
  using AdminCore.DTOs.Client;
  using AdminCore.WebApi.Controllers;
  using AdminCore.WebApi.Models.Client;

  using AutoFixture;

  using AutoMapper;

  using Microsoft.AspNetCore.Mvc;

  using NSubstitute;

  public class ClientControllerTests
    {
      private readonly IClientService _clientService;

      private readonly IFixture _fixture;

      private readonly IMapper _mapper;

      private readonly ClientController _controller;

      public ClientControllerTests()
      {
        _clientService = Substitute.For<IClientService>();
        _mapper = Substitute.For<IMapper>();

        _controller = new ClientController(_clientService, _mapper);
      }

      [Fact]
      public void GetAllClient_WhenCalled_ReturnsAllClients()
      {
        // Arrange
        const int numberOfClients = 9;

        var clients = _fixture.CreateMany<ClientDto>(numberOfClients).ToList();
        var clientViewModels = _fixture.CreateMany<ClientViewModel>(numberOfClients);

        _clientService.GetAll().Returns(clients);

        _mapper.Map<IList<ClientDto>, List<ClientViewModel>>(Arg.Is(clients)).Returns(clientViewModels);

        // Act
        var result = _controller.GetAllClients();
        result.ExecuteResultAsync(new ActionContext());
        // Assert
        //Assert.Equal(numberOfClients,  );
      }
  }
}
