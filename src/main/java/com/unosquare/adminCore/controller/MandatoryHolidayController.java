package com.unosquare.adminCore.controller;

import com.unosquare.adminCore.entity.MandatoryHoliday;
import com.unosquare.adminCore.service.MandatoryHolidayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/MandatoryHolidays")
public class MandatoryHolidayController {

    @Autowired
    MandatoryHolidayService mandatoryHolidayService;

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<MandatoryHoliday> findAllMandatoryHolidays() {
        return mandatoryHolidayService.findAll();
    }

    @GetMapping(value = "findMandatoryHolidaysByCountryAndYear/{country}/{year}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<MandatoryHoliday> findMandatoryHolidaysByCountryAndYear(@PathVariable("country") String country, @PathVariable("year") int year) {
        return mandatoryHolidayService.findMandatoryHolidaysByCountryAndYear(country, year);
    }

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public void createMandatoryHoliday(@RequestBody MandatoryHoliday mandatoryHoliday) {
        mandatoryHolidayService.save(mandatoryHoliday);
    }

    @PutMapping(value = "/{holidayId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void updateMandatoryHoliday(@RequestBody MandatoryHoliday mandatoryHoliday) {
        mandatoryHolidayService.save(mandatoryHoliday);
    }
}
