package com.unosquare.admin_core.back_end.controller;

import com.unosquare.admin_core.back_end.ViewModels.HolidayViewModel;
import com.unosquare.admin_core.back_end.enums.EventTypes;
import com.unosquare.admin_core.back_end.service.EventService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
@RequestMapping("/workingFromHome")
public class WorkingFromHomeController {

    @Autowired
    EventService eventService;

    @Autowired
    ModelMapper modelMapper;

    /*@GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<HolidayViewModel> findAll() {
        List holidays = eventService.findByType(EventTypes.ANNUAL_LEAVE);
        return mapEventDtosToHolidays(holidays);
    }
*/

}
