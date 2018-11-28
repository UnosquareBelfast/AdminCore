using AdminCore.Common.Interfaces;
using AdminCore.Constants.Enums;
using AdminCore.DAL;
using AdminCore.DAL.Models;
using AdminCore.DTOs.Event;
using AdminCore.DTOs.EventDates;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using AdminCore.Common.Message;

namespace AdminCore.Services
{
  public class EventService : IEventService
  {
    private readonly IDatabaseContext _databaseContext;

    private readonly IMapper _mapper;

    public EventService(IDatabaseContext databaseContext, IMapper mapper)
    {
      _databaseContext = databaseContext;
      _mapper = mapper;
    }

    public ResponseMessage<IList<EventDto>> GetAnnualLeaveByEmployee(int employeeId)
    {
      ResponseMessage<IList<EventDto>> responseMessage = new ResponseMessage<IList<EventDto>>(null);
      var annualLeave = _databaseContext.EventRepository.Get(x =>
        x.EventType.EventTypeId == (int)EventTypes.AnnualLeave
        && x.Employee.EmployeeId == employeeId);
      if (!annualLeave.Any())
      {
        responseMessage.Payload = _mapper.Map<IList<EventDto>>(annualLeave);
        responseMessage.Status = MessageConstants.MsgStatusSuccess;
      }
      else
      {
        responseMessage.Status = MessageConstants.MsgStatusNoRecords;
      }
      return responseMessage;
    }

    public ResponseMessage<IList<EventDto>> GetByDateBetween(DateTime startDate, DateTime endDate, EventTypes eventType)
    {
      ResponseMessage<IList<EventDto>> responseMessage = new ResponseMessage<IList<EventDto>>(null);
      EventDateDto eventDateDto = new EventDateDto
      {
        StartDate = startDate,
        EndDate = endDate
      };

      var eventsBetweenDates = _databaseContext.EventDatesRepository.Get(x => x.StartDate >= eventDateDto.StartDate
                                                                              && x.EndDate <= eventDateDto.EndDate
                                                                              && x.Event.EventTypeId ==
                                                                              (int)EventTypes.AnnualLeave);
      if (!eventsBetweenDates.Any())
      {
        responseMessage.Payload = _mapper.Map<IList<EventDto>>(eventsBetweenDates);
        responseMessage.Status = MessageConstants.MsgStatusSuccess;
      }
      else
      {
        responseMessage.Status = MessageConstants.MsgStatusNoRecords;
      }
      return responseMessage;
    }

    public ResponseMessage<IList<EventDto>> GetEventsByEmployeeId(int employeeId)
    {
      ResponseMessage<IList<EventDto>> responseMessage = new ResponseMessage<IList<EventDto>>(null);
      var events = _databaseContext.EventRepository.Get(x => x.Employee.EmployeeId == employeeId);
      if (!events.Any())
      {
        responseMessage.Payload = _mapper.Map<IList<EventDto>>(events);
        responseMessage.Status = MessageConstants.MsgStatusSuccess;
      }
      else
      {
        responseMessage.Status = MessageConstants.MsgStatusNoRecords;
      }
      return responseMessage;
    }

    public ResponseMessage<IList<EventDto>> GetEventsByEmployeeIdAndStartAndEndDates(int employeeId, DateTime startDate,
      DateTime endDate)
    {
      ResponseMessage<IList<EventDto>> responseMessage = new ResponseMessage<IList<EventDto>>(null);
      var eventsBetweenDates = _databaseContext.EventDatesRepository.Get(x => x.StartDate >= startDate
                                                                              && x.EndDate <= endDate
                                                                              && x.Event.EmployeeId == employeeId);
      if (!eventsBetweenDates.Any())
      {
        responseMessage.Payload = _mapper.Map<IList<EventDto>>(eventsBetweenDates);
        responseMessage.Status = MessageConstants.MsgStatusSuccess;
      }
      else
      {
        responseMessage.Status = MessageConstants.MsgStatusNoRecords;
      }
      return responseMessage;
    }

    public ResponseMessage<EventDto> GetEvent(int id)
    {
      ResponseMessage<EventDto> responseMessage = new ResponseMessage<EventDto>(null);
      var eventById = GetEventById(id);
      if (eventById != null)
      {
        responseMessage.Payload = _mapper.Map<EventDto>(eventById);
        responseMessage.Status = MessageConstants.MsgStatusSuccess;
      }
      else
      {
        responseMessage.Status = MessageConstants.MsgStatusNoRecords;
      }
      return responseMessage;
    }

    public ResponseMessage<IList<EventDto>> GetByStatusType(EventStatuses eventStatus, EventTypes eventType)
    {
      ResponseMessage<IList<EventDto>> responseMessage = new ResponseMessage<IList<EventDto>>(null);
      var events = _databaseContext.EventRepository.Get(x => x.EventStatus.EventStatusId == (int)eventStatus
                                                             && x.EventType.EventTypeId == (int)eventType);
      if (!events.Any())
      {
        responseMessage.Payload = _mapper.Map<IList<EventDto>>(events);
        responseMessage.Status = MessageConstants.MsgStatusSuccess;
      }
      else
      {
        responseMessage.Status = MessageConstants.MsgStatusNoRecords;
      }
      return responseMessage;
    }

