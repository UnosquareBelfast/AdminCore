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
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace AdminCore.WebApi.Tests.Controllers
{
  public class HolidayControllerTests : BaseControllerTest
  {
    private readonly HolidayController _controller;

    private readonly IEventService _eventService;

    private readonly IFixture _fixture;

    private readonly IMapper _mapper;

    public HolidayControllerTests()
    {
      _eventService = Substitute.For<IEventService>();
      _mapper = Substitute.For<IMapper>();
      _fixture = new Fixture();

      _controller = new HolidayController(_eventService, _mapper);
    }

    [Fact]
    public void ApproveHoliday_WhenCalled_ReturnsApprovedHoliday()
    {
      // Arrange
      var approveViewModel = _fixture.Create<ApproveHolidayViewModel>();
      var eventDto = _fixture.Create<EventDto>();

      _mapper.Map<ApproveHolidayViewModel, EventDto>(Arg.Is(approveViewModel)).Returns(eventDto);

      // Act
      var result = _controller.ApproveHoliday(approveViewModel);

      // Assert
      VerifyActionResult(result);

      _eventService.Received(1).ApproveEvent(eventDto);
    }

    [Fact]
    public void CancelHoliday_WhenCalled_ReturnsCancelledHoliday()
    {
      // Arrange
      var cancelViewModel = _fixture.Create<CancelHolidayViewModel>();
      var eventDto = _fixture.Build<EventDto>().Create();

      _mapper.Map<CancelHolidayViewModel, EventDto>(Arg.Is(cancelViewModel)).Returns(eventDto);

      // Act
      var result = _controller.CancelHoliday(cancelViewModel);

      // Assert
      VerifyActionResult(result);

      _eventService.Received(1).CancelEvent(eventDto);
    }

    [Fact]
    public void CreateHolidayWithCorrectType_WhenCalled_ReturnsCreatedHoliday()
    {
      // Arrange
      var createViewModel = _fixture.Build<CreateHolidayViewModel>()
        .With(x => x.EventType, EventTypes.AnnualLeave)
        .Create();
      var eventDto = _fixture.Create<EventDto>();

      _mapper.Map<CreateHolidayViewModel, EventDto>(Arg.Is(createViewModel)).Returns(eventDto);

      // Act
      var result = _controller.CreateHoliday(createViewModel);

      // Assert
      VerifyActionResult(result);

      _eventService.Received(1).SaveEvent(eventDto);
    }

    [Fact]
    public void CreateHolidayWithIncorrectType_WhenCalled_ReturnsError()
    {
      // Arrange
      var createViewModel = _fixture.Build<CreateHolidayViewModel>()
        .With(x => x.EventType, EventTypes.WorkingFromHome)
        .Create();
      var eventDto = _fixture.Create<EventDto>();

      _mapper.Map<CreateHolidayViewModel, EventDto>(Arg.Is(createViewModel)).Returns(eventDto);

      // Act
      var result = _controller.CreateHoliday(createViewModel);

      // Assert
      VerifyActionResult(result);

      _eventService.Received(1).SaveEvent(eventDto);
    }

    [Fact]
    public void GetAllHolidays_WhenCalled_ReturnsAllHolidays()
    {
      // Arrange
      const int numberOfHolidays = 9;

      var holidays = _fixture.CreateMany<EventDto>(numberOfHolidays).ToList();
      var holidayViewModels = _fixture.CreateMany<HolidayViewModel>(numberOfHolidays).ToList();

      _eventService.GetByType(EventTypes.AnnualLeave).Returns(holidays);//gets back
      _mapper.Map<IList<EventDto>, List<HolidayViewModel>>(Arg.Is(holidays)).Returns(holidayViewModels);

      // Act
      var result = _controller.GetAllHolidays();

      // Assert
      var returnedHolidays = RetrieveValueFromActionResult<List<HolidayViewModel>>(result);

      Assert.Equal(numberOfHolidays, returnedHolidays.Count);
    }

    [Fact]
    public void GetAllHolidaysByEmployeeId_WhenCalled_ReturnsAllHolidaysOfEmployeedId()
    {
      // Arrange
      const int numberOfHolidays = 9;
      const int employeeId = 123;

      var holidayViewModels = _fixture.CreateMany<HolidayViewModel>(numberOfHolidays).ToList();
      var employee = _fixture.Build<EmployeeDto>().With(x => x.EmployeeId, employeeId).Create();
      var eventDto = _fixture.Build<EventDto>().With(x => x.Employee, employee).Create();
      List<EventDto> holidays = new List<EventDto>
      {
        eventDto
      };

      _eventService.GetByEmployeeId(employeeId).Returns(holidays);
      _mapper.Map<IList<EventDto>, List<HolidayViewModel>>(Arg.Is(holidays)).Returns(holidayViewModels);

      // Act
      var result = _controller.GetHolidayByEmployeeId(employeeId);

      // Assert
      var returnedHolidays = RetrieveValueFromActionResult<List<HolidayViewModel>>(result);

      Assert.Equal(numberOfHolidays, returnedHolidays.Count);
    }

    [Fact]
    public void GetHolidaysByHolidayId_WhenCalled_ReturnsHolidayOfHolidayId()
    {
      // Arrange
      const int holidayId = 123;

      var holidayViewModelModel = _fixture.Build<HolidayViewModel>().Create();
      var eventDto = _fixture.Build<EventDto>().Create();

      _eventService.Get(holidayId).Returns(eventDto);
      _mapper.Map<EventDto, HolidayViewModel>(Arg.Is(eventDto)).Returns(holidayViewModelModel);

      // Act
      var result = _controller.GetHolidayByHolidayId(holidayId);

      // Assert
      _eventService.Received(1).Get(Arg.Is(holidayId));
      RetrieveValueFromActionResult<List<HolidayViewModel>>(result);
    }

    [Fact]
    public void GetHolidayByDateBetween_WhenCalled_ReturnsAllHolidaysBetweenTwoDates()
    {
      // Arrange
      const int numberOfHolidays = 9;
      var holidayViewModels = _fixture.CreateMany<HolidayViewModel>(numberOfHolidays).ToList();
      var eventDateDto = _fixture.Build<EventDateDto>()
        .With(x => x.startDate, new DateTime(2018, 11, 13))
        .With(x => x.endDate, new DateTime(2018, 11, 15))
        .Create();

      var eventDto = _fixture.Build<EventDto>()
        .With(x => x.EventDates, eventDateDto)
        .Create();

      List<EventDto> holidays = new List<EventDto>
      {
        eventDto
      };

      _eventService.GetByDateBetween(eventDateDto, EventTypes.AnnualLeave).Returns(holidays);
      _mapper.Map<IList<EventDto>, List<HolidayViewModel>>(Arg.Is(holidays)).Returns(holidayViewModels);

      // Act
      var result = _controller.GetHolidayByDateBetween(new EventDate()); //Needs set

      // Assert
      var returnedHolidays = RetrieveValueFromActionResult<List<HolidayViewModel>>(result);

      Assert.Equal(numberOfHolidays, returnedHolidays.Count);
    }

    [Fact]
    public void GetHolidayByStatusApproved_WhenCalled_ReturnsAllHolidaysOfThatHolidayStatus() //TODO
    {
      // Arrange
      const int approvedId = (int)EventStatuses.Approved;
      const EventStatuses approvedEventStatus = (EventStatuses)approvedId;
      const EventTypes annualLeave = EventTypes.AnnualLeave;
      const int numberOfHolidays = 9;

      var holidayViewModels = _fixture.CreateMany<HolidayViewModel>(numberOfHolidays).ToList();
      var eventDto = _fixture.Build<EventDto>()
        .With(x => x.EventStatusId, approvedId)
        .Create();

      List<EventDto> holidays = new List<EventDto>
      {
        eventDto
      };

      _eventService.GetByStatusType(approvedEventStatus, annualLeave).Returns(holidays);
      _mapper.Map<IList<EventDto>, List<HolidayViewModel>>(Arg.Is(holidays)).Returns(holidayViewModels);

      // Act
      var result = _controller.GetHolidayByStatus(approvedId);

      // Assert
      var returnedHolidays = RetrieveValueFromActionResult<List<HolidayViewModel>>(result);

      Assert.Equal(numberOfHolidays, returnedHolidays.Count);
    }

    [Fact]
    public void GetHolidayByStatusAwaitingApproval_WhenCalled_ReturnsAllHolidaysOfThatHolidayStatus()
    {
      // Arrange
      const int awaitingApprovalId = (int)EventStatuses.AwaitingApproval;
      const EventStatuses awaitingApprovalEventStatus = (EventStatuses)awaitingApprovalId;
      const EventTypes annualLeave = EventTypes.AnnualLeave;
      const int numberOfHolidays = 9;

      var holidayViewModels = _fixture.CreateMany<HolidayViewModel>(numberOfHolidays).ToList();
      var eventDto = _fixture.Build<EventDto>()
        .With(x => x.EventStatusId, awaitingApprovalId)
        .Create();

      List<EventDto> holidays = new List<EventDto>
      {
        eventDto
      };

      _eventService.GetByStatusType(awaitingApprovalEventStatus, annualLeave).Returns(holidays);
      _mapper.Map<IList<EventDto>, List<HolidayViewModel>>(Arg.Is(holidays)).Returns(holidayViewModels);

      // Act
      var result = _controller.GetHolidayByStatus(awaitingApprovalId);

      // Assert
      var returnedHolidays = RetrieveValueFromActionResult<List<HolidayViewModel>>(result);

      Assert.Equal(numberOfHolidays, returnedHolidays.Count);
    }

    [Fact]
    public void GetHolidayByStatusCancelled_WhenCalled_ReturnsAllHolidaysOfThatHolidayStatus()
    {
      // Arrange
      const int cancelledId = (int)EventStatuses.Cancelled;
      const EventStatuses cancelledEventStatus = (EventStatuses)cancelledId;
      const EventTypes annualLeave = EventTypes.AnnualLeave;
      const int numberOfHolidays = 9;

      var holidayViewModels = _fixture.CreateMany<HolidayViewModel>(numberOfHolidays).ToList();
      var eventDto = _fixture.Build<EventDto>()
        .With(x => x.EventStatusId, cancelledId)
        .Create();

      List<EventDto> holidays = new List<EventDto>
      {
        eventDto
      };

      _eventService.GetByStatusType(cancelledEventStatus, annualLeave).Returns(holidays);
      _mapper.Map<IList<EventDto>, List<HolidayViewModel>>(Arg.Is(holidays)).Returns(holidayViewModels);

      // Act
      var result = _controller.GetHolidayByStatus(cancelledId);

      // Assert
      var returnedHolidays = RetrieveValueFromActionResult<List<HolidayViewModel>>(result);

      Assert.Equal(numberOfHolidays, returnedHolidays.Count);
    }

    [Fact]
    public void GetHolidayByStatusRejected_WhenCalled_ReturnsAllHolidaysOfThatHolidayStatus()
    {
      // Arrange
      const int rejectedId = (int)EventStatuses.Rejected;
      const EventStatuses rejectedEventStatus = (EventStatuses)rejectedId;
      const EventTypes annualLeave = EventTypes.AnnualLeave;
      const int numberOfHolidays = 9;

      var holidayViewModels = _fixture.CreateMany<HolidayViewModel>(numberOfHolidays).ToList();
      var eventDto = _fixture.Build<EventDto>()
        .With(x => x.EventStatusId, rejectedId)
        .Create();

      List<EventDto> holidays = new List<EventDto>
      {
        eventDto
      };

      _eventService.GetByStatusType(rejectedEventStatus, annualLeave).Returns(holidays);
      _mapper.Map<IList<EventDto>, List<HolidayViewModel>>(Arg.Is(holidays)).Returns(holidayViewModels);

      // Act
      var result = _controller.GetHolidayByStatus(rejectedId);

      // Assert
      var returnedHolidays = RetrieveValueFromActionResult<List<HolidayViewModel>>(result);

      Assert.Equal(numberOfHolidays, returnedHolidays.Count);
    }

    [Fact]
    public void RejectHoliday_WhenCalled_ReturnsRejectedHoliday()
    {
      // Arrange
      var rejectedViewModel = _fixture.Build<RejectHolidayViewModel>().Create();
      var eventDto = _fixture.Build<EventDto>().Create();

      _mapper.Map<RejectHolidayViewModel, EventDto>(Arg.Is(rejectedViewModel)).Returns(eventDto);

      // Act
      var result = _controller.RejectHoliday(rejectedViewModel);

      // Assert
      VerifyActionResult(result);

      _eventService.Received(1).RejectEvent(eventDto);
    }

    [Fact]
    public void UpdateHoliday_WhenCalled_ReturnsUpdatedHoliday()
    {
      // Arrange
      var updateViewModel = _fixture.Build<UpdateHolidayViewModel>().Create();
      var eventDto = _fixture.Build<EventDto>().Create();

      _mapper.Map<UpdateHolidayViewModel, EventDto>(Arg.Is(updateViewModel)).Returns(eventDto);

      // Act
      var result = _controller.UpdateHoliday(updateViewModel);

      // Assert
      VerifyActionResult(result);

      _eventService.Received(1).UpdateEvent(eventDto);
    }
  }
}