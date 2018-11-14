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
using Xunit;

namespace AdminCore.WebApi.Tests
{
  public class HolidayControllerTests
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
      var approveViewModel = _fixture.Build<ApproveHolidayViewModel>().Create();
      var eventDto = _fixture.Build<EventDto>().Create();

      _eventService.ApproveEvent(eventDto).Returns(eventDto);
      _mapper.Map<EventDto, ApproveHolidayViewModel>(Arg.Is(eventDto)).Returns(approveViewModel);

      // Act
      var result = _controller.ApproveHoliday(approveViewModel);

      // Assert
      _eventService.Received(1).ApproveEvent(eventDto);
    }

    [Fact]
    public void CancelHoliday_WhenCalled_ReturnsCancelledHoliday()
    {
      // Arrange
      var cancelViewModel = _fixture.Build<CancelHolidayViewModel>().Create();
      var eventDto = _fixture.Build<EventDto>().Create();

      _eventService.CancelEvent(eventDto);
      _mapper.Map<EventDto, CancelHolidayViewModel>(Arg.Is(eventDto)).Returns(cancelViewModel);

      // Act
      var result = _controller.CancelHoliday(cancelViewModel);

      // Assert
      _eventService.Received(1).CancelEvent(eventDto);
    }

    [Fact]
    public void CreateHolidayWithCorrectType_WhenCalled_ReturnsCreatedHoliday()
    {
      // Arrange
      var createViewModel = _fixture.Build<CreateHolidayViewModel>()
        .With(x => x.EventType, EventTypes.AnnualLeave)
        .Create();
      var eventDto = _fixture.Build<EventDto>().Create();

      _eventService.SaveEvent(eventDto);
      _mapper.Map<EventDto, CreateHolidayViewModel>(Arg.Is(eventDto)).Returns(createViewModel);

      // Act
      var result = _controller.CreateHoliday(createViewModel);

      // Assert
      _eventService.Received(1).SaveEvent(eventDto);
    }

    [Fact]
    public void CreateHolidayWithIncorrectType_WhenCalled_ReturnsError()
    {
      // Arrange
      var createViewModel = _fixture.Build<CreateHolidayViewModel>()
        .With(x => x.EventType, EventTypes.WorkingFromHome)
        .Create();
      var eventDto = _fixture.Build<EventDto>().Create();

      _eventService.SaveEvent(eventDto);
      _mapper.Map<EventDto, CreateHolidayViewModel>(Arg.Is(eventDto)).Returns(createViewModel);

      // Act
      var result = _controller.CreateHoliday(createViewModel);

      // Assert
      _eventService.Received(1).SaveEvent(eventDto);
    }

    [Fact]
    public void GetAllHolidays_WhenCalled_ReturnsAllHolidays()
    {
      // Arrange
      const int numberOfHolidays = 9;

      var holidays = _fixture.CreateMany<EventDto>(numberOfHolidays).ToList();
      var holidayViewModels = _fixture.CreateMany<HolidayViewModel>(numberOfHolidays).ToList();

      _eventService.GetByType(EventTypes.AnnualLeave).Returns(holidays);
      _mapper.Map<IList<EventDto>, List<HolidayViewModel>>(Arg.Is(holidays)).Returns(holidayViewModels);

      // Act
      var result = _controller.GetAllHolidays();

      // Assert
      Assert.True(result is List<EventDto>);
      Assert.Equal(numberOfHolidays, (result as List<EventDto>).Count());
    }

    [Fact]
    public void GetAllHolidaysByEmployeeId_WhenCalled_ReturnsAllHolidaysOfEmployeedId()
    {
      // Arrange
      const int employeeId = 123;

      var employee = _fixture.Build<EmployeeDto>().With(x => x.EmployeeId, employeeId).Create();
      var eventDto = _fixture.Build<EventDto>().With(x => x.Employee, employee).Create();
      var holidayViewModelModel = _fixture.Build<HolidayViewModel>().Create();

      _eventService.GetByEmployeeId(employeeId);
      _mapper.Map<EventDto, HolidayViewModel>(Arg.Is(eventDto)).Returns(holidayViewModelModel);

      // Act
      var result = _controller.GetHolidayByEmployeeId(employeeId);

      // Assert
      _eventService.Received(1).GetByEmployeeId(employeeId);
    }

    [Fact]
    public void GetAllHolidaysByHolidayId_WhenCalled_ReturnsAllHolidaysOfHolidayId()
    {
      // Arrange
      const int holidayId = 123;

      var holidayViewModelModel = _fixture.Build<HolidayViewModel>().Create();
      var eventDto = _fixture.Build<EventDto>().Create();

      _eventService.Get(holidayId);
      _mapper.Map<EventDto, HolidayViewModel>(Arg.Is(eventDto)).Returns(holidayViewModelModel);

      // Act
      var result = _controller.GetHolidayByHolidayId(holidayId);

      // Assert
      _eventService.Received(1).Get(Arg.Is(holidayId));
    }

    [Fact]
    public void GetHolidayByDateBetween_WhenCalled_ReturnsAllHolidaysBetweenTwoDates()
    {
      var holidayViewModelModel = _fixture.Build<HolidayViewModel>().Create();
      var eventDto = _fixture.Build<EventDto>().Create();
      var eventDateDto = _fixture.Build<EventDateDto>().Create();

      _eventService.GetByDateBetween(eventDateDto, EventTypes.AnnualLeave);
      _mapper.Map<EventDto, HolidayViewModel>(Arg.Is(eventDto)).Returns(holidayViewModelModel);

      // Act
      var result = _controller.GetHolidayByDateBetween(new EventDate());

      // Assert
      _eventService.Received(1).GetByDateBetween(eventDateDto, EventTypes.AnnualLeave);
    }

    [Fact]
    public void GetHolidayByStatusApproved_WhenCalled_ReturnsAllHolidaysOfThatHolidayStatus()
    {
      // Arrange
      const int holidayId = 1;

      var holidayViewModelModel = _fixture.Build<HolidayViewModel>().Create();
      var eventDto = _fixture.Build<EventDto>().Create();

      _eventService.GetByStatusType(EventStatuses.Approved, EventTypes.AnnualLeave);
      _mapper.Map<EventDto, HolidayViewModel>(Arg.Is(eventDto)).Returns(holidayViewModelModel);

      // Act
      var result = _controller.GetHolidayByStatus(holidayId);

      // Assert
      _eventService.Received(1).GetByStatusType(EventStatuses.Approved, EventTypes.AnnualLeave);
    }

    [Fact]
    public void GetHolidayByStatusAwaitingApproval_WhenCalled_ReturnsAllHolidaysOfThatHolidayStatus()
    {
      // Arrange
      const int holidayId = 1;

      var holidayViewModelModel = _fixture.Build<HolidayViewModel>().Create();
      var eventDto = _fixture.Build<EventDto>().Create();

      _eventService.GetByStatusType(EventStatuses.AwaitingApproval, EventTypes.AnnualLeave);
      _mapper.Map<EventDto, HolidayViewModel>(Arg.Is(eventDto)).Returns(holidayViewModelModel);

      // Act
      var result = _controller.GetHolidayByStatus(holidayId);

      // Assert
      _eventService.Received(1).GetByStatusType(EventStatuses.AwaitingApproval, EventTypes.AnnualLeave);
    }

    [Fact]
    public void GetHolidayByStatusCancelled_WhenCalled_ReturnsAllHolidaysOfThatHolidayStatus()
    {
      // Arrange
      const int holidayId = 1;

      var holidayViewModelModel = _fixture.Build<HolidayViewModel>().Create();
      var eventDto = _fixture.Build<EventDto>().Create();

      _eventService.GetByStatusType(EventStatuses.Cancelled, EventTypes.AnnualLeave);
      _mapper.Map<EventDto, HolidayViewModel>(Arg.Is(eventDto)).Returns(holidayViewModelModel);

      // Act
      var result = _controller.GetHolidayByStatus(holidayId);

      // Assert
      _eventService.Received(1).GetByStatusType(EventStatuses.Cancelled, EventTypes.AnnualLeave);
    }

    [Fact]
    public void GetHolidayByStatusRejected_WhenCalled_ReturnsAllHolidaysOfThatHolidayStatus()
    {
      // Arrange
      const int holidayId = 1;

      var holidayViewModelModel = _fixture.Build<HolidayViewModel>().Create();
      var eventDto = _fixture.Build<EventDto>().Create();

      _eventService.GetByStatusType(EventStatuses.Rejected, EventTypes.AnnualLeave);
      _mapper.Map<EventDto, HolidayViewModel>(Arg.Is(eventDto)).Returns(holidayViewModelModel);

      // Act
      var result = _controller.GetHolidayByStatus(holidayId);

      // Assert
      _eventService.Received(1).GetByStatusType(EventStatuses.Rejected, EventTypes.AnnualLeave);
    }

    [Fact]
    public void RejectHoliday_WhenCalled_ReturnsRejectedHoliday()
    {
      // Arrange
      var rejectedViewModel = _fixture.Build<RejectHolidayViewModel>().Create();
      var holidayViewModelModel = _fixture.Build<HolidayViewModel>().Create();
      var eventDto = _fixture.Build<EventDto>().Create();

      _eventService.RejectEvent(eventDto);
      _mapper.Map<EventDto, HolidayViewModel>(Arg.Is(eventDto)).Returns(holidayViewModelModel);

      // Act
      var result = _controller.RejectHoliday(rejectedViewModel);

      // Assert
      _eventService.Received(1).RejectEvent(eventDto);
    }

    [Fact]
    public void UpdateHoliday_WhenCalled_ReturnsUpdatedHoliday()
    {
      // Arrange
      var updateViewModel = _fixture.Build<UpdateHolidayViewModel>().Create();
      var eventDto = _fixture.Build<EventDto>().Create();

      _eventService.UpdateEvent(eventDto);
      _mapper.Map<EventDto, UpdateHolidayViewModel>(Arg.Is(eventDto)).Returns(updateViewModel);

      // Act
      var result = _controller.UpdateHoliday(updateViewModel);

      // Assert
      _eventService.Received(1).UpdateEvent(eventDto);
    }
  }
}