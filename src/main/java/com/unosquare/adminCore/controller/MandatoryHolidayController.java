package com.unosquare.adminCore.controller;

import com.unosquare.adminCore.entity.Employee;
import com.unosquare.adminCore.entity.MandatoryHoliday;
import com.unosquare.adminCore.service.MandatoryHolidayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/mandatoryHolidays")
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

    @GetMapping(value = "/{mandatoryHolidayId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public MandatoryHoliday findEmployeeById(@PathVariable("mandatoryHolidayId") int id) {
        return mandatoryHolidayService.findById(id);
    }

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public void createMandatoryHoliday(@RequestBody MandatoryHoliday mandatoryHoliday) {
        mandatoryHolidayService.save(mandatoryHoliday);
    }

    @PutMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void updateMandatoryHoliday(@RequestBody MandatoryHoliday mandatoryHoliday) {
        mandatoryHolidayService.save(mandatoryHoliday);
    }

    @GetMapping(value = "findByCountryAndDateBetween/{country}/{rangeStart}/{rangeEnd}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<MandatoryHoliday> findByCountryAndDateBetween(@PathVariable("country") String country,
                                                              @PathVariable("rangeStart") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate rangeStart,
                                                              @PathVariable("rangeEnd") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)  LocalDate rangeEnd) {
        return mandatoryHolidayService.findByCountryAndDateBetween(country, rangeStart, rangeEnd);
    }

    @GetMapping(value = "findByDateBetween/{rangeStart}/{rangeEnd}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<MandatoryHoliday> findByDateBetween(@PathVariable("rangeStart") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)  LocalDate rangeStart,
                                                    @PathVariable("rangeEnd") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)  LocalDate rangeEnd) {
        return mandatoryHolidayService.findByDateBetween(rangeStart, rangeEnd);
    }
}
