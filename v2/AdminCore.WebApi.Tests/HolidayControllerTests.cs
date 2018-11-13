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
      var holidayToApproveModel = _fixture.Build<ApproveHolidayViewModel>().Create();
      var holidayToApproveDto = _fixture.Build<EventDto>().Create();
      var holidayApprovedDto = _fixture.Build<EventDto>().Create();
      var holidayApprovedModel = _fixture.Build<HolidayViewModel>().Create();
      _eventService.ApproveEvent(holidayToApproveDto).Returns(holidayApprovedDto);

      _mapper.Map<ApproveHolidayViewModel, EventDto>(Arg.Is(holidayToApproveModel)).Returns(holidayToApproveDto);
      _mapper.Map<EventDto, HolidayViewModel>(Arg.Is(holidayApprovedDto)).Returns(holidayApprovedModel);
      // Act
      var result = _controller.ApproveHoliday(holidayToApproveModel);
      // Assert
      // TODO: Check result wrapper
      // payload is not null
      // error message is null
    }

    [Fact]
    public void UpdateHoliday_WhenCalled_ReturnsUpdatedHoliday()
    {
      // Arrange
      var holidayToUpdateModel = _fixture.Build<UpdateHolidayViewModel>().Create();
      var holidayToUpdateDto = _fixture.Build<EventDto>().Create();
      var holidayUpdatedDto = _fixture.Build<EventDto>().Create();
      var holidayUpdatedModel = _fixture.Build<HolidayViewModel>().Create();
      _eventService.UpdateEvent(holidayToUpdateDto).Returns(holidayUpdatedDto);
      _mapper.Map<UpdateHolidayViewModel, EventDto>(Arg.Is(holidayToUpdateModel)).Returns(holidayToUpdateDto);
      _mapper.Map<EventDto, HolidayViewModel>(Arg.Is(holidayUpdatedDto)).Returns(holidayUpdatedModel);
      // Act
      var result = _controller.UpdateHoliday(holidayToUpdateModel);
      // Assert
      // TODO: Check result wrapper
      // payload is not null
      // error message is null
    }

    [Fact]
    public void CancelHoliday_WhenCalled_ReturnsCancelledHoliday()
    {
      // Arrange
      var holidayToCancelModel = _fixture.Build<CancelHolidayViewModel>().Create();
      var holidayToCancelDto = _fixture.Build<EventDto>().Create();
      var holidayCanceldDto = _fixture.Build<EventDto>().Create();
      var holidayCanceldModel = _fixture.Build<HolidayViewModel>().Create();
      _eventService.CancelEvent(holidayToCancelDto).Returns(holidayCanceldDto);
      _mapper.Map<CancelHolidayViewModel, EventDto>(Arg.Is(holidayToCancelModel)).Returns(holidayToCancelDto);
      _mapper.Map<EventDto, HolidayViewModel>(Arg.Is(holidayCanceldDto)).Returns(holidayCanceldModel);
      // Act
      var result = _controller.CancelHoliday(holidayToCancelModel);
      // Assert
      // TODO: Check result wrapper
      // payload is not null
      // error message is null
    }

    [Fact]
    public void CreateHolidayWithCorrectType_WhenCalled_ReturnsCreatedHoliday()
    {
      // Arrange
      var holidayToSaveModel = _fixture.Build<CreateHolidayViewModel>().Create();
      var holidayToSaveDto = _fixture.Build<EventDto>().Create();
      var holidaySavedDto = _fixture.Build<EventDto>().Create();
      var holidaySavedModel = _fixture.Build<HolidayViewModel>().Create();
      _eventService.SaveEvent(holidayToSaveDto).Returns(holidaySavedDto);
      _mapper.Map<CreateHolidayViewModel, EventDto>(Arg.Is(holidayToSaveModel)).Returns(holidayToSaveDto);
      _mapper.Map<EventDto, HolidayViewModel>(Arg.Is(holidaySavedDto)).Returns(holidaySavedModel);
      // Act
      var result = _controller.CreateHoliday(holidayToSaveModel);
      // Assert
      // TODO: Check result wrapper
      // payload is not null
      // error message is null
    }

    [Fact]
    public void CreateHolidayWithIncorrectType_WhenCalled_ReturnsError()
    {
      // Arrange
      var holidayToSaveModel = _fixture.Build<CreateHolidayViewModel>()
        .With(x => x.eventType, null)
        .Create();
      var holidayToSaveDto = _fixture.Build<EventDto>().Create();
      var holidaySavedDto = _fixture.Build<EventDto>().Create();
      var holidaySavedModel = _fixture.Build<HolidayViewModel>().Create();
      _eventService.SaveEvent(holidayToSaveDto).Returns(holidaySavedDto);
      _mapper.Map<CreateHolidayViewModel, EventDto>(Arg.Is(holidayToSaveModel)).Returns(holidayToSaveDto);
      _mapper.Map<EventDto, HolidayViewModel>(Arg.Is(holidaySavedDto)).Returns(holidaySavedModel);
      // Act
      var result = _controller.CreateHoliday(holidayToSaveModel);
      // Assert
      // TODO: Check result wrapper
      // payload is null
      // error message is not null
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
    }

    [Fact]
    public void GetAllHolidaysByEmployeeId_WhenCalled_ReturnsAllHolidaysOfEmployeedId()
    {
      // Arrange
      const int employeeId = 123;
      var employee = _fixture.Build<EmployeeDto>().With(x => x.EmployeeId, employeeId).Create();
      var eventDto = _fixture.Build<EventDto>().With(x => x.Employee, employee).Create();

      var fixture = new Fixture { RepeatCount = 1 };
      var eventDtoList = fixture.Repeat(() => fixture.Build<EventDto>()
        .With(x => x.Employee, employee)
        .Create()).ToList();

      var holidayViewModelModel = _fixture.Build<HolidayViewModel>().Create();

      _mapper.Map<HolidayViewModel, EventDto>(Arg.Is(holidayViewModelModel)).Returns(eventDto);

      _eventService.GetByEmployeeId(employeeId).Returns(eventDtoList);

      // Act
      var result = _controller.GetHolidayByEmployeeId(employeeId);

      // Assert
    }

    [Fact]
    public void GetAllHolidaysByHolidayId_WhenCalled_ReturnsAllHolidaysOfHolidayId()
    {
      // Arrange
      const int holidayID = 123;

      var eventDto = _fixture.Build<EventDto>().With(x => x.EventId, holidayID).Create();

      var holidayViewModelModel = _fixture.Build<HolidayViewModel>().Create();

      _mapper.Map<HolidayViewModel, EventDto>(Arg.Is(holidayViewModelModel)).Returns(eventDto);

      _eventService.Get(holidayID).Returns(eventDto);

      // Act
      var result = _controller.GetHolidayByHolidayId(holidayID);

      // Assert
    }

    [Fact]
    public void GetHolidayByDateBetween_WhenCalled_ReturnsAllHolidaysBetweenTwoDates()
    {
      // Arrange
      var eventDate = _fixture.Build<EventDate>().Create();
      var eventDateDto = _fixture.Build<EventDateDto>().Create();

      var eventDto = _fixture.Build<EventDto>().With(x => x.EventDates).Create();
      var holidayViewModelModel = _fixture.Build<HolidayViewModel>().Create();

      var fixture = new Fixture { RepeatCount = 1 };
      var eventDtoList = fixture.Repeat(() => fixture.Build<EventDto>()
        .Create()).ToList();

      _mapper.Map<HolidayViewModel, EventDto>(Arg.Is(holidayViewModelModel)).Returns(eventDto);

      _eventService.GetByDateBetween(eventDateDto, EventTypes.AnnualLeave).Returns(eventDtoList);

      // Act
      var result = _controller.GetHolidayByDateBetween(eventDate);

      // Assert
    }

    [Fact]
    public void GetHolidayByStatusApproved_WhenCalled_ReturnsAllHolidaysOfThatHolidayStatus()
    {
      // Arrange
      const EventStatuses eventStatuses = EventStatuses.Approved;
      const EventTypes eventTypes = EventTypes.AnnualLeave;

      var eventDto = _fixture.Build<EventDto>().With(x => x.EventStatusDescription, eventStatuses.ToString()).Create();
      var holidayViewModelModel = _fixture.Build<HolidayViewModel>().Create();

      var fixture = new Fixture { RepeatCount = 1 };
      var eventDtoList = fixture.Repeat(() => fixture.Build<EventDto>()
        .Create()).ToList();

      _mapper.Map<HolidayViewModel, EventDto>(Arg.Is(holidayViewModelModel)).Returns(eventDto);

      _eventService.GetByStatusType(eventStatuses, eventTypes).Returns(eventDtoList);

      // Act
      var result = _controller.GetHolidayByStatus((int)eventStatuses);

      // Assert
    }

    [Fact]
    public void GetHolidayByStatusAwaitingApproval_WhenCalled_ReturnsAllHolidaysOfThatHolidayStatus()
    {
      // Arrange
      const EventStatuses eventStatuses = EventStatuses.AwaitingApproval;
      const EventTypes eventTypes = EventTypes.AnnualLeave;

      var eventDto = _fixture.Build<EventDto>().With(x => x.EventStatusDescription, eventStatuses.ToString()).Create();
      var holidayViewModelModel = _fixture.Build<HolidayViewModel>().Create();

      var fixture = new Fixture { RepeatCount = 1 };
      var eventDtoList = fixture.Repeat(() => fixture.Build<EventDto>()
        .Create()).ToList();

      _mapper.Map<HolidayViewModel, EventDto>(Arg.Is(holidayViewModelModel)).Returns(eventDto);

      _eventService.GetByStatusType(eventStatuses, eventTypes).Returns(eventDtoList);

      // Act
      var result = _controller.GetHolidayByStatus((int)eventStatuses);

      // Assert
    }

    [Fact]
    public void GetHolidayByStatusCancelled_WhenCalled_ReturnsAllHolidaysOfThatHolidayStatus()
    {
      // Arrange
      const EventStatuses eventStatuses = EventStatuses.Cancelled;
      const EventTypes eventTypes = EventTypes.AnnualLeave;

      var eventDto = _fixture.Build<EventDto>().With(x => x.EventStatusDescription, eventStatuses.ToString()).Create(); //TODO Check to string method is correct
      var holidayViewModelModel = _fixture.Build<HolidayViewModel>().Create();

      var fixture = new Fixture { RepeatCount = 1 };
      var eventDtoList = fixture.Repeat(() => fixture.Build<EventDto>()
        .Create()).ToList();

      _mapper.Map<HolidayViewModel, EventDto>(Arg.Is(holidayViewModelModel)).Returns(eventDto);

      _eventService.GetByStatusType(eventStatuses, eventTypes).Returns(eventDtoList);

      // Act
      var result = _controller.GetHolidayByStatus((int)eventStatuses);

      // Assert
    }

    [Fact]
    public void GetHolidayByStatusRejected_WhenCalled_ReturnsAllHolidaysOfThatHolidayStatus()
    {
      // Arrange
      const EventStatuses eventStatuses = EventStatuses.Rejected;
      const EventTypes eventTypes = EventTypes.AnnualLeave;

      var eventDto = _fixture.Build<EventDto>().With(x => x.EventStatusDescription, eventStatuses.ToString()).Create();
      var holidayViewModelModel = _fixture.Build<HolidayViewModel>().Create();

      var fixture = new Fixture { RepeatCount = 1 };
      var eventDtoList = fixture.Repeat(() => fixture.Build<EventDto>()
        .Create()).ToList();

      _mapper.Map<HolidayViewModel, EventDto>(Arg.Is(holidayViewModelModel)).Returns(eventDto);

      _eventService.GetByStatusType(eventStatuses, eventTypes).Returns(eventDtoList);

      // Act
      var result = _controller.GetHolidayByStatus((int)eventStatuses);

      // Assert
    }

    [Fact]
    public void RejectHoliday_WhenCalled_ReturnsRejectedHoliday()
    {
      // Arrange
      var holidayToRejectModel = _fixture.Build<RejectHolidayViewModel>().Create();
      var holidayToRejectDto = _fixture.Build<EventDto>().Create();
      var holidayRejectdDto = _fixture.Build<EventDto>().Create();
      var holidayRejectdModel = _fixture.Build<HolidayViewModel>().Create();
      _eventService.RejectEvent(holidayToRejectDto).Returns(holidayRejectdDto);
      _mapper.Map<RejectHolidayViewModel, EventDto>(Arg.Is(holidayToRejectModel)).Returns(holidayToRejectDto);
      _mapper.Map<EventDto, HolidayViewModel>(Arg.Is(holidayRejectdDto)).Returns(holidayRejectdModel);
      // Act
      var result = _controller.RejectHoliday(holidayToRejectModel);
      // Assert
      // TODO: Check result wrapper
      // payload is not null
      // error message is null
    }
  }
}