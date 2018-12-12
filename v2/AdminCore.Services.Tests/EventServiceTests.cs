using AdminCore.DAL;
using AdminCore.DAL.Models;
using AdminCore.DTOs.Event;
using AdminCore.Services.Mappings;
using AutoMapper;
using NSubstitute;
using System;
using AdminCore.Common.Interfaces;
using Xunit;

namespace AdminCore.Services.Tests
{
  public class EventServiceTests
  {
    private readonly IDatabaseContext _databaseContext;

    private readonly IDateService _dateService;

    private readonly IMapper _mapper;

    private readonly EventService _eventService;

    public EventServiceTests()
    {
      _mapper = new Mapper(new MapperConfiguration(cfg => cfg.AddProfile(new EventMapperProfile())));
      _databaseContext = Substitute.For<IDatabaseContext>();
      _dateService = Substitute.For<IDateService>();
      _eventService = new EventService(_databaseContext, _mapper, _dateService);
    }

    [Fact]
    public void CreateEvent_WhenCalled_SuccessfullyInsertsNewEventIntoDb()
    {
      // Arrange
      const int employeeId = 1;
      var eventDateDto = new EventDateDto
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
      var eventDateDto = new EventDateDto
      {
        EventId = 1,
        StartDate = new DateTime(2018, 11, 21),
        EndDate = new DateTime(2018, 12, 05)
      };

      // Act
      var result = _eventService.CreateEvent(employeeId, eventDateDto);

      // Assert
      Assert.Equal(numOfWeeksShouldReturn, result.EventDates.Count);
    }

    [Fact]
    public void SplitEventIfFallsOnAWeekend_WhenCalledWithEventOfOneDay_ReturnsNewEventWithASingleCollectionOfEventDates()
    {
      // Arrange
      const int numOfWeeksShouldReturn = 1;
      const int employeeId = 1;
      var eventDateDto = new EventDateDto
      {
        EventId = 1,
        StartDate = new DateTime(2018, 12, 05),
        EndDate = new DateTime(2018, 12, 05)
      };

      // Act
      var result = _eventService.CreateEvent(employeeId, eventDateDto);

      // Assert
      Assert.Equal(numOfWeeksShouldReturn, result.EventDates.Count);
    }
  }
}