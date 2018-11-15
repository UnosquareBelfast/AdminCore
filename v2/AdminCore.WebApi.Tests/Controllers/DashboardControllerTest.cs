using AdminCore.Common.Interfaces;
using AdminCore.DTOs.Dashboard;
using AdminCore.DTOs.Event;
using AdminCore.WebApi.Controllers;
using AdminCore.WebApi.Models.Dashboard;
using AutoFixture;
using AutoMapper;
using NSubstitute;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace AdminCore.WebApi.Tests.Controllers
{
  public class DashboardControllerTest : BaseControllerTest
  {
    private readonly DashboardController _dashboardController;
    private readonly IDashboardService _dashboardService;
    private readonly IEmployeeCredentials _employeeCredentials;
    private readonly Fixture _fixture;
    private readonly IMapper _mapper;

    public DashboardControllerTest()
    {
      _fixture = new Fixture();

      _dashboardService = Substitute.For<IDashboardService>();
      _employeeCredentials = Substitute.For<IEmployeeCredentials>();
      _mapper = Substitute.For<IMapper>();

      _dashboardController = new DashboardController(_dashboardService, _employeeCredentials, _mapper);
    }

    [Fact]
    public void GetDashboardSnapshot_WhenCalled_ReturnsDashboardSnapshot()
    {
      // Arrange
      var numberOfSnapshotModels = 4;

      var snapshotModel = _fixture.CreateMany<TeamSnapshotViewModel>(numberOfSnapshotModels);
      var snapshotReturnedFromService = _fixture.Create<Dictionary<string, List<EmployeeSnapshotDto>>>();

      _dashboardService.GetTeamSnapshotDashboardEvents().Returns(snapshotReturnedFromService);

      _mapper.Map<Dictionary<string, List<EmployeeSnapshotDto>>, List<TeamSnapshotViewModel>>(snapshotReturnedFromService).Returns(snapshotModel);

      // Act
      var result = _dashboardController.GetDashboardSnapshot();

      // Assert
      RetrieveValueFromResult<List<TeamSnapshotViewModel>>(result);

      _dashboardService.Received(1).GetTeamSnapshotDashboardEvents();

      _mapper.Received(1).Map<Dictionary<string, List<EmployeeSnapshotDto>>, TeamSnapshotViewModel>(Arg.Is(snapshotReturnedFromService));      
    }

    [Fact]
    public void GetEmployeeEvents_WhenCalled_ReturnsEmployeeEvents()
    {
      // Arrange
      var employeeId = 88;
      var numberOfEvents = 5;
      var searchDate = DateTime.Now;

      var eventsReturnedFromService = _fixture.CreateMany<EventDto>(numberOfEvents).ToList();
      var eventModels = _fixture.CreateMany<DashboardEventViewModel>(numberOfEvents).ToList();

      _dashboardService.GetEmployeeDashboardEvents(employeeId, searchDate).Returns(eventsReturnedFromService);

      _mapper.Map<IList<EventDto>, List<DashboardEventViewModel>>(Arg.Is(eventsReturnedFromService)).Returns(eventModels);

      _employeeCredentials.GetUserId().Returns(employeeId);

      // Act
      var result = _dashboardController.GetEmployeeEvents(searchDate);

      // Assert
      RetrieveValueFromResult<EmployeeEventViewModel>(result);

      _dashboardService.Received(1).GetEmployeeDashboardEvents(Arg.Is<int>(x => x == employeeId), Arg.Is<DateTime>(x => x == searchDate));

      _mapper.Received(1).Map<List<EventDto>, List<DashboardEventViewModel>>(Arg.Is(eventsReturnedFromService));      
    }

    [Fact]
    public void GetEmployeeTeamSnapshot_WhenCalled_ReturnsEmployeeTeamSnapshot()
    {
      // Arrange
      var employeeId = 41;
      var numberOfSnapshotModels = 6;

      var snapshotReturnedFromService = _fixture.Create<Dictionary<string, List<EmployeeSnapshotDto>>>();
      var snapshotModels = _fixture.CreateMany<TeamSnapshotViewModel>(numberOfSnapshotModels);

      _dashboardService.GetEmployeeSnapshotsByEmployeeId(Arg.Is(employeeId)).Returns(snapshotReturnedFromService);

      _mapper.Map<Dictionary<string, List<EmployeeSnapshotDto>>, List<TeamSnapshotViewModel>>(snapshotReturnedFromService).Returns(snapshotModels);      

      _employeeCredentials.GetUserId().Returns(employeeId);

      // Act
      var result = _dashboardController.GetEmployeeTeamSnapshot();

      // Assert
      RetrieveValueFromResult<List<EmployeeEventViewModel>>(result);

      _dashboardService.Received(1).GetEmployeeSnapshotsByEmployeeId(Arg.Is(employeeId));

      _mapper.Received(1).Map<Dictionary<string, List<EmployeeSnapshotDto>>, TeamSnapshotViewModel>(Arg.Is(snapshotReturnedFromService));

      
    }

    [Fact]
    public void GetMessagesByEventId_WhenValidIdPassed_ReturnsEventMessages()
    {
      // Arrange
      var eventId = 74;
      var numberOfMessages = 7;

      var messagesReturnedFromService = _fixture.CreateMany<EventMessageDto>(numberOfMessages).ToList();
      var messageModels = _fixture.CreateMany<EventMessageViewModel>(numberOfMessages);

      _dashboardService.GetEventMessagesByEventId(Arg.Is(eventId)).Returns(messagesReturnedFromService);

      _mapper.Map<IList<EventMessageDto>, List<EventMessageViewModel>>(Arg.Is(messagesReturnedFromService)).Returns(messageModels);

      // Act
      var result = _dashboardController.GetMessagesByEventId(eventId);

      // Assert
      RetrieveValueFromResult<List<EventMessageViewModel>>(result);

      _mapper.Received(1).Map<List<EventMessageDto>, List<EventMessageViewModel>>(Arg.Is(messagesReturnedFromService));

      _dashboardService.Received(1).GetEventMessagesByEventId(Arg.Is(eventId));
    }

    [Fact]
    public void GetTeamEvents_WhenCalled_ReturnsTeamEvents()
    {
      // Arrange
      var employeeId = 89;
      var numberOfEvents = 22;
      var searchDate = DateTime.Now;

      var eventsReturnedFromService = _fixture.CreateMany<EventDto>(numberOfEvents).ToList();
      var dashboardEventModels = _fixture.CreateMany<DashboardEventViewModel>(numberOfEvents);

      _dashboardService.GetTeamDashboardEvents(Arg.Is(employeeId), searchDate).Returns(eventsReturnedFromService);

      _mapper.Map<IList<EventDto>, List<DashboardEventViewModel>>(eventsReturnedFromService).Returns(dashboardEventModels);

      _employeeCredentials.GetUserId().Returns(employeeId);

      // Act
      var result = _dashboardController.GetTeamEvents(searchDate);

      // Assert
      RetrieveValueFromResult<EmployeeEventViewModel>(result);

      _dashboardService.Received(1).GetTeamDashboardEvents(Arg.Is(employeeId), Arg.Is(searchDate));

      _mapper.Received(1).Map<IList<EventDto>, List<DashboardEventViewModel>>(Arg.Is(eventsReturnedFromService));
    }
  }
}