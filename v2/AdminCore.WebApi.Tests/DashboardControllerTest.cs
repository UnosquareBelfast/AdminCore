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
    public void GetEmployeeEvents_WhenCalled_ReturnsEmployeeEvents()
    {
      // Arrange
      var searchDate = DateTime.Now;
      var numberOfEvents = 5;
      var employeeId = 88;

      var employeeEventDtos = _fixture.CreateMany<EventDto>(numberOfEvents).ToList();
      var dashboardEventModels = _fixture.CreateMany<DashboardEventViewModel>(numberOfEvents).ToList();

      _dashboardService.GetEmployeeDashboardEvents(employeeId, searchDate);

      _mapper.Map<List<EventDto>, List<DashboardEventViewModel>>(Arg.Is(employeeEventDtos)).Returns(dashboardEventModels);

      // Mock out service - credentials method for employeeId

      // Act
      var result = _dashboardController.GetEmployeeEvents(searchDate);

      // Assert
      // TODO: Check result wrapper
      // Assert.NotNull(EmployeeEventViewModel);
      // Assert.True(IsNullOrWhiteSpace(errorReturned));
      // Assert.Equal(EmployeeEventViewModel.Events.Count(), numberOfEvents); 
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
      // TODO: Check result wrapper
      // Assert.NotNull(payloadReturned);
      // Assert.True(IsNullOrWhiteSpace(errorReturned))
      // Assert.Equal(payloadReturned.Count(), numberOfMessages);
    }
  }
}