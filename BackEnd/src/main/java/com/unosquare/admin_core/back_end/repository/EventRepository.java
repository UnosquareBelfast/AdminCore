package com.unosquare.admin_core.back_end.repository;

import com.unosquare.admin_core.back_end.entity.Employee;
import com.unosquare.admin_core.back_end.entity.Event;
import com.unosquare.admin_core.back_end.entity.EventStatus;
import com.unosquare.admin_core.back_end.entity.EventType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Integer> {

    List<Event> findByEmployee(Employee employee);

    Event findByEmployeeAndStartDateAndEndDate(Employee employee, LocalDate startDate, LocalDate endDate);

    Event findByStartDateAndEmployee(LocalDate startDate, Employee employee);

    List<Event> findByStartDateBetween(LocalDate rangeStart, LocalDate rangeEnd);

    List<Event> findByEventStatus(EventStatus holidayStatus);

    List<Event> findByEventType(EventType eventType);
}