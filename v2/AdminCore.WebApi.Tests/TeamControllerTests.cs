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
    private readonly ITeamService _teamService;
    private readonly Fixture _fixture;
    private readonly IMapper _mapper;
    private readonly TeamController _teamController;

    public TeamControllerTests()
    {
      _teamService = Substitute.For<ITeamService>();
      _mapper = Substitute.For<IMapper>();
      _fixture = new Fixture();
      _teamController = new TeamController(_teamService, _mapper);
    }

    [Fact]
    public void CreateTeam_WhenInvalidNamePassed_ReturnsError()
    {
      // Arrange
      var teamToSaveModel = _fixture.Build<CreateTeamViewModel>()
        .With(x => x.teamName, string.Empty)
        .Create();
      var teamToSaveDto = _fixture.Build<TeamDto>().Create();

      var teamSavedDto = _fixture.Build<TeamDto>().Create();
      var teamSavedModel = _fixture.Build<TeamViewModel>().Create();

      _teamService.Save(teamToSaveDto).Returns(teamSavedDto);

      _mapper.Map<CreateTeamViewModel, TeamDto>(Arg.Is(teamToSaveModel)).Returns(teamToSaveDto);
      _mapper.Map<TeamDto, TeamViewModel>(Arg.Is(teamSavedDto)).Returns(teamSavedModel);

      // Act
      var result = _teamController.CreateTeam(teamToSaveModel);

      // Assert
      // TODO: Check result wrapper 
      // Assert.Null(payloadReturned);
      // Assert.False(IsNullOrWhiteSpace(errorReturned)) 
    }

    [Fact]
    public void CreateTeam_WhenValidTeamPassed_ReturnsCreatedTeam()
    {
      // Arrange
      var teamToSaveModel = _fixture.Build<CreateTeamViewModel>().Create();
      var teamToSaveDto = _fixture.Build<TeamDto>().Create();

      var teamSavedDto = _fixture.Build<TeamDto>().Create();
      var teamSavedModel = _fixture.Build<TeamViewModel>().Create();

      _teamService.Save(teamToSaveDto).Returns(teamSavedDto);

      _mapper.Map<CreateTeamViewModel, TeamDto>(Arg.Is(teamToSaveModel)).Returns(teamToSaveDto);
      _mapper.Map<TeamDto, TeamViewModel>(Arg.Is(teamSavedDto)).Returns(teamSavedModel);

      // Act
      var result = _teamController.CreateTeam(teamToSaveModel);

      // Assert
      // TODO: Check result wrapper 
      // Assert.NotNull(payloadReturned);
      // Assert.True(IsNullOrWhiteSpace(errorReturned)) 
    }

    [Fact]
    public void GetAllTeamsForClientId_WhenCalled_ReturnsAllTeamsForClient()
    {
      // Arrange
      const int clientId = 22;
      const int numberOfTeams = 9;

      var teams = _fixture.CreateMany<TeamDto>(numberOfTeams).ToList();
      var teamViewModels = _fixture.CreateMany<TeamViewModel>(numberOfTeams).ToList();

      _teamService.GetByClientId(Arg.Is(clientId)).Returns(teams);

      _mapper.Map<IList<TeamDto>, List<TeamViewModel>>(Arg.Is(teams)).Returns(teamViewModels);

      // Act
      var result = _teamController.GetAllTeamsForClientId(clientId);

      // Assert
      // TODO: Check result wrapper 
      // Assert.NotNull(payloadReturned);
      // Assert.True(IsNullOrWhiteSpace(errorReturned)) 
      // Assert.Equal(payloadReturned.Count(), numberOfTeams); 
    }
  }
}