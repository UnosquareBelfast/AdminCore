package com.unosquare.admin_core.back_end.service;

import com.google.common.base.Preconditions;
import com.unosquare.admin_core.back_end.entity.Employee;
import com.unosquare.admin_core.back_end.entity.Event;
import com.unosquare.admin_core.back_end.enums.EventType;
import com.unosquare.admin_core.back_end.enums.HolidayStatus;
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

    public List<Event> findAll() {
        return eventRepository.findAll();
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
        event.setHolidayStatus(entityManager.find(com.unosquare.admin_core.back_end.entity.HolidayStatus.class, HolidayStatus.AWAITING_APPROVAL.getHolidayStatusId()));
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

    public List<Event> findByStatus(HolidayStatus holidayStatus) {
        return eventRepository.findByHolidayStatus(new com.unosquare.admin_core.back_end.entity.HolidayStatus(holidayStatus.getHolidayStatusId()));
    }

    public List<Event> findByType(EventType eventType){
        return  eventRepository.findByEventType(new com.unosquare.admin_core.back_end.entity.EventType(eventType.getEventTypeId()));
    }
}

