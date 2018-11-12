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
        .With(x => x.teamName, null)
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
      // TODO:
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
      Assert.True(result is TeamViewModel);
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
      Assert.True(result is List<TeamDto>);
      Assert.Equal(numberOfTeams, (result as List<TeamDto>).Count());
    }

    [Fact]
    public void UpdateTeam_WhenInvalidNamePassed_ReturnsError()
    {
      // Arrange
      // TODO:

      // Act
      // TODO:

      // Assert
      // TODO:
    }

    [Fact]
    public void UpdateTeam_WhenValidTeamPassed_ReturnsUpdatedTeam()
    {
      // Arrange
      var teamToUpdateModel = _fixture.Build<UpdateTeamViewModel>().Create();
      var teamToUpdateDto = _fixture.Build<TeamDto>().Create();

      var teamUpdatedDto = _fixture.Build<TeamDto>().Create();
      var teamUpdatedModel = _fixture.Build<TeamViewModel>().Create();

      _teamService.Save(teamToUpdateDto).Returns(teamUpdatedDto);

      _mapper.Map<UpdateTeamViewModel, TeamDto>(Arg.Is(teamToUpdateModel)).Returns(teamToUpdateDto);
      _mapper.Map<TeamDto, TeamViewModel>(Arg.Is(teamUpdatedDto)).Returns(teamUpdatedModel);

      // Act
      var result = _teamController.UpdateTeam(teamToUpdateModel);

      // Assert
      Assert.True(result is TeamViewModel);
    }
  }
}