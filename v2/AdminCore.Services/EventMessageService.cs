using AdminCore.Common.Interfaces;
using AdminCore.Constants.Enums;
using AdminCore.DAL;
using AdminCore.DAL.Models;
using AdminCore.DTOs.EventMessage;
using AdminCore.Services.Base;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using EventMessage = AdminCore.DAL.Models.EventMessage;

namespace AdminCore.Services
{
  public class EventMessageService : BaseService, IEventMessageService
  {
    private readonly IMapper _mapper;
    private readonly IDateService _dateService;

    public EventMessageService(IDatabaseContext databaseContext, IMapper mapper, IDateService dateService)
      : base(databaseContext)
    {
      _mapper = mapper;
      _dateService = dateService;
    }

    public IList<EventMessageDto> GetAllEventMessagesForEvent(int eventId)
    {
      var eventMessages = DatabaseContext.EventMessageRepository.GetAsQueryable(x => x.EventId == eventId, null,
                                                                                x => x.Employee)
                                                                                .OrderByDescending(x => x.LastModified).ToList();
      return _mapper.Map<IList<EventMessageDto>>(eventMessages);
    }

    public void CreateGeneralEventMessage(int eventId, string message, int employeeId)
    {
      var returnedEvent = DatabaseContext.EventRepository.GetSingle(x => x.EventId == eventId);
      if (returnedEvent != null)
      {
        var eventMessage = BuildEventMessage(message, returnedEvent, employeeId);
        AddEventMessageToEvent(returnedEvent, eventMessage);

        InsertEventMessageIntoDb(eventMessage);
      }
      else
      {
        throw new Exception("Event " + eventId + " not found.");
      }
    }

    private EventMessage BuildEventMessage(string message, Event returnedEvent, int employeeId)
    {
      var eventMessage = new EventMessage
      {
        EventId = returnedEvent.EventId,
        Message = message,
        LastModified = _dateService.GetCurrentDateTime(),
        EmployeeId = employeeId,
        EventMessageTypeId = (int)EventMessageTypes.General,
      };
      return eventMessage;
    }

    private static void AddEventMessageToEvent(Event returnedEvent, EventMessage eventMessage)
    {
      if (returnedEvent.EventMessages == null)
      {
        returnedEvent.EventMessages = new List<EventMessage> { eventMessage };
      }
      else
      {
        returnedEvent.EventMessages.Add(eventMessage);
      }
    }

    private void InsertEventMessageIntoDb(EventMessage eventMessage)
    {
      DatabaseContext.EventMessageRepository.Insert(eventMessage);
      DatabaseContext.SaveChanges();
    }
  }
}