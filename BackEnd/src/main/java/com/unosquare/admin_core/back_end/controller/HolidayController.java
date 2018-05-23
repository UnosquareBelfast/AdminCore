package com.unosquare.admin_core.back_end.controller;

import com.unosquare.admin_core.back_end.dto.HolidayDto;
import com.unosquare.admin_core.back_end.entity.Holiday;
import com.unosquare.admin_core.back_end.enums.HolidayStatus;
import com.unosquare.admin_core.back_end.service.HolidayService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
@RequestMapping("/holidays")
public class HolidayController {

    @Autowired
    HolidayService holidayService;

    @Autowired
    ModelMapper modelMapper;

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<HolidayDto> findAllHolidays() {
        return mapHolidaysToDtos(holidayService.findAll());
    }

    @RequestMapping(method = RequestMethod.OPTIONS, value = "/*")
    @ResponseBody
    public ResponseEntity handleOptions() {
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping(value = "/{holidayId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public HolidayDto findHolidayById(@PathVariable("holidayId") int id) {
        return modelMapper.map(holidayService.findById(id), HolidayDto.class);
    }

    @GetMapping(value = "findByEmployeeId/{employeeId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<HolidayDto> findHolidayByEmployeeId(@PathVariable("employeeId") int employeeId) {
        return mapHolidaysToDtos(holidayService.findByEmployee(employeeId));
    }

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void createHoliday(@RequestBody HolidayDto holiday) {
        holidayService.save(modelMapper.map(holiday, Holiday.class));
    }

    @CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
    @PostMapping(value = "/createMultiple", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public void createMultipleHolidays(@RequestBody HolidayDto[] holidays) {
        holidayService.saveMultiple(mapDtosToHolidays(Arrays.asList(holidays)));
    }

    @PutMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void updateHoliday(@RequestBody HolidayDto holiday) {
        holidayService.save(modelMapper.map(holiday, Holiday.class));
    }

    @PutMapping(value = "/updateMultiple", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public void updateMultipleHolidays(@RequestBody HolidayDto[] holidays) {
        holidayService.saveMultiple(mapDtosToHolidays(Arrays.asList(holidays)));
    }

    @GetMapping(value = "/findByDateAfter/{date}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<HolidayDto> findByDateAfter(@PathVariable("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return mapHolidaysToDtos(holidayService.findByDateAfter(date));
    }

    @GetMapping(value = "/findByDateBeforeOrSameDay/{date}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<HolidayDto> findByDateBeforeOrSameDay(@PathVariable("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return mapHolidaysToDtos(holidayService.findByDateBefore(date.plusDays(1)));
    }

    @CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
    @GetMapping(value = "/findByDateBetween/{rangeStart}/{rangeEnd}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<HolidayDto> findByDateBetween(@PathVariable("rangeStart") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate rangeStart,
                                              @PathVariable("rangeEnd") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate rangeEnd) {
        return mapHolidaysToDtos(holidayService.findByDateBetween(rangeStart, rangeEnd));
    }

    @CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
    @GetMapping(value = "/findByHolidayStatus/{holidayStatusId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<HolidayDto> findByClientStatus(@PathVariable("holidayStatusId") short holidayStatusId) {
        return mapHolidaysToDtos(holidayService.findByStatus(HolidayStatus.fromId(holidayStatusId)));
    }

    @CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
    @GetMapping(value = "/findByHolidayStatusAndDateAfter/{holidayStatusId}/{date}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<HolidayDto> findByStatusAndDateAfter(@PathVariable("holidayStatusId") short holidayStatusId, @PathVariable("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return mapHolidaysToDtos(holidayService.findByStatusAndDateAfter(HolidayStatus.fromId(holidayStatusId), date));
    }

    private List<HolidayDto> mapHolidaysToDtos(List<Holiday> holidays) {
        return holidays.stream().map(holiday -> modelMapper.map(holiday, HolidayDto.class)).collect(Collectors.toList());
    }

    private List<Holiday> mapDtosToHolidays(List<HolidayDto> holidays) {
        return holidays.stream().map(holiday -> modelMapper.map(holiday, Holiday.class)).collect(Collectors.toList());
    }
}
