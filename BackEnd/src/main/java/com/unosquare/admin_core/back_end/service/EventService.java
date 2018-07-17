package com.unosquare.admin_core.back_end.service;

import com.google.common.base.Preconditions;
import com.unosquare.admin_core.back_end.entity.Employee;
import com.unosquare.admin_core.back_end.entity.Event;
import com.unosquare.admin_core.back_end.entity.EventStatus;
import com.unosquare.admin_core.back_end.entity.EventType;
import com.unosquare.admin_core.back_end.enums.EventStatuses;
import com.unosquare.admin_core.back_end.enums.EventTypes;
import com.unosquare.admin_core.back_end.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class EventService {

    @Autowired
    EventRepository eventRepository;

    @PersistenceContext
    private EntityManager entityManager;

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

    public List<Event> findByEmployee(int employeeId) {
        return eventRepository.findByEmployee(new Employee(employeeId));
    }

    public Event findByEmployeeIdStartDataEndDate(int employeeId, LocalDate startDate, LocalDate endDate){
        return eventRepository.findByEmployeeAndStartDateAndEndDate(new Employee(employeeId), startDate, endDate);
    }

    public void save(int employeeId, Event event) {
        Preconditions.checkNotNull(event);

        event.setEventType(entityManager.find(com.unosquare.admin_core.back_end.entity.EventType.class, event.getEventType().getEventTypeId()));
        event.setEventStatus(entityManager.find(com.unosquare.admin_core.back_end.entity.EventStatus.class, EventStatuses.AWAITING_APPROVAL.getEventStatusId()));
        event.setDateCreated(LocalDate.now());
        event.setLastModified(LocalDate.now());

        event.setEmployee(entityManager.find(Employee.class, employeeId));

        eventRepository.save(checkForHolidayWithSameDate(event));
    }

    private Event checkForHolidayWithSameDate(Event holiday) {
        Event holidayWithSameDate = eventRepository.findByStartDateAndEmployee(holiday.getStartDate(), holiday.getEmployee());
        if (holidayWithSameDate != null) {
            holiday.setEventId(holidayWithSameDate.getEventId());
        }

        return holiday;
    }

    public List<Event> findByDateBetween(LocalDate rangeStart, LocalDate rangeEnd) {
        return eventRepository.findByStartDateBetween(rangeStart, rangeEnd);
    }

    public List<Event> findByStatusAndType(EventStatuses eventStatus, EventTypes eventType) {
        return eventRepository.findByEventStatusAndEventType(new EventStatus(eventStatus.getEventStatusId()), new EventType(eventType.getEventTypeId()));
    }
}

