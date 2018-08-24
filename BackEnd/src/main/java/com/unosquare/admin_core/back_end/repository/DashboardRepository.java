package com.unosquare.admin_core.back_end.repository;

import com.unosquare.admin_core.back_end.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;


public interface DashboardRepository extends JpaRepository<Event, Integer> {
        @Query(
        value = "SELECT * FROM Event e WHERE (e.start_Date >= :startDate AND e.end_Date <= :endDate) AND e.employee_id = :employeeId",
        nativeQuery=true
        )
    List<Event> findCalendarMonthEventsForEmployee(@Param("employeeId") int employeeId,
                                                   @Param("startDate") LocalDate startDate,
                                                   @Param("endDate") LocalDate endDate );
}
