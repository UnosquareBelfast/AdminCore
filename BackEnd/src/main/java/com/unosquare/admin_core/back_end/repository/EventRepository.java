package com.unosquare.admin_core.back_end.repository;

import com.unosquare.admin_core.back_end.entity.Employee;
import com.unosquare.admin_core.back_end.entity.Event;
import com.unosquare.admin_core.back_end.entity.EventStatus;
import com.unosquare.admin_core.back_end.entity.EventType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.annotation.security.PermitAll;
import java.time.LocalDate;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Integer> {

    List<Event> findByEmployee(Employee employee);

    Event findByEmployeeAndStartDateAndEndDateAndEventType(Employee employee, LocalDate startDate, LocalDate endDate, EventType eventType);

    List<Event> findByStartDateBetweenAndEventType(LocalDate rangeStart, LocalDate rangeEnd, EventType eventType);

    List<Event> findByEventStatusAndEventType(EventStatus eventStatus, EventType eventType);

    List<Event> findByEventType(EventType eventType);

    @Query(value = "SELECT totalHolidays " +
            "FROM Employee " +
            "WHERE employeeId = :employeeId")
    Long getTotalEventsRemainingByEmployee(@Param("employeeId") int employeeId);

    @Query(value = "SELECT COUNT(eventType) " +
            "FROM Event " +
            "WHERE " +
            "employee = :employeeId " +
            "AND " +
            "startDate = :startDate " +
            "AND " +
            "endDate = :endDate ")
    Long getCountOfNumberOfExistingEventsByEmployee(@Param("employeeId") Employee employee,
                                                    @Param("startDate") LocalDate startDate,
                                                    @Param("endDate") LocalDate endDate);
}