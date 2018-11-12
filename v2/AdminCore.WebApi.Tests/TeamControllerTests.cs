using AdminCore.Common.Interfaces;
using AdminCore.DTOs.Team;
using AdminCore.WebApi.Controllers;
using AdminCore.WebApi.Models.Team;
using AutoFixture;
using AutoMapper;
using NSubstitute;
using System.Collections.Generic;
using System.Linq;
using Xunit;


namespace AdminCore.WebApi.Tests
{
  public class TeamControllerTests
  {
    private Fixture _fixture;
    private IMapper _mapper;
    private readonly ITeamService _teamService;
    private TeamController _controller;

    public TeamControllerTests()
    {
      _teamService = Substitute.For<ITeamService>();
      _mapper = Substitute.For<IMapper>();
      _fixture = new Fixture();
      _controller = new TeamController(_teamService, _mapper);
    }

    [Fact]
    public void GetAllTeamsForClientId_WhenCalled_ReturnsTeamsForClient()
    {
      // Arrange
      const int numberOfTeams = 9;
      const int clientId = 22;

      var teams = _fixture.CreateMany<TeamDto>(numberOfTeams).ToList();
      var teamViewModels = _fixture.CreateMany<TeamViewModel>(numberOfTeams).ToList();

      _teamService.GetByClientId(Arg.Is(clientId)).Returns(teams);

      _mapper.Map<IList<TeamDto>, List<TeamViewModel>>(Arg.Is(teams)).Returns(teamViewModels);

      // Act
      var result = _controller.GetAllTeamsForClientId(clientId);

      // Assert
      Assert.True(result is List<TeamDto>);
      Assert.Equal(numberOfTeams, (result as List<TeamDto>).Count());
    }
  }
}