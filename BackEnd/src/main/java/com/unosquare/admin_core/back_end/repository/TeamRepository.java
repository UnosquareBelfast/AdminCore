package com.unosquare.admin_core.back_end.repository;

import com.unosquare.admin_core.back_end.entity.Client;
import com.unosquare.admin_core.back_end.entity.Employee;
import com.unosquare.admin_core.back_end.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface TeamRepository extends JpaRepository<Team, Integer> {

    List<Team> findByClient(Client client);

    @Query(value = "SELECT t.teamId " +
            "FROM Team t " +
            "JOIN Contract c ON t.teamId = c.team.teamId " +
            "JOIN Employee e ON c.employee.employeeId = e.employeeId " +
            "WHERE e.employeeId = :employeeId ")
    Integer findTeamIdByEmployeeId(@Param("employeeId") Employee employee);

    @Query(value = "SELECT COUNT(h.eventType) " +
            "FROM Team t " +
            "JOIN Contract c on t.teamId = c.team.teamId " +
            "JOIN Employee e on c.employee.employeeId = e.employeeId " +
            "JOIN Event h on e.employeeId = h.employee.employeeId " +
            "WHERE " +
            "t.teamId = :teamId AND " +
            "(h.startDate BETWEEN :startDate AND :endDate) OR " +
            "(h.endDate BETWEEN :startDate AND :endDate) OR " +
            "(h.startDate <= :startDate AND h.endDate >= :endDate) ")
    Integer getAllEventsForTeamBySelectedDatesSubmittedByEmployee(@Param("teamId") int teamId,
                                                               @Param("startDate") LocalDate startDate,
                                                               @Param("endDate") LocalDate endDate);
}