using AdminCore.Common.Interfaces;
using AdminCore.Constants.Enums;
using AdminCore.DAL.Models;
using AdminCore.DTOs.Employee;
using AdminCore.DTOs.Event;
using AdminCore.DTOs.EventDates;
using AdminCore.WebApi.Controllers;
using AdminCore.WebApi.Models.Holiday;
using AutoFixture;
using AutoMapper;
using NSubstitute;
using System.Collections.Generic;
using System.Linq;
using AdminCore.WebApi.Models.WorkingFromHome;
using Xunit;

namespace AdminCore.WebApi.Tests
{
  public class WorkingFromHomeControllerTests
  {
    private readonly WorkingFromHomeController _controller;
    private readonly IEventService _eventService;
    private readonly IFixture _fixture;
    private readonly IMapper _mapper;

    public WorkingFromHomeControllerTests()
    {
      _eventService = Substitute.For<IEventService>();
      _mapper = Substitute.For<IMapper>();
      _fixture = new Fixture();
      _controller = new WorkingFromHomeController(_eventService, _mapper);
    }

    [Fact]
    public void CreateWorkingFromHome_WhenCalled_ReturnsWorkingFromHome()
    {
      // Arrange
      var createViewModel = _fixture.Build<CreateWorkingFromHomeViewModel>()
        .With(x => x.EventType, EventTypes.WorkingFromHome)
        .Create();
      var eventDto = _fixture.Build<EventDto>().Create();

      _eventService.SaveEvent(eventDto);
      _mapper.Map<EventDto, CreateWorkingFromHomeViewModel>(Arg.Is(eventDto)).Returns(createViewModel);

      // Act
      var result = _controller.CreateWorkingFromHome(createViewModel);

      // Assert
      _eventService.Received(1).SaveEvent(eventDto);
    }

    [Fact]
    public void GetAllWorkingFromHomeEvents_WhenCalled_ReturnsAllWorkingFromHomeEvents()
    {
      // Arrange
      const int numberOfWfhEvents = 9;

      var wfhEvents = _fixture.CreateMany<EventDto>(numberOfWfhEvents).ToList();
      var wfhViewModels = _fixture.CreateMany<WorkingFromHomeViewModel>(numberOfWfhEvents).ToList();

      _eventService.GetByType(EventTypes.WorkingFromHome).Returns(wfhEvents);
      _mapper.Map<IList<EventDto>, List<WorkingFromHomeViewModel>>(Arg.Is(wfhEvents)).Returns(wfhViewModels);

      // Act
      var result = _controller.GetAllWorkingFromHomeEvents();

      // Assert
      Assert.True(result is List<EventDto>);
      Assert.Equal(numberOfWfhEvents, (result as List<EventDto>).Count());
    }

    [Fact]
    public void GetAllWorkingFromHomeEventsBId_WhenCalled_ReturnsAllWorkingFromHomeEventsById()
    {
      // Arrange
      const int id = 123;

      var eventDto = _fixture.Build<EventDto>().Create();
      var workingFromHomeViewModel = _fixture.Build<WorkingFromHomeViewModel>().Create();

      _eventService.Get(id);
      _mapper.Map<EventDto, WorkingFromHomeViewModel>(Arg.Is(eventDto)).Returns(workingFromHomeViewModel);

      // Act
      var result = _controller.GetWorkingFromHomeById(id);

      // Assert
      _eventService.Received(1).Get(id);
    }

    [Fact]
    public void GetAllWorkingFromHomeEventsByEmployeeId_WhenCalled_ReturnsAllWorkingFromHomeEventsByEmployeeId()
    {
      // Arrange
      const int employeeId = 123;

      var employee = _fixture.Build<EmployeeDto>().With(x => x.EmployeeId, employeeId).Create();
      var eventDto = _fixture.Build<EventDto>().With(x => x.Employee, employee).Create();
      var workingFromHomeViewModel = _fixture.Build<WorkingFromHomeViewModel>().Create();

      _eventService.GetByEmployeeId(employeeId);
      _mapper.Map<EventDto, WorkingFromHomeViewModel>(Arg.Is(eventDto)).Returns(workingFromHomeViewModel);

      // Act
      var result = _controller.GetWorkingFromHomeByEmployeeId(employeeId);

      // Assert
      _eventService.Received(1).GetByEmployeeId(employeeId);
    }
  }
}