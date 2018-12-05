using System;
using AdminCore.Common.Interfaces;
using AdminCore.DTOs.Team;
using AdminCore.WebApi.Controllers;
using AdminCore.WebApi.Models.Team;
using AutoFixture;
using AutoMapper;
using NSubstitute;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using NSubstitute.ReturnsExtensions;
using Xunit;

namespace AdminCore.WebApi.Tests.Controllers
{
  public class TeamControllerTests : BaseControllerTest
  {
    private readonly Fixture _fixture;
    private readonly IMapper _mapper;
    private readonly TeamController _teamController;
    private readonly ITeamService _teamService;

    public TeamControllerTests()
    {
      _teamService = Substitute.For<ITeamService>();
      _mapper = Substitute.For<IMapper>();
      _fixture = new Fixture();
      _teamController = new TeamController(_teamService, _mapper);
    }

    [Fact]
    public void GetAllTeam_WhenCalled_ReturnsAllTeams()
    {
      // Arrange
      const int numberOfTeams = 9;

      var teamViewModels = _fixture.CreateMany<TeamViewModel>(numberOfTeams).ToList();
      var teamDtos = _fixture.CreateMany<TeamDto>(numberOfTeams).ToList();

      _teamService.GetAll().Returns(teamDtos);

      _mapper.Map<List<TeamViewModel>>(Arg.Is(teamDtos)).Returns(teamViewModels);

      // Act
      var result = _teamController.GetAllTeams();

      // Assert
      var resultValue = RetrieveValueFromActionResult<List<TeamViewModel>>(result);
      Assert.Equal(resultValue.Count(), numberOfTeams);
    }

    [Fact]
    public void GetAllTeamReturnsErrorMsgWhenNoTeamsInDb()
    {
      // Service returns empty list.
      _teamService.GetAll().Returns(new List<TeamDto>());

      // Act
      var result = _teamController.GetAllTeams();

      // Assert
      var resultValue = RetrieveValueFromActionResult<string>(result, HttpStatusCode.InternalServerError);
      Assert.Equal("No teams exist", resultValue);
    }

    [Fact]
    public void TestUpdateTeamReturnsEmptyOkResponseWhenGivenValidInput()
    {
      var updateViewModel = new UpdateTeamViewModel()
      {
        TeamId = 1,
        TeamName = "TestTeam",
        ClientId = 1
      };

      var result = _teamController.UpdateTeam(updateViewModel);

      Assert.IsType<OkResult>(result);
    }

    [Fact]
    public void TestUpdateTeamReturnsOkResponseWithErrorMessageWhenSaveThrowsAnException()
    {
      var updateViewModel = new UpdateTeamViewModel()
      {
        TeamId = 1,
        TeamName = "TestTeam",
        ClientId = 1
      };

      _teamService.When(x => x.Save(Arg.Any<TeamDto>())).Throw(new Exception("Test Exception"));

      var result = _teamController.UpdateTeam(updateViewModel);

      var resultValue = RetrieveValueFromActionResult<string>(result, HttpStatusCode.InternalServerError);
      Assert.Equal("Something went wrong, team was not updated.", resultValue);
    }

    [Fact]
    public void TestCreateTeamReturnsEmptyOkResponseWhenGivenValidInput()
    {
      var updateViewModel = new CreateTeamViewModel()
      {
        TeamName = "TestTeam",
        ClientId = 1
      };

      var result = _teamController.CreateTeam(updateViewModel);

      Assert.IsType<OkResult>(result);
    }

    [Fact]
    public void TestCreateTeamReturnsOkResponseWithErrorMessageWhenSaveThrowsAnException()
    {
      var updateViewModel = new CreateTeamViewModel()
      {
        TeamName = "TestTeam",
        ClientId = 1
      };

      _teamService.When(x => x.Save(Arg.Any<TeamDto>())).Throw(new Exception("Test Exception"));

      var result = _teamController.CreateTeam(updateViewModel);

      var resultValue = RetrieveValueFromActionResult<string>(result, HttpStatusCode.InternalServerError);
      Assert.Equal("Something went wrong, team was not created.", resultValue);
    }

    [Fact]
    public void TestGetTeamByIdReturnsOkObjectResultWithViewModelWhenGivenValidId()
    {
      const int testId = 1;
      const string testTeamName = "testTeam";
      const int testClientId = 1;

      var teamDtoReturnedFromService = new TeamDto()
      {
        TeamId = testId,
        TeamName = testTeamName,
        ClientId = testClientId
      };

      var viewModelReturnedFromMapper = new TeamViewModel()
      {
        TeamId = testId,
        TeamName = testTeamName,
        ClientId = testClientId
      };

      _mapper.Map<TeamViewModel>(teamDtoReturnedFromService).Returns(viewModelReturnedFromMapper);
      _teamService.Get(testId).Returns(teamDtoReturnedFromService);

      var result = _teamController.GetTeamById(testId);

      var resultValue = RetrieveValueFromActionResult<TeamViewModel>(result);
      Assert.Equal(viewModelReturnedFromMapper, resultValue);
    }

    [Fact]
    public void TestGetTeamByIdReturnsOkObjectResultWithErrorMsgWhenGivenInvalidId()
    {
      const int testId = 1;

      _teamService.Get(testId).ReturnsNull();

      var result = _teamController.GetTeamById(testId);

      var resultValue = RetrieveValueFromActionResult<string>(result, HttpStatusCode.InternalServerError);
      Assert.Equal("No team found with an ID of 1", resultValue);
    }

    [Fact]
    public void TestGetTeamByTeamNameReturnsOkObjectResultWithTeamViewModelWhenTeamNameExists()
    {
      const int testTeamId = 1;
      const string testTeamName = "testTeam";
      const int testClientId = 1;

      var listOfViewModelsReturnedFromMapper = new List<TeamViewModel>()
      {
        new TeamViewModel()
        {
          TeamId = testTeamId,
          TeamName = testTeamName,
          ClientId = testClientId
        }
      };

      var listOfDtosReturnedFromService = new List<TeamDto>()
      {
        new TeamDto()
        {
          TeamId = testTeamId,
          TeamName = testTeamName,
          ClientId = testClientId
        }
      };

      _teamService.GetByClientId(testClientId).Returns(listOfDtosReturnedFromService);
      _mapper.Map<IList<TeamViewModel>>(listOfDtosReturnedFromService).Returns(listOfViewModelsReturnedFromMapper);

      var result = _teamController.GetAllTeamsForClientId(1);

      var resultValue = RetrieveValueFromActionResult<IList<TeamViewModel>>(result);
      Assert.Equal(listOfViewModelsReturnedFromMapper, resultValue);

    }

    [Fact]
    public void TestGetTeamByTeamNameReturnsOkObjectResultWithErrorMsgWhenTeamNameDoesNotExist()
    {
      var listOfDtosReturnedFromService = new List<TeamDto>();
      _teamService.GetByClientId(1).Returns(listOfDtosReturnedFromService);

      var result = _teamController.GetAllTeamsForClientId(1);

      var resultValue = RetrieveValueFromActionResult<string>(result, HttpStatusCode.InternalServerError);
      Assert.Equal("No teams found with client ID 1", resultValue);
    }
  }
}