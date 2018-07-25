package com.unosquare.admin_core.back_end.service;

import com.google.common.base.Preconditions;
import com.unosquare.admin_core.back_end.dto.EventDTO;
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

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EventService {

    @Autowired
    EventRepository eventRepository;
    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private ModelMapper modelMapper;

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

    public EventDTO findByEmployeeIdStartDataEndDate(int employeeId, LocalDate startDate, LocalDate endDate){

        Event event = eventRepository.findByEmployeeAndStartDateAndEndDateAndEventType(new Employee(employeeId), startDate, endDate,new EventType(EventTypes.ANNUAL_LEAVE.getEventTypeId()));
        return (event != null ) ? modelMapper.map(event, EventDTO.class) : null;
    }

    private void save(Event event) {
        Preconditions.checkNotNull(event);
        event.setDateCreated(LocalDate.now());
        event.setLastModified(LocalDate.now());
        event.setEmployee(entityManager.find(Employee.class, event.getEmployee().getEmployeeId()));

        eventRepository.save(event);
    }

    @Transactional
    public void saveEvents(EventDTO... eventDtos){
        Preconditions.checkNotNull(eventDtos);

        for(EventDTO eventDto : eventDtos) {
            Event event = modelMapper.map(eventDto,Event.class);
            save(event);
        }
    }

    private EventDTO checkForEventWithSameDate(EventDTO event) {
        List<Event> holidayWithSameDate = eventRepository.findByStartDateAndEmployeeAndEventType(event.getStartDate(),
                new Employee(event.getEmployee().getEmployeeId()),
                new EventType(EventTypes.ANNUAL_LEAVE.getEventTypeId()));
        if (holidayWithSameDate != null) {
        }

        return modelMapper.map(holidayWithSameDate.get(0), EventDTO.class);
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

