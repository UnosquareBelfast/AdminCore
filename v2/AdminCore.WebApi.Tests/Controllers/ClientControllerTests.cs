using Xunit;

namespace AdminCore.WebApi.Tests
{
  using AdminCore.Common.Interfaces;
  using AdminCore.DTOs.Client;
  using AdminCore.WebApi.Controllers;
  using AdminCore.WebApi.Models.Client;
  using AutoFixture;
  using AutoMapper;
  using NSubstitute;
  using System.Collections.Generic;
  using System.Linq;

  public class ClientControllerTests
  {
    private readonly IClientService _clientService;

    private readonly ClientController _controller;
    private readonly IFixture _fixture;

    private readonly IMapper _mapper;
    public ClientControllerTests()
    {
      _clientService = Substitute.For<IClientService>();
      _mapper = Substitute.For<IMapper>();
      _fixture = new Fixture();
      _controller = new ClientController(_clientService, _mapper);
    }

    [Fact]
    public void GetAllClient_WhenCalled_ReturnsAllClients()
    {
      // Arrange
      const int numberOfClients = 9;

      var clients = _fixture.CreateMany<ClientDto>(numberOfClients).ToList();
      var clientViewModels = _fixture.CreateMany<ClientViewModel>(numberOfClients).ToList();

      _clientService.GetAll().Returns(clients);

      _mapper.Map<IList<ClientDto>, List<ClientViewModel>>(Arg.Is(clients)).Returns(clientViewModels);

      // Act
      var result = _controller.GetAllClients();

      // Assert
      Assert.True(result is List<ClientDto>);
      Assert.Equal(numberOfClients, (result as List<ClientDto>).Count());
    }
  }
}