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

    @Query(value = "SELECT COUNT(eventType) " +
            "FROM Event " +
            "WHERE " +
            "employee = :employeeId " +
            "AND " +
            "(startDate BETWEEN :startDate AND :endDate) OR " +
            "(endDate BETWEEN :startDate AND :endDate) OR " +
            "(startDate <= :startDate AND endDate >= :endDate)")
    Long getCountOfNumberOfExistingEventsByEmployee(@Param("employeeId") Employee employee,
                                                    @Param("startDate") LocalDate startDate,
                                                    @Param("endDate") LocalDate endDate);

    @Query(value = "SELECT SUM" +
            "(DATE_PART('DAY', totalEvents.endDate::date) - DATE_PART('DAY', totalEvents.startDate::date))" +
                     "FROM " +
                        "(SELECT * " +
                        "FROM Event " +
                        "WHERE " +
                        "employee = :employeeId " +
                        " AND " +
                        "(startDate >= '2018-01-01') AND " +
                        "(endDate <= '2018-12-31') " +
                        ")totalEvents", nativeQuery = true)
    Long getCountOfTotalEventsInYearMadeByEmployee(@Param("employeeId") Employee employee,
                                                    @Param("startDate") LocalDate startDate,
                                                   @Param("endDate") LocalDate endDate);
}