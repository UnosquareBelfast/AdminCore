package com.unosquare.admin_core.back_end.controller;

import com.unosquare.admin_core.back_end.dto.EventDTO;
import com.unosquare.admin_core.back_end.enums.EventTypes;
import com.unosquare.admin_core.back_end.service.EventService;
import com.unosquare.admin_core.back_end.viewModels.DateViewModel;
import com.unosquare.admin_core.back_end.viewModels.events.CreateEventViewModel;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public abstract class BaseController {

    @Autowired
    EventService eventService;

    @Autowired
    ModelMapper modelMapper;

    List<String> createEventByType(CreateEventViewModel createEventViewModel, EventTypes eventType) {
        List<String> responses = new ArrayList<>();
        for (DateViewModel date : createEventViewModel.getDates()) {
            EventDTO existentEvent = eventService.findByEmployeeIdStartDataEndDate(
                    createEventViewModel.getEmployeeId(), date.getStartDate(), date.getEndDate(), eventType);

            if (existentEvent != null) {
                if (eventType.getEventTypeId() == EventTypes.ANNUAL_LEAVE.getEventTypeId()) {
                    responses.add("Holiday already exists");
                } else {
                    responses.add("Working from home already exists");
                }
                continue;
            }

            if (date.getStartDate().isAfter(date.getEndDate())) {
                responses.add("Starting date cannot be after end date");
            }
        }

        if (responses.isEmpty()) {

            List<EventDTO> eventDTOS = new ArrayList<>();

            for (DateViewModel date : createEventViewModel.getDates()) {

                EventDTO newEvent = modelMapper.map(date, EventDTO.class);
                modelMapper.map(createEventViewModel, newEvent);
                newEvent.setEventTypeId(eventType.getEventTypeId());
                if (eventType.getEventTypeId() == EventTypes.ANNUAL_LEAVE.getEventTypeId()) {
                    UUID groupId = UUID.randomUUID();
                    newEvent.setGroupId(groupId);
                    splitEventIfFallsOnAWeekend(newEvent, newEvent.getEndDate(), eventDTOS);
                } else {
                    eventDTOS.add(newEvent);
                }
            }
            eventService.saveEvents(eventDTOS.toArray(new EventDTO[0]));
        }

        return responses;
    }

    private void splitEventIfFallsOnAWeekend(EventDTO event, LocalDate originalEndDate, List<EventDTO> eventDTOS) {
        List<LocalDate> dateRange = getDatesRange(event.getStartDate(), event.getEndDate());
        for (LocalDate eventDate : dateRange) {
            if (eventDate.getDayOfWeek() == DayOfWeek.SATURDAY) {
                // Set end date
                event.setEndDate(eventDate.minusDays(1));
                eventDTOS.add(event);
                // Create new event
                EventDTO nextEvent = mapEventDto(event, originalEndDate, eventDate);
                // Check again
                splitEventIfFallsOnAWeekend(nextEvent, nextEvent.getEndDate(), eventDTOS);
                break;
            }
        }

        if (event.getEndDate() == originalEndDate){
            eventDTOS.add(event);
        }
    }

    private EventDTO mapEventDto(EventDTO priorEvent, LocalDate originalEndDate, LocalDate eventDate) {
        EventDTO nextEvent = new EventDTO();
        nextEvent.setDateCreated(LocalDate.now());
        nextEvent.setEmployee(priorEvent.getEmployee());
        nextEvent.setGroupId(priorEvent.getGroupId());
        nextEvent.setStartDate(eventDate.plusDays(2));
        nextEvent.setEndDate(originalEndDate);
        nextEvent.setEventStatusId(priorEvent.getEventStatusId());
        nextEvent.setLastModified(LocalDate.now());
        nextEvent.setEventTypeId(priorEvent.getEventTypeId());
        nextEvent.setTeam(priorEvent.getTeam());
        return nextEvent;
    }

    private static List<LocalDate> getDatesRange(LocalDate startDate, LocalDate endDate) {
        int numOfDays = (int) ChronoUnit.DAYS.between(startDate, endDate);
        return IntStream.range(0, numOfDays)
                .mapToObj(startDate::plusDays)
                .collect(Collectors.toList());
    }
}
