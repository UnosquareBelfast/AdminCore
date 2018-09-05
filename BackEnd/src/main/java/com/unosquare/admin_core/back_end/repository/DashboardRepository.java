package com.unosquare.admin_core.back_end.repository;

import com.unosquare.admin_core.back_end.dto.EmployeeSnapshotDto;
import com.unosquare.admin_core.back_end.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;


public interface DashboardRepository extends JpaRepository<Event, Integer> {
    @Query(value = "SELECT * FROM Event e INNER JOIN Contract c on e.employee_id = c.employee_id " +
            "where " +
            "(" +
            "(e.start_date BETWEEN :startDate AND :endDate) OR " +
            "(e.end_date BETWEEN :startDate AND :endDate) OR " +
            "(e.start_date > :startDate AND e.end_date < :endDate) " +
            ") " +
            "AND " +
            "(" +
            "(c.start_date BETWEEN :startDate AND :today) OR " +
            "(c.end_date BETWEEN :today AND :endDate) OR " +
            "(c.start_date < :startDate AND (:endDate = NULL OR :endDate > :today))" +
            " AND " +
            "c.employee_id = :employeeId " +
            ") ",
            nativeQuery = true
    )
    List<Event> findCalendarMonthEventsForEmployee(@Param("employeeId") int employeeId,
                                                   @Param("startDate") LocalDate startDate,
                                                   @Param("endDate") LocalDate endDate,
                                                   @Param("today") LocalDate today);

    @Query(value = "SELECT * FROM Event e INNER JOIN Contract c on e.employee_id = c.employee_id " +
            "where " +
            "(" +
            "(e.start_date BETWEEN :startDate AND :endDate) OR " +
            "(e.end_date BETWEEN :startDate AND :endDate) OR " +
            "(e.start_date > :startDate AND e.end_date < :endDate) " +
            ") " +
            "AND " +
            "(" +
            "(c.start_date BETWEEN :startDate AND :today) OR " +
            "(c.end_date BETWEEN :today AND :endDate) OR " +
            "(c.start_date < :startDate AND (:endDate = NULL OR :endDate > :today))" +
            ") " +
            "AND c.team_id IN " +
            "(" +
            "select team_id FROM Contract c " +
            "WHERE (c.employee_id = :employeeId AND " +
            "(c.start_date BETWEEN :startDate AND :today) OR " +
            "(c.end_date BETWEEN :today AND :endDate) OR " +
            "(c.start_date < :startDate AND (c.end_date IS NULL OR :endDate > :today)))" +
            ")",
            nativeQuery = true)
    List<Event> findCalendarMonthEventsForTeam(@Param("employeeId") int employeeId,
                                               @Param("startDate") LocalDate startDate,
                                               @Param("endDate") LocalDate endDate,
                                               @Param("today") LocalDate today);

    @Query(value = "SELECT new com.unosquare.admin_core.back_end.dto.EmployeeSnapshotDto(t.teamId ,CONCAT(emp.forename, ' ', emp.surname), et.description, t.teamName) " +
            "FROM Contract c " +
            "INNER JOIN Employee emp on emp.employeeId = c.employee.employeeId " +
            "LEFT JOIN Event ev on c.employee.employeeId = ev.employee.employeeId " +
            "INNER JOIN Team t on c.team.teamId = t.teamId " +
            "LEFT JOIN EventType et on et.eventTypeId = ev.eventType.eventTypeId " +
            "WHERE " +
            "(c.startDate <= :today AND (c.endDate >= :today OR c.endDate = null)) " +
            "AND " +
            "(ev.startDate = :today  AND ev.endDate = :today )" +
            "OR " +
            "NOT EXISTS (SELECT 1 FROM Event evt WHERE ev.employee.employeeId = evt.employee.employeeId) " +
            "OR " +
            "(:today BETWEEN ev.startDate AND ev.endDate) ")

    List<EmployeeSnapshotDto> findDailySnapshotForTeamMobile(@Param("today") LocalDate today);


}