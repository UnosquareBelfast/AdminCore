package com.unosquare.admin_core.back_end.controller;

import com.unosquare.admin_core.back_end.dto.CreateHolidayDto;
import com.unosquare.admin_core.back_end.dto.DateDTO;
import com.unosquare.admin_core.back_end.dto.HolidayDto;
import com.unosquare.admin_core.back_end.entity.Holiday;
import com.unosquare.admin_core.back_end.enums.HolidayStatus;
import com.unosquare.admin_core.back_end.service.HolidayService;
import com.unosquare.admin_core.back_end.viewModels.CreateHolidayViewModel;
import com.unosquare.admin_core.back_end.viewModels.DateViewModel;
import com.unosquare.admin_core.back_end.viewModels.UpdateHolidayViewModel;
import com.unosquare.admin_core.back_end.viewModels.HolidayViewModel;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
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
    public List<HolidayViewModel> findAllHolidays() {
        return mapHolidaysToDtos(holidayService.findAll());
    }

    @RequestMapping(method = RequestMethod.OPTIONS, value = "/*")
    @ResponseBody
    public ResponseEntity handleOptions() {
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping(value = "/{holidayId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public HolidayViewModel findHolidayById(@PathVariable("holidayId") int holidayId) {
        return modelMapper.map(holidayService.findById(holidayId), HolidayViewModel.class);
    }

    @GetMapping(value = "findByEmployeeId/{employeeId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<HolidayViewModel> findHolidayByEmployeeId(@PathVariable("employeeId") int employeeId) {
        return mapHolidaysToDtos(holidayService.findByEmployee(employeeId));
    }

    @CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity createHoliday(@RequestBody CreateHolidayViewModel createHolidayViewModel) {

        List<String> responses = new ArrayList<>();

        for (DateViewModel date : createHolidayViewModel.getDates()) {
            Holiday existentHoliday = holidayService.findByEmployeeIdStartDataEndDate(
                    createHolidayViewModel.getEmployeeId(), date.getStartDate(), date.getEndDate());

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


                Holiday newHoliday = modelMapper.map(createHolidayViewModel, Holiday.class);

                holidayService.save(createHolidayViewModel.getEmployeeId(), newHoliday);
                responses.add("Created");


        }

        return ResponseEntity.ok(responses);
    }

    /*@PutMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void updateHoliday(@RequestBody HolidayDto holiday) {
        holidayService.save(holiday.getEmployeeId(), modelMapper.map(holiday, Holiday.class));
    }*/

   /* @PutMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void updateHoliday(@RequestBody HolidayViewModel holiday) {
        holidayService.save(holiday.getEmployeeId(), modelMapper.map(holiday, Holiday.class));
    }*/

    @CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
    @GetMapping(value = "/findByDateBetween/{rangeStart}/{rangeEnd}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<HolidayViewModel> findByDateBetween(@PathVariable("rangeStart") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate rangeStart,
                                              @PathVariable("rangeEnd") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate rangeEnd) {
        return mapHolidaysToDtos(holidayService.findByDateBetween(rangeStart, rangeEnd));
    }

    @CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
    @GetMapping(value = "/findByHolidayStatus/{holidayStatusId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<HolidayViewModel> findByClientStatus(@PathVariable("holidayStatusId") int holidayStatusId) {
        return mapHolidaysToDtos(holidayService.findByStatus(HolidayStatus.fromId(holidayStatusId)));
    }

    private List<HolidayViewModel> mapHolidaysToDtos(List<Holiday> holidays) {
        return holidays.stream().map(holiday -> modelMapper.map(holiday, HolidayViewModel.class)).collect(Collectors.toList());
    }

    private List<Holiday> mapDtosToHolidays(List<HolidayViewModel> holidays) {
        return holidays.stream().map(holiday -> modelMapper.map(holiday, Holiday.class)).collect(Collectors.toList());
    }
}
