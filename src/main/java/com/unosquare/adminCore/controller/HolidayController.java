package com.unosquare.adminCore.controller;

import com.unosquare.adminCore.entity.Holiday;
import com.unosquare.adminCore.service.HolidayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/holidays")
public class HolidayController {

    @Autowired
    HolidayService holidayService;

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<Holiday> findAllHolidays() {
        return holidayService.findAll();
    }

    @GetMapping(value = "/{holidayId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Holiday findHolidayById(@PathVariable("holidayId") int id) {
        return holidayService.findById(id);
    }

    @GetMapping(value = "findByEmployeeId/{employeeId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<Holiday> findHolidayByEmployeeId(@PathVariable("employeeId") int employeeId) {
        return holidayService.findByEmployee(employeeId);
    }

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public void createHoliday(@RequestBody Holiday holiday) {
        holidayService.save(holiday);
    }

    @PutMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void updateHoliday(@RequestBody Holiday holiday) {
        holidayService.save(holiday);
    }

    @GetMapping(value = "/findByStartDateAfter/{date}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<Holiday> findByStartDateAfter(@PathVariable("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)  LocalDate date) {
        return holidayService.findByStartDateAfter(date);
    }

    @GetMapping(value = "/findByEndDateBeforeOrSameDay/{date}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<Holiday> findByEndDateBeforeOrSameDay(@PathVariable("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)  LocalDate date) {
        return holidayService.findByEndDateBefore(date.plusDays(1));
    }

    @GetMapping(value = "/findByStartDateBetween/{rangeStart}/{rangeEnd}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<Holiday> findByStartDateBetween(@PathVariable("rangeStart") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)  LocalDate rangeStart,
                                                @PathVariable("rangeEnd") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)  LocalDate rangeEnd) {
        return holidayService.findByStartDateBetween(rangeStart, rangeEnd);
    }

    @GetMapping(value = "/findByStatus/{status}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<Holiday> findByStatus(@PathVariable("status") String status) {
        return holidayService.findByStatus(status);
    }

    @GetMapping(value = "/findByStatusAndStartDateAfter/{status}/{date}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<Holiday> findByStatusAndStartDateAfter(@PathVariable("status") String status, @PathVariable("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)  LocalDate date) {
        return holidayService.findByStatusAndStartDateAfter(status, date);
    }
}
