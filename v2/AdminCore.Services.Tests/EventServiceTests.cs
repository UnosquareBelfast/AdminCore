using AdminCore.Constants.Enums;
using AdminCore.DAL;
using AdminCore.DAL.Models;
using AdminCore.DTOs.Event;
using AutoMapper;
using NSubstitute;
using System;
using System.Collections.Generic;
using Xunit;

namespace AdminCore.Services.Tests
{
  public class EventServiceTests
  {
    private readonly IDatabaseContext _databaseContext;

    private readonly IMapper _mapper;

    private readonly EventService _eventService;

    public EventServiceTests()
    {
      _databaseContext = Substitute.For<IDatabaseContext>();
      _mapper = Substitute.For<IMapper>();
      _eventService = new EventService(_databaseContext, _mapper);
    }

    [Fact]
    public void CreateEvent_WhenCalled_SuccessfullyInsertsNewEventIntoDb()
    {
      // Arrange
      const int employeeId = 1;
      EventDateDto eventDateDto = new EventDateDto
      {
        EventId = 1,
        StartDate = new DateTime(2018, 12, 03),
        EndDate = new DateTime(2018, 12, 05)
      };

      // Act
      _eventService.CreateEvent(employeeId, eventDateDto);

      // Assert
      _databaseContext.Received(1).EventRepository.Insert(Arg.Any<Event>());
    }

    [Fact]
    public void SplitEventIfFallsOnAWeekend_WhenCalledWithEventOfThreeWeeks_ReturnsNewEventWithThreeCollectionsOfEventDates()
    {
      // Arrange
      const int numOfWeeksShouldReturn = 3;
      const int employeeId = 1;
      DateTime startDate = new DateTime(2018, 11, 21);
      DateTime originalEndDate = new DateTime(2018, 12, 05);
      var eventToSplit = new Event()
      {
        DateCreated = DateTime.Now,
        EmployeeId = employeeId,
        EventStatusId = (int)EventStatuses.AwaitingApproval,
        EventTypeId = (int)EventTypes.AnnualLeave,
        EventDates = new List<EventDate>()
      };

      // Act
      var result = _eventService.SplitEventIfFallsOnAWeekend(eventToSplit, originalEndDate, startDate);

      // Assert
      Assert.Equal(numOfWeeksShouldReturn, result.EventDates.Count);
    }

    [Fact]
    public void SplitEventIfFallsOnAWeekend_WhenCalledWithEventOfOneDay_ReturnsNewEventWithASingleCollectionOfEventDates()
    {
      // Arrange
      const int numOfWeeksShouldReturn = 1;
      const int employeeId = 1;
      DateTime startDate = new DateTime(2018, 12, 05);
      DateTime originalEndDate = new DateTime(2018, 12, 05);
      var eventToSplit = new Event
      {
        DateCreated = DateTime.Now,
        EmployeeId = employeeId,
        EventStatusId = (int)EventStatuses.AwaitingApproval,
        EventTypeId = (int)EventTypes.AnnualLeave,
        EventDates = new List<EventDate>()
      };

      // Act
      var result = _eventService.SplitEventIfFallsOnAWeekend(eventToSplit, originalEndDate, startDate);

      // Assert
      Assert.Equal(numOfWeeksShouldReturn, result.EventDates.Count);
    }
  }
}