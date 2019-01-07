using AdminCore.Common.Interfaces;
using AdminCore.Constants.Enums;
using AdminCore.DAL;
using AdminCore.DAL.Models;
using AdminCore.DTOs.Event;
using AdminCore.Services.Mappings;
using AutoMapper;
using NSubstitute;
using System;
using Xunit;

namespace AdminCore.Services.Tests
{
  public class EventServiceTests
  {
    private readonly IAuthenticatedUser _authenticatedUser;

    private readonly IDatabaseContext _databaseContext;

    private readonly IDateService _dateService;

    private readonly IMapper _mapper;

    private readonly EventService _eventService;

    public EventServiceTests()
    {
      _authenticatedUser = Substitute.For<IAuthenticatedUser>();
      _authenticatedUser.RetrieveUserId().Returns(1);
      _mapper = new Mapper(new MapperConfiguration(cfg => cfg.AddProfile(new EventMapperProfile())));
      _databaseContext = Substitute.For<IDatabaseContext>();
      _dateService = Substitute.For<IDateService>();
      _eventService = new EventService(_databaseContext, _mapper, _dateService, _authenticatedUser);
    }

    [Fact]
    public void CreateEvent_WhenCalled_SuccessfullyInsertsNewEventIntoDb()
    {
      // Arrange
      var eventDateDto = new EventDateDto
      {
        EventId = 1,
        StartDate = new DateTime(2018, 12, 03),
        EndDate = new DateTime(2018, 12, 05)
      };

      // Act
      _eventService.CreateEvent(eventDateDto, EventTypes.AnnualLeave);

      // Assert
      _databaseContext.Received(1).EventRepository.Insert(Arg.Any<Event>());
    }

    [Fact]
    public void SplitEventIfFallsOnAWeekend_WhenCalledWithEventOfThreeWeeks_ReturnsNewEventWithThreeCollectionsOfEventDates()
    {
      // Arrange
      const int numOfWeeksShouldReturn = 3;
      var eventDateDto = new EventDateDto
      {
        EventId = 1,
        StartDate = new DateTime(2018, 11, 21),
        EndDate = new DateTime(2018, 12, 05)
      };

      // Act
      var result = _eventService.CreateEvent(eventDateDto, EventTypes.AnnualLeave);

      // Assert
      Assert.Equal(numOfWeeksShouldReturn, result.EventDates.Count);
    }

    [Fact]
    public void SplitEventIfFallsOnAWeekend_WhenCalledWithEventOfOneDay_ReturnsNewEventWithASingleCollectionOfEventDates()
    {
      // Arrange
      const int numOfWeeksShouldReturn = 1;
      var eventDateDto = new EventDateDto
      {
        EventId = 1,
        StartDate = new DateTime(2018, 12, 05),
        EndDate = new DateTime(2018, 12, 05)
      };

      // Act
      var result = _eventService.CreateEvent(eventDateDto, EventTypes.AnnualLeave);

      // Assert
      Assert.Equal(numOfWeeksShouldReturn, result.EventDates.Count);
    }
  }
}