package com.unosquare.admin_core.back_end.service;

import com.google.common.base.Preconditions;
import com.unosquare.admin_core.back_end.dto.EventDTO;
import com.unosquare.admin_core.back_end.dto.UpdateEventDTO;
import com.unosquare.admin_core.back_end.entity.*;
import com.unosquare.admin_core.back_end.enums.EventMessageTypes;
import com.unosquare.admin_core.back_end.enums.EventStatuses;
import com.unosquare.admin_core.back_end.enums.EventTypes;
import com.unosquare.admin_core.back_end.repository.EmployeeRepository;
import com.unosquare.admin_core.back_end.repository.EventMessageRepository;
import com.unosquare.admin_core.back_end.repository.EventRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.transaction.TransactionScoped;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EventService {

    @Autowired
    EventRepository eventRepository;

    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    EventMessageRepository eventMessageRepository;

    @Autowired
    ModelMapper modelMapper;

    public List<EventDTO> findByType(EventTypes eventType) {
        return mapEventsToDtos(eventRepository.findByEventType(new EventType(eventType.getEventTypeId())));
    }

    public EventDTO findById(int id) {
        Optional<Event> result = eventRepository.findById(id);
        if (result.isPresent()) {
            return modelMapper.map(result.get(), EventDTO.class);
        }
        return null;
    }

    public List<EventDTO> findByEmployee(int employeeId) {
        List<Event> events = eventRepository.findByEmployee(new Employee(employeeId));
        return mapEventsToDtos(events);
    }

    public EventDTO findByEmployeeIdStartDataEndDate(int employeeId, LocalDate startDate, LocalDate endDate, EventTypes eventType) {

        Event event = eventRepository.findByEmployeeAndStartDateAndEndDateAndEventType(new Employee(employeeId), startDate, endDate, new EventType(eventType.getEventTypeId()));
        return (event != null) ? modelMapper.map(event, EventDTO.class) : null;
    }

    @Transactional
    public void saveEvents(EventDTO... eventDtos) {
        Preconditions.checkNotNull(eventDtos);
        for (EventDTO eventDto : eventDtos) {
            Event event = modelMapper.map(eventDto, Event.class);
            save(event);
        }
    }

    @Transactional
    public void updateEvent(UpdateEventDTO updateEventDTO) {
        Preconditions.checkNotNull(updateEventDTO);
        Optional<Event> retrievedEvent = eventRepository.findById(updateEventDTO.getEventId());
        if (retrievedEvent.isPresent()) {
            Event event = retrievedEvent.get();
            modelMapper.map(updateEventDTO, event);
            EventMessage eventMessage = mapToEventMessage(updateEventDTO.getMessage(), event, event.getEmployee(), EventMessageTypes.GENERAL.getEventStatusId());
            save(event);
            saveEventMessage(eventMessage);
        }
    }

    public void approveEvent(int eventId) {
        Optional<Event> retrievedEvent = eventRepository.findById(eventId);
        if (retrievedEvent.isPresent()) {
            Event event = retrievedEvent.get();
            event.setEventStatus(new EventStatus(EventStatuses.APPROVED.getEventStatusId()));
            save(event);
        }
    }

    public void cancelEvent(int eventId) {
        Optional<Event> retrievedEvent = eventRepository.findById(eventId);
        if (retrievedEvent.isPresent()) {
            Event event = retrievedEvent.get();
            event.setEventStatus(new EventStatus(EventStatuses.CANCELLED.getEventStatusId()));
            save(event);
        }
    }

    @Transactional
    public List<String> rejectEvent(int eventId, String message, int employeeId) {
        List<String> responses = new ArrayList<>();
        Optional<Event> retrievedEvent = eventRepository.findById(eventId);
        if (retrievedEvent.isPresent()) {
            Event event = retrievedEvent.get();
            event.setEventStatus(new EventStatus(EventStatuses.REJECTED.getEventStatusId()));
            Employee employee = getEmployeeFromEmployeeId(employeeId);
            if (employee != null ) {
                EventMessage eventMessage = mapToEventMessage(message, event, employee, EventStatuses.REJECTED.getEventStatusId());
                saveEventMessage(eventMessage);
                if (event.getEventStatus().getEventStatusId() != EventStatuses.REJECTED.getEventStatusId()) {
                    save(event);
                }
            } else {
                responses.add("No employee found with an ID of: " + employeeId);
            }
        } else {
            responses.add("No event found with an ID of: " + eventId);
        }
        return responses;
    }

    public List<EventDTO> findByDateBetween(LocalDate rangeStart, LocalDate rangeEnd, EventTypes eventType) {//Pass in event type
        return mapEventsToDtos(eventRepository.findByStartDateBetweenAndEventType(rangeStart, rangeEnd, new EventType(eventType.getEventTypeId())));
    }

    public List<EventDTO> findByStatusAndType(EventStatuses eventStatus, EventTypes eventType) {
        List<Event> events = eventRepository.findByEventStatusAndEventType(new EventStatus(eventStatus.getEventStatusId()),
                new EventType(eventType.getEventTypeId()));

        return mapEventsToDtos(events);
    }

    private List<EventDTO> mapEventsToDtos(List<Event> events) {
        return events.stream().map(event -> modelMapper.map(event, EventDTO.class)).collect(Collectors.toList());
    }

    private EventMessage mapToEventMessage(String message, Event event, Employee emp, int eventMessageTypeId) {
        EventMessage eventMessage = new EventMessage();
        eventMessage.setEmployee(emp);
        eventMessage.setMessage(message);
        eventMessage.setLastModified(LocalDate.now());
        eventMessage.setEvent(event);
        if (EventMessageTypes.REJECTED.getEventStatusId() == eventMessageTypeId) {
            eventMessage.setEventMessageType(new EventMessageType(EventMessageTypes.REJECTED.getEventStatusId()));
        } else {
            eventMessage.setEventMessageType(new EventMessageType(EventMessageTypes.GENERAL.getEventStatusId()));
        }
        return eventMessage;
    }

    private void save(Event event) {
        Preconditions.checkNotNull(event);

        if (event.getEventId() > 0) {
            event.setDateCreated(LocalDate.now());
        }
        event.setLastModified(LocalDate.now());
        eventRepository.save(event);
    }

    private void saveEventMessage(EventMessage eventMessage) {
        Preconditions.checkNotNull(eventMessage);

        if (eventMessage.getEventMessageId() > 0) {
            eventMessage.setLastModified(LocalDate.now());
        }
        eventMessage.setLastModified(LocalDate.now());
        eventMessageRepository.save(eventMessage);
    }


    private Employee getEmployeeFromEmployeeId(int employeeId){
        Optional<Employee> employee = employeeRepository.findById(employeeId);
        if (employee.isPresent()) {
            return employee.get();
        }
        return null;
    }
}

