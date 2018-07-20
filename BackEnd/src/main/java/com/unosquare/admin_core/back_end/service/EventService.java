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

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EventService {

    @Autowired
    EventRepository eventRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<Event> findByType(EventTypes eventType) {
        return eventRepository.findByEventType(new EventType(eventType.getEventTypeId()));
    }

    public Event findById(int id) {
        Optional<Event> result = eventRepository.findById(id);
        if (result.isPresent()) {
            return result.get();
        }
        return null;
    }

    public List<EventDTO> findByEmployee(int employeeId) {
        List<Event> events = eventRepository.findByEmployee(new Employee(employeeId));
        return mapEventsToDtos(events);
    }

    public EventDTO findByEmployeeIdStartDataEndDate(int employeeId, LocalDate startDate, LocalDate endDate){

        Event event = eventRepository.findByEmployeeAndStartDateAndEndDate(new Employee(employeeId), startDate, endDate);

       // return modelMapper.map(event, EventDTO.class);
        return (event != null ) ? modelMapper.map(event, EventDTO.class) : null;


    }

    public void save(int employeeId, Event event) {
        Preconditions.checkNotNull(event);

        eventRepository.save(event);
    }

    private Event checkForHolidayWithSameDate(Event holiday) {
        List<Event> holidayWithSameDate = eventRepository.findByStartDateAndEmployeeAndEventType(holiday.getStartDate(),
                holiday.getEmployee(),
                new EventType(EventTypes.ANNUAL_LEAVE.getEventTypeId()));
        if (holidayWithSameDate != null) {
        }

        return holiday;
    }

    public List<Event> findByDateBetween(LocalDate rangeStart, LocalDate rangeEnd) {
        return eventRepository.findByStartDateBetween(rangeStart, rangeEnd);
    }

    public List<Event> findByStatusAndType(EventStatuses eventStatus, EventTypes eventType) {
        return eventRepository.findByEventStatusAndEventType(new EventStatus(eventStatus.getEventStatusId()), new EventType(eventType.getEventTypeId()));
    }

    private List<EventDTO> mapEventsToDtos(List<Event> events) {
        return events.stream().map(event -> modelMapper.map(event, EventDTO.class)).collect(Collectors.toList());
    }
}

