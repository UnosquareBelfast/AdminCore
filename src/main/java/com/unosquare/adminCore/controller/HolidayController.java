package com.unosquare.adminCore.controller;

import com.unosquare.adminCore.entity.Holiday;
import com.unosquare.adminCore.enums.HolidayStatus;
import com.unosquare.adminCore.service.HolidayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Arrays;
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
    public void createHoliday(@RequestBody Holiday holiday) {
        holidayService.save(holiday);
    }

    @PostMapping(value = "/createMultiple", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public void createMultipleHolidays(@RequestBody Holiday [] holidays) {
        holidayService.saveMultiple(Arrays.asList(holidays));
    }

    @PutMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void updateHoliday(@RequestBody Holiday holiday) {
        holidayService.save(holiday);
    }

    @PutMapping(value = "/updateMultiple", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public void updateMultipleHolidays(@RequestBody List<Holiday> holidays) {
        holidayService.saveMultiple(holidays);
    }


    @GetMapping(value = "/findByDateAfter/{date}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<Holiday> findByDateAfter(@PathVariable("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)  LocalDate date) {
        return holidayService.findByDateAfter(date);
    }

    @GetMapping(value = "/findByDateBeforeOrSameDay/{date}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<Holiday> findByDateBeforeOrSameDay(@PathVariable("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)  LocalDate date) {
        return holidayService.findByDateBefore(date.plusDays(1));
    }

    @GetMapping(value = "/findByDateBetween/{rangeStart}/{rangeEnd}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<Holiday> findByDateBetween(@PathVariable("rangeStart") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)  LocalDate rangeStart,
                                                @PathVariable("rangeEnd") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)  LocalDate rangeEnd) {
        return holidayService.findByDateBetween(rangeStart, rangeEnd);
    }

    @GetMapping(value = "/findByHolidayStatus/{holidayStatus}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<Holiday> findByClientStatus(@PathVariable("holidayStatus") HolidayStatus holidayStatus) {
        return holidayService.findByStatus(holidayStatus);
    }

    @GetMapping(value = "/findByHolidayStatusAndDateAfter/{holidayStatus}/{date}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<Holiday> findByStatusAndDateAfter(@PathVariable("holidayStatus") HolidayStatus holidayStatus, @PathVariable("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)  LocalDate date) {
        return holidayService.findByStatusAndDateAfter(holidayStatus, date);
    }
}
