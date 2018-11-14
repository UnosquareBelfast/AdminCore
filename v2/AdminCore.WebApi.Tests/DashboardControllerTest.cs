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

namespace AdminCore.WebApi.Tests
{
  public class DashboardControllerTest
  {
    private readonly DashboardController _dashboardController;
    private readonly IDashboardService _dashboardService;
    private readonly Fixture _fixture;
    private readonly IMapper _mapper;

    public DashboardControllerTest()
    {
      _dashboardService = Substitute.For<IDashboardService>();
      _fixture = new Fixture();
      _mapper = Substitute.For<IMapper>();
      _dashboardController = new DashboardController(_dashboardService, _mapper);
    }

    [Fact]
    public void GetDashboardSnapshot_WhenCalled_ReturnsDashboardSnapshot()
    {
      // Arrange
      var employeeSnapshots = _fixture.Create<Dictionary<string, List<EmployeeSnapshotDto>>>();

      _dashboardService.GetTeamSnapshotDashboardEvents().Returns(employeeSnapshots);

      // Act
      var result = _dashboardController.GetDashboardSnapshot();

      // Assert
    }

    [Fact]
    public void GetEmployeeEvents_WhenCalled_ReturnsEmployeeEvents()
    {
      // Arrange
      var numberOfEvents = 5;
      var employeeId = 88;
      var searchDate = DateTime.Now;

      var employeeEventDtos = _fixture.CreateMany<EventDto>(numberOfEvents).ToList();
      var dashboardEventModels = _fixture.CreateMany<DashboardEventViewModel>(numberOfEvents).ToList();

      _dashboardService.GetEmployeeDashboardEvents(employeeId, searchDate).Returns(employeeEventDtos);

      _mapper.Map<List<EventDto>, List<DashboardEventViewModel>>(Arg.Is(employeeEventDtos)).Returns(dashboardEventModels);

      // TODO: Mock out service credentials method for employeeId

      // Act
      var result = _dashboardController.GetEmployeeEvents(searchDate);

      // Assert
      _mapper.Received(1).Map<List<EventDto>, List<DashboardEventViewModel>>(Arg.Is(employeeEventDtos));

      _dashboardService.Received(1).GetEmployeeDashboardEvents(Arg.Is<int>(x => x == employeeId), Arg.Is<DateTime>(x => x == searchDate));

      // TODO: Check result wrapper
      // Assert.NotNull(EmployeeEventViewModel);
      // Assert.True(IsNullOrWhiteSpace(errorReturned));
      // Assert.Equal(EmployeeEventViewModel.Events.Count(), numberOfEvents);
    }

    [Fact]
    public void GetEmployeeTeamSnapshot_WhenCalled_ReturnsEmployeeTeamSnapshot()
    {
      // Arrange

      // Act

      // Assert
    }

    [Fact]
    public void GetMessagesByEventId_WhenValidIdPassed_ReturnsEventMessages()
    {
      // Arrange
      var eventId = 74;
      var numberOfMessages = 7;

      var eventMessageModels = _fixture.CreateMany<EventMessageViewModel>(numberOfMessages).ToList();
      var eventMessageDtos = _fixture.CreateMany<EventMessageDto>(numberOfMessages).ToList();

      _dashboardService.GetEventMessagesByEventId(Arg.Is(eventId)).Returns(eventMessageDtos);

      _mapper.Map<List<EventMessageDto>, List<EventMessageViewModel>>(Arg.Is(eventMessageDtos)).Returns(eventMessageModels);

      // Act
      var result = _dashboardController.GetMessagesByEventId(eventId);

      // Assert
      _mapper.Received(1).Map<List<EventMessageDto>, List<EventMessageViewModel>>(Arg.Is(eventMessageDtos));

      _dashboardService.Received(1).GetEventMessagesByEventId(Arg.Is(eventId));

      // TODO: Check result wrapper
      // Assert.NotNull(payloadReturned);
      // Assert.True(IsNullOrWhiteSpace(errorReturned))
      // Assert.Equal(payloadReturned.Count(), numberOfMessages);
    }

    [Fact]
    public void GetTeamEvents_WhenCalled_ReturnsTeamEvents()
    {
      // Arrange

      // Act
      
      // Assert
    }
  }
}