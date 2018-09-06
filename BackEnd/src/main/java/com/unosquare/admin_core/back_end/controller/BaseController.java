package com.unosquare.admin_core.back_end.controller;

import com.unosquare.admin_core.back_end.dto.EventDTO;
import com.unosquare.admin_core.back_end.enums.EventTypes;
import com.unosquare.admin_core.back_end.service.EventService;
import com.unosquare.admin_core.back_end.viewModels.DateViewModel;
import com.unosquare.admin_core.back_end.viewModels.events.CreateEventViewModel;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

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
                }
                else
                {
                    responses.add("Working from home already exists");
                }
                continue;
            }

            if (date.getStartDate().isAfter(date.getEndDate())) {
                responses.add("Starting date cannot be after end date");
            }
        }

        if (responses.isEmpty()) {

            ArrayList<EventDTO> eventDTOS = new ArrayList<>();

            for (DateViewModel date : createEventViewModel.getDates()) {

                EventDTO newEvent = modelMapper.map(date, EventDTO.class);
                modelMapper.map(createEventViewModel, newEvent);
                newEvent.setEventTypeId(eventType.getEventTypeId());
                eventDTOS.add(newEvent);
            }

            eventService.saveEvents(eventDTOS.toArray(new EventDTO[0]));
        }

        return responses;
    }
}
