package com.unosquare.admin_core.back_end.service;

import com.unosquare.admin_core.back_end.dto.EventDTO;
import org.junit.Test;
import org.modelmapper.ModelMapper;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

public class EventServiceTest {
    public static final LocalDate START_DATE = LocalDate.of(2019, 9, 19);
    public static final LocalDate END_DATE = LocalDate.of(2019, 10, 10);
    EventService eventService = new EventService();

    @Test
    public void testIsWeekendSplitWorking(){
        eventService.modelMapper = new ModelMapper();
        EventDTO event = new EventDTO();
        event.setStartDate(START_DATE);
        event.setEndDate(END_DATE);
        LocalDate originalEndDate = END_DATE;
        List<EventDTO> eventServiceList = eventService.splitEventIfFallsOnAWeekend(event,originalEndDate, new ArrayList<EventDTO>());
        assertTrue(eventServiceList.get(0).getEndDate().getDayOfWeek()== DayOfWeek.FRIDAY
                && eventServiceList.get(1).getStartDate().getDayOfWeek()== DayOfWeek.MONDAY
                && eventServiceList.get(1).getEndDate().getDayOfWeek()== DayOfWeek.FRIDAY
                && eventServiceList.get(2).getStartDate().getDayOfWeek()== DayOfWeek.MONDAY
                && eventServiceList.get(2).getEndDate().getDayOfWeek()== DayOfWeek.FRIDAY
                && eventServiceList.get(3).getStartDate().getDayOfWeek()== DayOfWeek.MONDAY
                && eventServiceList.get(3).getEndDate().getDayOfWeek()== DayOfWeek.THURSDAY);
    }

}