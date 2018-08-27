package com.unosquare.admin_core.back_end.service;

import com.google.common.base.Preconditions;
import com.unosquare.admin_core.back_end.dto.EventDTO;
import com.unosquare.admin_core.back_end.dto.UpdateEventDTO;
import com.unosquare.admin_core.back_end.entity.Employee;
import com.unosquare.admin_core.back_end.entity.Event;
import com.unosquare.admin_core.back_end.entity.EventStatus;
import com.unosquare.admin_core.back_end.entity.EventType;
import com.unosquare.admin_core.back_end.enums.EventStatuses;
import com.unosquare.admin_core.back_end.enums.EventTypes;
import com.unosquare.admin_core.back_end.repository.EventRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EventService {

    @Autowired
    EventRepository eventRepository;

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

    public EventDTO findByEmployeeIdStartDataEndDate(int employeeId, LocalDate startDate, LocalDate endDate, EventTypes eventType){

        Event event = eventRepository.findByEmployeeAndStartDateAndEndDateAndEventType(new Employee(employeeId), startDate, endDate,new EventType(eventType.getEventTypeId()));
        return (event != null ) ? modelMapper.map(event, EventDTO.class) : null;
    }

    private void save(Event event) {
        Preconditions.checkNotNull(event);

        if (event.getEventId() > 0) {
            event.setDateCreated(LocalDate.now());
        }
        event.setLastModified(LocalDate.now());
        eventRepository.save(event);
    }

    @Transactional
    public void saveEvents(EventDTO... eventDtos){
        Preconditions.checkNotNull(eventDtos);
        for(EventDTO eventDto : eventDtos) {
            Event event = modelMapper.map(eventDto, Event.class);
            save(event);
        }
    }

    public  void updateEvent(UpdateEventDTO updateEventDTO){
        Preconditions.checkNotNull(updateEventDTO);
        Optional<Event> retrievedEvent = eventRepository.findById(updateEventDTO.getEventId());
        if(retrievedEvent.isPresent()){
            Event event = retrievedEvent.get();
            modelMapper.map(updateEventDTO, event);
            save(event);
        }
    }

    public void approveEvent(int eventId){
        Optional<Event> retrievedEvent = eventRepository.findById(eventId);
        if (retrievedEvent.isPresent()) {
            Event event = retrievedEvent.get();
            event.setEventStatus(new EventStatus(EventStatuses.APPROVED.getEventStatusId()));
            save(event);
        }
    }

    public void cancelEvent(int eventId){
        Optional<Event> retrievedEvent = eventRepository.findById(eventId);
        if (retrievedEvent.isPresent()) {
            Event event = retrievedEvent.get();
            event.setEventStatus(new EventStatus(EventStatuses.CANCELLED.getEventStatusId()));
            save(event);
        }
    }

    public List<EventDTO> findByDateBetween(LocalDate rangeStart, LocalDate rangeEnd,EventTypes eventType) {//Pass in event type
        return mapEventsToDtos(eventRepository.findByStartDateBetweenAndEventType(rangeStart, rangeEnd,new EventType(eventType.getEventTypeId())));
    }

    public List<EventDTO> findByStatusAndType(EventStatuses eventStatus, EventTypes eventType) {
        List<Event> events = eventRepository.findByEventStatusAndEventType(new EventStatus(eventStatus.getEventStatusId()),
                new EventType(eventType.getEventTypeId()));

        return mapEventsToDtos(events);
    }

    private List<EventDTO> mapEventsToDtos(List<Event> events) {
        return events.stream().map(event -> modelMapper.map(event, EventDTO.class)).collect(Collectors.toList());
    }

    

}

