package com.unosquare.admin_core.back_end.repository;

import com.unosquare.admin_core.back_end.entity.Employee;
import com.unosquare.admin_core.back_end.entity.Event;
import com.unosquare.admin_core.back_end.entity.EventStatus;
import com.unosquare.admin_core.back_end.entity.EventType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Integer> {

    List<Event> findByEmployee(Employee employee);

    Event findByEmployeeAndStartDateAndEndDateAndEventType(Employee employee, LocalDate startDate, LocalDate endDate, EventType eventType);

    List<Event> findByStartDateBetweenAndEventType(LocalDate rangeStart, LocalDate rangeEnd, EventType eventType);

    List<Event> findByEventStatusAndEventType(EventStatus eventStatus, EventType eventType);

    List<Event> findByEventType(EventType eventType);

    // Sub query to pull back all events in a calender year by employee
    // Sum to add up all events within a calender year to be subtracted from totalHoliday count
    @Query(value = "SELECT SUM (" +
            "CASE " +
            "WHEN(events.is_half_day is true) " +
            "THEN 0.5 " +
            "ELSE " +
            "DATE_PART('DAY', (cast(events.end_date as timestamp) + time '24:00')) - DATE_PART('DAY', (cast(events.start_date as timestamp))) " +
            "END" +
            ") " +
            "FROM " +
            "(SELECT  start_date, end_date, is_half_day " +
            "FROM Event  " +
            "WHERE " +
            "employee_id = :employeeId " +
            "AND " +
            "(start_date >= :startOfYearDate) AND (end_date <= :endOfYearDate))events"
            , nativeQuery = true)
    double getCountOfTotalEventsInYearMadeByEmployee(@Param("employeeId") int employeeId,
                                                     @Param("startOfYearDate") LocalDate startOfYearDate,
                                                     @Param("endOfYearDate") LocalDate endOfYearDate);
}