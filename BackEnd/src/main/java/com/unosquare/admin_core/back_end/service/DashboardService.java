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
            LocalDate startDate = date.withDayOfMonth(1);
            LocalDate endDate = date.withDayOfMonth(date.lengthOfMonth());
            List<Event> result = dashboardRepository.findCalendarMonthEventsForEmployee(employeeId, startDate, endDate);
            return result.stream().map(event -> modelMapper.map(event, EventDTO.class)).collect(Collectors.toList());
    }
}
