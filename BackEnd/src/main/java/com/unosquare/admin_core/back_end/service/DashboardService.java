package com.unosquare.admin_core.back_end.service;

import com.unosquare.admin_core.back_end.dto.EventDTO;
import com.unosquare.admin_core.back_end.dto.EmployeeSnapshotDto;
import com.unosquare.admin_core.back_end.dto.EventMessageDTO;
import com.unosquare.admin_core.back_end.entity.Event;
import com.unosquare.admin_core.back_end.entity.EventMessage;
import com.unosquare.admin_core.back_end.repository.DashboardRepository;
import com.unosquare.admin_core.back_end.repository.EventMessageRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
@RequestMapping("/dashboard")
public class DashboardService {

    @Autowired
    public DashboardRepository dashboardRepository;

    @Autowired
    EventMessageRepository eventMessageRepository;

    @Autowired
    ModelMapper modelMapper;

    public List<EventDTO> getEmployeeDashboardEvents(int employeeId, LocalDate date) {
        LocalDate startDate = getMonthStartDate(date);
        LocalDate endDate = getMonthEndDate(date);
        List<Event> result = dashboardRepository.findCalendarMonthEventsForEmployee(employeeId, startDate, endDate);
        List<EventDTO> eventDTOS = result.stream().map(event -> modelMapper.map(event, EventDTO.class)).collect(Collectors.toList());
        for (EventDTO event : eventDTOS){
            EventMessage message = eventMessageRepository.findLatestEventMessagesByEventId(event.getEventId());
            if (message != null) {
                event.setLatestMessage(modelMapper.map(message, EventMessageDTO.class));
            }
        }
        return eventDTOS;
    }

    public List<EventDTO> getTeamDashboardEvents(int employeeId, LocalDate date){
        LocalDate startDate = getMonthStartDate(date);
        LocalDate endDate = getMonthEndDate(date);
        LocalDate today = LocalDate.now();
        List<Event> result = dashboardRepository.findCalendarMonthEventsForTeam(employeeId, startDate, endDate, today);
        return result.stream().map(event -> modelMapper.map(event, EventDTO.class)).collect(Collectors.toList());
    }

    public Map<String, List<EmployeeSnapshotDto>> getTeamSnapshotDashboardEvents(){
        LocalDate today = LocalDate.now();
        List<EmployeeSnapshotDto> result = dashboardRepository.findDailySnapshotForTeamMobile(today);
        return result.stream().collect(Collectors.groupingBy(EmployeeSnapshotDto::getTeamName, Collectors.toList()));
    }

    public Map<String, List<EmployeeSnapshotDto>> getEmployeeTeamSnapshot(int employeeId){
        LocalDate today = LocalDate.now();
        List<EmployeeSnapshotDto> result = dashboardRepository.findEmployeeTeamsDailySnapshot(today, employeeId);
        return result.stream().collect(Collectors.groupingBy(EmployeeSnapshotDto::getTeamName, Collectors.toList()));
    }

    public List<EventMessageDTO> getEventMessagesByEventId(int eventId){
        List<EventMessage> messages = eventMessageRepository.findEventMessagesByEventId(eventId);
        return messages.stream().map(message -> modelMapper.map(message, EventMessageDTO.class)).collect(Collectors.toList());
    }

    private LocalDate getMonthStartDate(LocalDate date){
        return date.withDayOfMonth(1);
    }

    private LocalDate getMonthEndDate(LocalDate date){
        return date.withDayOfMonth(date.lengthOfMonth());
    }
}
