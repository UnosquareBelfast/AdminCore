package com.unosquare.admin_core.back_end.service;

import com.unosquare.admin_core.back_end.dto.EventDTO;
import com.unosquare.admin_core.back_end.entity.Event;
import com.unosquare.admin_core.back_end.repository.DashboardRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
@RequestMapping("/dashboard")
public class DashboardService {

    @Autowired
    public DashboardRepository dashboardRepository;

    @Autowired
    ModelMapper modelMapper;

    public List<EventDTO> getEmployeeDashboardEvents(int employeeId, LocalDate date){
            LocalDate startDate = getMonthStartDate(date);
            LocalDate endDate = getMonthEndDate(date);
        LocalDate today = LocalDate.now();
        List<Event> result = dashboardRepository.findCalendarMonthEventsForEmployee(employeeId, startDate, endDate, today);
            return result.stream().map(event -> modelMapper.map(event, EventDTO.class)).collect(Collectors.toList());
    }

    public List<EventDTO> getTeamDashboardEvents(int employeeId, LocalDate date){
        LocalDate startDate = getMonthStartDate(date);
        LocalDate endDate = getMonthEndDate(date);
        LocalDate today = LocalDate.now();
        List<Event> result = dashboardRepository.findCalendarMonthEventsForTeam(employeeId, startDate, endDate, today);

        return result.stream().map(event -> modelMapper.map(event, EventDTO.class)).collect(Collectors.toList());
    }

    public List<EventDTO> getTeamSnapshotDashboardEvents(int employeeId, LocalDate date){
        LocalDate startDate = getMonthStartDate(date);
        LocalDate endDate = getMonthEndDate(date);
        LocalDate today = LocalDate.now();
        List<Event> result = dashboardRepository.findDailySnapshotForTeamMobile(employeeId, startDate, endDate, today);

        return result.stream().map(event -> modelMapper.map(event, EventDTO.class)).collect(Collectors.toList());
    }

    private LocalDate getMonthStartDate(LocalDate date){
        return date.withDayOfMonth(1);
    }

    private LocalDate getMonthEndDate(LocalDate date){
        return date.withDayOfMonth(date.lengthOfMonth());
    }
}
