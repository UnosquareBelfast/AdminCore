package com.unosquare.admin_core.back_end.repository;

import com.unosquare.admin_core.back_end.dto.EmployeeSnapshotDto;
import com.unosquare.admin_core.back_end.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;


public interface DashboardRepository extends JpaRepository<Event, Integer> {
    @Query(value = "SELECT e FROM Event e " +
            "WHERE " +
            "((e.startDate BETWEEN :startDate AND :endDate) OR " +
            "(e.endDate BETWEEN :startDate AND :endDate) OR " +
            "(e.startDate > :startDate AND e.endDate < :endDate)) " +
            "AND " +
            "e.employee.employeeId = :employeeId"
    )
    List<Event> findCalendarMonthEventsForEmployee(@Param("employeeId") int employeeId,
                                                   @Param("startDate") LocalDate startDate,
                                                   @Param("endDate") LocalDate endDate);

    @Query(value = "SELECT e FROM Event e " +
            "INNER JOIN Contract c on e.employee.employeeId = c.employee.employeeId " +
            "WHERE " +
            "((e.startDate BETWEEN :startDate AND :endDate) OR " +
            "(e.endDate BETWEEN :startDate AND :endDate) OR " +
            "(e.startDate > :startDate AND e.endDate < :endDate)) " +
            "AND " +
            "((c.startDate BETWEEN :startDate AND :today) OR " +
            "(c.endDate BETWEEN :today AND :endDate) OR " +
            "(c.startDate < :startDate AND (c.endDate IS NULL OR :endDate > :today))) " +
            "AND c.team.teamId IN " +
            "(" +
            "SELECT c.team.teamId FROM Contract c " +
            "WHERE (c.employee.employeeId = :employeeId) AND " +
            "((c.startDate BETWEEN :startDate AND :today) OR " +
            "(c.endDate BETWEEN :today AND :endDate) OR " +
            "(c.startDate < :startDate AND (c.endDate IS NULL OR :endDate > :today)))" +
            ")"
    )
    List<Event> findCalendarMonthEventsForTeam(@Param("employeeId") int employeeId,
                                               @Param("startDate") LocalDate startDate,
                                               @Param("endDate") LocalDate endDate,
                                               @Param("today") LocalDate today);

    @Query(value = "SELECT new com.unosquare.admin_core.back_end.dto.EmployeeSnapshotDto(" +
            "t.teamId ," +
            "CONCAT(emp.forename, ' ', " + "emp.surname), " +
            "et.description, " +
            "t.teamName, " +
            "emp.employeeId, " +
            "emp.email, " +
            "cl.clientName" +
            ") " +
            "FROM Contract c " +
            "INNER JOIN Employee emp on emp.employeeId = c.employee.employeeId " +
            "LEFT JOIN Event ev on c.employee.employeeId = ev.employee.employeeId " +
            "INNER JOIN Team t on c.team.teamId = t.teamId " +
            "LEFT JOIN EventType et on et.eventTypeId = ev.eventType.eventTypeId " +
            "INNER JOIN Client cl on cl.clientId = t.client.clientId " +
            "WHERE " +
            "(c.startDate <= :today AND (c.endDate >= :today OR c.endDate is NULL)) " +
            "AND " +
            "(ev is NULL OR :today BETWEEN ev.startDate AND ev.endDate)"
    )

    List<EmployeeSnapshotDto> findDailySnapshotForTeamMobile(@Param("today") LocalDate today);


    @Query(value = "SELECT new com.unosquare.admin_core.back_end.dto.EmployeeSnapshotDto(" +
            "t.teamId ," +
            "CONCAT(emp.forename, ' ', " + "emp.surname), " +
            "et.description, " +
            "t.teamName, " +
            "emp.employeeId, " +
            "emp.email, " +
            "cl.clientName" +
            ") " +
            "FROM Contract c " +
            "INNER JOIN Employee emp on emp.employeeId = c.employee.employeeId " +
            "LEFT JOIN Event ev on c.employee.employeeId = ev.employee.employeeId " +
            "INNER JOIN Team t on c.team.teamId = t.teamId " +
            "LEFT JOIN EventType et on et.eventTypeId = ev.eventType.eventTypeId " +
            "INNER JOIN Client cl on cl.clientId = t.client.clientId " +
            "WHERE " +
            "(ev is NULL OR :today BETWEEN ev.startDate AND ev.endDate)" +
            "AND c.team.teamId IN " +
            "(" +
            "SELECT c.team.teamId FROM Contract c " +
            "WHERE (c.employee.employeeId = :employeeId)) AND " +
            "(c.startDate <= :today AND (c.endDate >= :today OR c.endDate IS NULL))")

    List<EmployeeSnapshotDto> findEmployeeTeamsDailySnapshot(@Param("today") LocalDate today,
                                                             @Param("employeeId") int employeeId);
}