using AdminCore.Common.Interfaces;
using AdminCore.Constants.Enums;
using AdminCore.DTOs.Employee;
using AdminCore.DTOs.Event;
using AdminCore.WebApi.Controllers;
using AdminCore.WebApi.Models.WorkingFromHome;
using AutoFixture;
using AutoMapper;
using NSubstitute;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace AdminCore.WebApi.Tests.Controllers
{
  public class WorkingFromHomeControllerTests : BaseControllerTest
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
    public void CreateWorkingFromHome_WhenCalledWithCorrectType_ReturnsWorkingFromHome()
    {
      // Arrange
      var createViewModel = _fixture.Build<CreateWorkingFromHomeViewModel>()
        .With(x => x.EventType, EventTypes.WorkingFromHome)
        .Create();
      var eventDto = _fixture.Create<EventDto>();

      _mapper.Map<EventDto, CreateWorkingFromHomeViewModel>(Arg.Is(eventDto)).Returns(createViewModel);

      // Act
      var result = _controller.CreateWorkingFromHome(createViewModel);

      // Assert
      RetrieveValueFromActionResult<List<WorkingFromHomeViewModel>>(result);
      _eventService.Received(1).SaveEvent(eventDto);
    }

    [Fact]
    public void CreateWorkingFromHome_WhenCalledWithIncorrectType_ReturnsError()
    {
      // Arrange
      var createViewModel = _fixture.Build<CreateWorkingFromHomeViewModel>()
        .With(x => x.EventType, EventTypes.AnnualLeave)
        .Create();
      var eventDto = _fixture.Create<EventDto>();

      _mapper.Map<EventDto, CreateWorkingFromHomeViewModel>(Arg.Is(eventDto)).Returns(createViewModel);

      // Act
      var result = _controller.CreateWorkingFromHome(createViewModel);

      // Assert
      RetrieveValueFromActionResult<List<WorkingFromHomeViewModel>>(result);
      _eventService.Received(1).SaveEvent(eventDto);
    }

    [Fact]
    public void GetAllWorkingFromHomeEvents_WhenCalled_ReturnsAllWorkingFromHomeEvents()
    {
      // Arrange
      const int numOfWfhEvents = 9;

      var wfhEvents = _fixture.CreateMany<EventDto>(numOfWfhEvents).ToList();
      var wfhViewModels = _fixture.CreateMany<WorkingFromHomeViewModel>(numOfWfhEvents).ToList();

      _eventService.GetByType(EventTypes.WorkingFromHome).Returns(wfhEvents);
      _mapper.Map<IList<EventDto>, List<WorkingFromHomeViewModel>>(Arg.Is(wfhEvents)).Returns(wfhViewModels);

      // Act
      var result = _controller.GetAllWorkingFromHomeEvents();

      // Assert
      var returnedWfhEvents = RetrieveValueFromActionResult<List<WorkingFromHomeViewModel>>(result);

      Assert.Equal(numOfWfhEvents, returnedWfhEvents.Count);
    }

    [Fact]
    public void GetAllWorkingFromHomeEventsBId_WhenCalled_ReturnsAllWorkingFromHomeEventsById()
    {
      // Arrange
      const int wfhId = 123;

      var wfhViewModel = _fixture.Build<WorkingFromHomeViewModel>().Create();
      var eventDto = _fixture.Build<EventDto>().Create();

      _eventService.Get(wfhId).Returns(eventDto);
      _mapper.Map<EventDto, WorkingFromHomeViewModel>(Arg.Is(eventDto)).Returns(wfhViewModel);

      // Act
      var result = _controller.GetWorkingFromHomeById(wfhId);

      // Assert
      _eventService.Received(1).Get(Arg.Is(wfhId));
      RetrieveValueFromActionResult<List<WorkingFromHomeViewModel>>(result);
    }

    [Fact]
    public void GetAllWorkingFromHomeEventsByEmployeeId_WhenCalled_ReturnsAllWorkingFromHomeEventsByEmployeeId()
    {
      // Arrange
      const int numOfWfhEvents = 9;
      const int employeeId = 123;

      var wfhViewModels = _fixture.CreateMany<WorkingFromHomeViewModel>(numOfWfhEvents).ToList();
      var employee = _fixture.Build<EmployeeDto>().With(x => x.EmployeeId, employeeId).Create();
      var eventDto = _fixture.Build<EventDto>().With(x => x.Employee, employee).Create();
      List<EventDto> wfhEvents = new List<EventDto>
      {
        eventDto
      };

      _eventService.GetByEmployeeId(employeeId).Returns(wfhEvents);
      _mapper.Map<IList<EventDto>, List<WorkingFromHomeViewModel>>(Arg.Is(wfhEvents)).Returns(wfhViewModels);

      // Act
      var result = _controller.GetWorkingFromHomeByEmployeeId(employeeId);

      // Assert
      var returnedWfhEvents = RetrieveValueFromActionResult<List<WorkingFromHomeViewModel>>(result);

      Assert.Equal(numOfWfhEvents, returnedWfhEvents.Count);
    }
  }
}