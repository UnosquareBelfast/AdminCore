package com.unosquare.admin_core.back_end.controller;

import com.unosquare.admin_core.back_end.dto.CreateHolidayDto;
import com.unosquare.admin_core.back_end.dto.DateDTO;
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
import java.util.ArrayList;
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
    public HolidayDto findHolidayById(@PathVariable("holidayId") int holidayId) {
        return modelMapper.map(holidayService.findById(holidayId), HolidayDto.class);
    }

    @GetMapping(value = "findByEmployeeId/{employeeId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<HolidayDto> findHolidayByEmployeeId(@PathVariable("employeeId") int employeeId) {
        return mapHolidaysToDtos(holidayService.findByEmployee(employeeId));
    }

    @CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity createHoliday(@RequestBody CreateHolidayDto createHolidayDto) {

        List<String> responses = new ArrayList<>();

        for (DateDTO date : createHolidayDto.getDates()) {
            Holiday existentHoliday = holidayService.findByEmployeeIdStartDataEndDate(
                    createHolidayDto.getEmployeeId(), date.getStartDate(), date.getEndDate());

            if (existentHoliday != null) {
                responses.add("Holiday already exists");
                continue;
            }

            if (date.getStartDate().isAfter(date.getEndDate())) {
                responses.add("Starting date cannot be after end date");
                continue;
            }
        }

        if (responses.isEmpty()) {
            Holiday newHoliday = modelMapper.map(createHolidayDto, Holiday.class);

            holidayService.save(createHolidayDto.getEmployeeId(), newHoliday);
            responses.add("Created");
        }

        return ResponseEntity.ok(responses);
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
        holidayService.save(holiday.getEmployee().getEmployeeId(), modelMapper.map(holiday, Holiday.class));
    }

    @PutMapping(value = "/updateMultiple", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public void updateMultipleHolidays(@RequestBody HolidayDto[] holidays) {
        holidayService.saveMultiple(mapDtosToHolidays(Arrays.asList(holidays)));
    }

    @GetMapping(value = "/findByDateAfter/{startDate}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<HolidayDto> findByDateAfter(@PathVariable("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate) {
        return mapHolidaysToDtos(holidayService.findByDateAfter(startDate));
    }

    @GetMapping(value = "/findByDateBeforeOrSameDay/{startDate}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<HolidayDto> findByDateBeforeOrSameDay(@PathVariable("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate) {
        return mapHolidaysToDtos(holidayService.findByDateBefore(startDate.plusDays(1)));
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
    public List<HolidayDto> findByClientStatus(@PathVariable("holidayStatusId") int holidayStatusId) {
        return mapHolidaysToDtos(holidayService.findByStatus(HolidayStatus.fromId(holidayStatusId)));
    }

    @CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
    @GetMapping(value = "/findByHolidayStatusAndDateAfter/{holidayStatusId}/{startDate}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<HolidayDto> findByStatusAndDateAfter(@PathVariable("holidayStatusId") int holidayStatusId, @PathVariable("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate) {
        return mapHolidaysToDtos(holidayService.findByStatusAndDateAfter(com.unosquare.admin_core.back_end.enums.HolidayStatus.fromId(holidayStatusId), startDate));
    }

    private List<HolidayDto> mapHolidaysToDtos(List<Holiday> holidays) {
        return holidays.stream().map(holiday -> modelMapper.map(holiday, HolidayDto.class)).collect(Collectors.toList());
    }

    private List<Holiday> mapDtosToHolidays(List<HolidayDto> holidays) {
        return holidays.stream().map(holiday -> modelMapper.map(holiday, Holiday.class)).collect(Collectors.toList());
    }
}
