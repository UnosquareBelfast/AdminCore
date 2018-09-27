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

    Event findByEmployeeAndStartDateAndEndDateAndEventType(Employee employee, LocalDate startDate, LocalDate endDate,
                                                           EventType eventType);

    List<Event> findByStartDateBetweenAndEventType(LocalDate rangeStart, LocalDate rangeEnd, EventType eventType);

    List<Event> findByEventStatusAndEventType(EventStatus eventStatus, EventType eventType);

    List<Event> findByEventType(EventType eventType);

    @Query(value = "SELECT COUNT(e.eventType) " +
            "FROM Event e " +
            "WHERE " +
            "e.employee.employeeId = :employeeId " +
            "AND " +
            "(e.startDate BETWEEN :startDate AND :endDate) OR " +
            "(e.endDate BETWEEN :startDate AND :endDate) OR " +
            "(e.startDate <= :startDate AND e.endDate >= :endDate) ")
    Integer getCountOfNumberOfExistingEventsByEmployee(@Param("employeeId") Employee employee,
                                                    @Param("startDate") LocalDate startDate,
                                                    @Param("endDate") LocalDate endDate);

//    Sub query to pull back all events in a calender year by employee
//    Sum to add up all events within a calender year to be subtracted from totalHoliday count
//    @Query(value =
//            "SELECT SUM (DATE_PART('DAY', totalEvents.end_date::date) - DATE_PART('DAY', totalEvents.start_date::date))" +
//                    "FROM " +
//                    "(SELECT * " +
//                    "FROM Event " +
//                    "WHERE " +
//                    "employee_id = :employeeId " +
//                    " AND " +
//                    "(start_date >= '2018-01-01') AND " +
//                    "(end_date <= '2018-12-31') " +
//                    ")totalEvents", nativeQuery = true)
//    Long getCountOfTotalEventsInYearMadeByEmployee(@Param("employeeId") Employee employee);

    @Query(value = "SELECT e.employee.employeeId " +
            "FROM Event e " +
            "WHERE e.eventId = :eventId")
    Integer getEmployeeIdByEventId(@Param("eventId") int eventId);
}