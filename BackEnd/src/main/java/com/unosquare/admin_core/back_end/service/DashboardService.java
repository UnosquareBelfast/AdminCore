package com.unosquare.admin_core.back_end.service;

import com.unosquare.admin_core.back_end.dto.DashboardEventDTO;
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
import java.util.*;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.groupingBy;

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

    public List<DashboardEventDTO> getEmployeeDashboardEvents(final int employeeId, final LocalDate date) {
        final LocalDate startDate = getMonthStartDate(date);
        final LocalDate endDate = getMonthEndDate(date);
        final List<Event> result = dashboardRepository.findCalendarMonthEventsForEmployee(employeeId, startDate, endDate);
        final List<EventDTO> eventDTOS = result.stream().map(event -> modelMapper.map(event, EventDTO.class)).collect(Collectors.toList());
        final Map<UUID, List<EventDTO>> resultsByUUID = eventDTOS.stream().collect(groupingBy(EventDTO::getGroupId));
        List<DashboardEventDTO> eventList = new ArrayList<>();
        mapEventsByGroupId(resultsByUUID, eventList, true);
        return eventList;
    }

    public List<DashboardEventDTO> getTeamDashboardEvents(int employeeId, LocalDate date){
        final LocalDate startDate = getMonthStartDate(date);
        final LocalDate endDate = getMonthEndDate(date);
        final LocalDate today = LocalDate.now();
        final List<Event> result = dashboardRepository.findCalendarMonthEventsForTeam(employeeId, startDate, endDate, today);
        final List<EventDTO> eventDTOS = result.stream().map(event -> modelMapper.map(event, EventDTO.class)).collect(Collectors.toList());
        final Map<UUID, List<EventDTO>> resultsByUUID = eventDTOS.stream().collect(groupingBy(EventDTO::getGroupId));
        List<DashboardEventDTO> eventList = new ArrayList<>();
        mapEventsByGroupId(resultsByUUID, eventList, false);
        return eventList;
    }

    public Map<String, List<EmployeeSnapshotDto>> getTeamSnapshotDashboardEvents(){
        LocalDate today = LocalDate.now();
        List<EmployeeSnapshotDto> result = dashboardRepository.findDailySnapshotForTeamMobile(today);
        return result.stream().collect(groupingBy(EmployeeSnapshotDto::getTeamName, Collectors.toList()));
    }

    public Map<String, List<EmployeeSnapshotDto>> getEmployeeTeamSnapshot(int employeeId){
        LocalDate today = LocalDate.now();
        List<EmployeeSnapshotDto> result = dashboardRepository.findEmployeeTeamsDailySnapshot(today, employeeId);
        return result.stream().collect(groupingBy(EmployeeSnapshotDto::getTeamName, Collectors.toList()));
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


    private void mapEventsByGroupId(Map<UUID, List<EventDTO>> resultsByUUID, List<DashboardEventDTO> eventList, boolean mapMessages) {
        for (Map.Entry<UUID, List<EventDTO>> eventDto : resultsByUUID.entrySet()) {
            DashboardEventDTO dashboardEventDTO = new DashboardEventDTO();
            dashboardEventDTO.setGroupId(eventDto.getKey());
            EventDTO first = eventDto.getValue().stream().findFirst().get();
            EventDTO last = eventDto.getValue().stream().skip(eventDto.getValue().size() - 1).findFirst().get();
            dashboardEventDTO.setEventStartDate(first.getStartDate());
            dashboardEventDTO.setEventEndDate(last.getEndDate());
            List<EventDTO> events = new ArrayList<>();
            for (EventDTO event : eventDto.getValue()) {
                if (mapMessages) {
                    EventMessage message = eventMessageRepository.findLatestEventMessagesByEventId(event.getEventId());
                    if (message != null) {
                        event.setLatestMessage(modelMapper.map(message, EventMessageDTO.class));
                    }
                }
                events.add(event);
            }
            dashboardEventDTO.setEvents(events);
            eventList.add(dashboardEventDTO);
        }
    }
}