    public ResponseMessage<IList<EventDto>> GetByType(EventTypes eventType)
    {
      ResponseMessage<IList<EventDto>> responseMessage = new ResponseMessage<IList<EventDto>>(null);
      var events = _databaseContext.EventRepository.Get(x => x.EventType.EventTypeId == (int)eventType);
      if (!events.Any())
      {
        responseMessage.Payload = _mapper.Map<IList<EventDto>>(events);
        responseMessage.Status = MessageConstants.MsgStatusSuccess;
      }
      else
      {
        responseMessage.Status = MessageConstants.MsgStatusNoRecords;
      }
      return responseMessage;
    }

    public ResponseMessage<string> SaveEvent(EventDto eventDto)
    {
      throw new NotImplementedException();
    }

    public ResponseMessage<string> UpdateEvent(EventDto eventDto)
    {
      ResponseMessage<string> responseMessage = new ResponseMessage<string>(null);
      var existingEvent = GetEventById(eventDto.EventId);
      if (existingEvent != null)
      {
        UpdateEventToChangedEvent(eventDto, existingEvent);
        responseMessage.Status = MessageConstants.MsgStatusSuccess;
        return responseMessage;
      }

      responseMessage.Status = MessageConstants.MsgStatusFailed;
      return responseMessage;
    }

    public ResponseMessage<string> ApproveEvent(EventDto eventDto)
    {
      ResponseMessage<string> responseMessage = new ResponseMessage<string>(null);
      var existingEvent = GetEventById(eventDto.EventId);
      if (existingEvent != null)
      {
        UpdateStatusToApproved(existingEvent);
        responseMessage.Status = MessageConstants.MsgStatusSuccess;
        return responseMessage;
      }

      responseMessage.Status = MessageConstants.MsgStatusFailed;
      return responseMessage;
    }

    public ResponseMessage<string> CancelEvent(EventDto eventDto)
    {
      ResponseMessage<string> responseMessage = new ResponseMessage<string>(null);
      var existingEvent = GetEventById(eventDto.EventId);
      if (existingEvent != null)
      {
        UpdateStatusToCancelled(eventDto, existingEvent);
        responseMessage.Status = MessageConstants.MsgStatusSuccess;
        return responseMessage;
      }

      responseMessage.Status = MessageConstants.MsgStatusFailed;
      return responseMessage;
    }

    public ResponseMessage<List<string>> RejectEvent(int eventId, string message, int employeeId)
    {
      return null;
      /*      ResponseMessage<string> responseMessage = new ResponseMessage<string>(null);
            List<string> responses = new List<string>();
            var existingEvent = GetEventById(eventId);
            if (existingEvent != null)
            {
              //responses = UpdateStatusToRejected(eventId, employeeId, existingEvent, responses);
              //var eventToReject = SetEventStatusToRejected(employeeId, existingEvent, out var employee);
              Event eventToReject = existingEvent;
              eventToReject.EventStatus.EventStatusId = (int)EventStatuses.Rejected;
              Employee employee = GetEmployeeFromEmployeeId(employeeId);
              if (employee != null)
              {
                _mapper.Map(eventId, existingEvent);
                Save(eventToReject);
                responseMessage.Status = MessageConstants.MsgStatusSuccess;
                responseMessage.Payload = "Success";
                return responseMessage;
              }
              else
              {
                responses.Add("No Employee found with an ID of: " + employeeId);
              }
            }
            else
            {
              responses.Add("No Event found with an ID of: " + eventId);
            }

            responseMessage.Payload = responses;
            return responses;*/
    }

    private Event GetEventById(int id)
    {
      return _databaseContext.EventRepository.GetSingle(x => x.EventId == id);
    }

    private void Save(Event eventToSave)
    {
      if (eventToSave.EventId == 0)
      {
        eventToSave.DateCreated = DateTime.Now;
      }

      eventToSave.LastModified = DateTime.Now;
      _databaseContext.SaveChanges();
    }

    private Employee GetEmployeeFromEmployeeId(int employeeId)
    {
      var employee = _databaseContext.EmployeeRepository.GetSingle(x => x.EmployeeId == employeeId);

      return employee;
    }

    private void UpdateEventToChangedEvent(EventDto eventDto, Event existingEvent)
    {
      Event eventToUpdate = _mapper.Map(eventDto, existingEvent);

      Save(eventToUpdate);
    }

    private void UpdateStatusToApproved(Event existingEvent)
    {
      Event eventToApprove = existingEvent;
      eventToApprove.EventStatus.EventStatusId = (int)EventStatuses.Approved;
      Save(eventToApprove);
    }

    private void UpdateStatusToCancelled(EventDto eventDto, Event existingEvent)
    {
      Event eventToCancel = existingEvent;
      eventToCancel.EventStatus.EventStatusId = (int)EventStatuses.Cancelled;
      _mapper.Map(eventDto, existingEvent);

      Save(eventToCancel);
    }

    private List<string> UpdateStatusToRejected(int eventId, int employeeId, Event existingEvent, List<string> responses)
    {
      var eventToReject = SetEventStatusToRejected(employeeId, existingEvent, out var employee);
      if (employee != null)
      {
        _mapper.Map(eventId, existingEvent);
        Save(eventToReject);
      }
      else
      {
        responses.Add("No Employee found with an ID of: " + employeeId);
      }

      return responses;
    }

    private Event SetEventStatusToRejected(int employeeId, Event existingEvent, out Employee employee)
    {
      Event eventToReject = existingEvent;
      eventToReject.EventStatus.EventStatusId = (int)EventStatuses.Rejected;
      employee = GetEmployeeFromEmployeeId(employeeId);
      return eventToReject;
    }
  }
}