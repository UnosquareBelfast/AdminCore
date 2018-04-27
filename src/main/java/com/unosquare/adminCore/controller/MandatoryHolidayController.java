package com.unosquare.adminCore.controller;

import com.unosquare.adminCore.dto.MandatoryHolidayDto;
import com.unosquare.adminCore.entity.MandatoryHoliday;
import com.unosquare.adminCore.enums.Country;
import com.unosquare.adminCore.service.MandatoryHolidayService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
@RequestMapping("/mandatoryHolidays")
public class MandatoryHolidayController {

    @Autowired
    MandatoryHolidayService mandatoryHolidayService;

    private ModelMapper modelMapper = new ModelMapper();

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<MandatoryHolidayDto> findAllMandatoryHolidays() {
        return mapMandatoryHolidaysToDtos(mandatoryHolidayService.findAll());
    }

    @RequestMapping(method = RequestMethod.OPTIONS, value = "/*")
    @ResponseBody
    public ResponseEntity handleOptions() {
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping(value = "findMandatoryHolidaysByCountryAndYear/{countryId}/{year}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<MandatoryHolidayDto> findMandatoryHolidaysByCountryAndYear(@PathVariable("countryId") short countryId, @PathVariable("year") int year) {
        return mapMandatoryHolidaysToDtos(mandatoryHolidayService.findMandatoryHolidaysByCountryAndYear(Country.fromId(countryId), year));
    }

    @GetMapping(value = "/{mandatoryHolidayId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public MandatoryHolidayDto findMandatoryHolidayById(@PathVariable("mandatoryHolidayId") int id) {
        return modelMapper.map(mandatoryHolidayService.findById(id), MandatoryHolidayDto.class);
    }

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public void createMandatoryHoliday(@RequestBody MandatoryHolidayDto mandatoryHoliday) {
        mandatoryHolidayService.save(modelMapper.map(mandatoryHoliday, MandatoryHoliday.class));
    }

    @PutMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void updateMandatoryHoliday(@RequestBody MandatoryHolidayDto mandatoryHoliday) {
        mandatoryHolidayService.save(modelMapper.map(mandatoryHoliday, MandatoryHoliday.class));
    }

    @GetMapping(value = "findByCountryAndDateBetween/{countryId}/{rangeStart}/{rangeEnd}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<MandatoryHolidayDto> findByCountryAndDateBetween(@PathVariable("countryId") short countryId,
                                                              @PathVariable("rangeStart") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate rangeStart,
                                                              @PathVariable("rangeEnd") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)  LocalDate rangeEnd) {
        return mapMandatoryHolidaysToDtos(mandatoryHolidayService.findByCountryAndDateBetween(Country.fromId(countryId), rangeStart, rangeEnd));
    }

    @GetMapping(value = "findByDateBetween/{rangeStart}/{rangeEnd}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<MandatoryHolidayDto> findByDateBetween(@PathVariable("rangeStart") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)  LocalDate rangeStart,
                                                    @PathVariable("rangeEnd") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)  LocalDate rangeEnd) {
        return mapMandatoryHolidaysToDtos(mandatoryHolidayService.findByDateBetween(rangeStart, rangeEnd));
    }

    private List<MandatoryHolidayDto> mapMandatoryHolidaysToDtos(List<MandatoryHoliday> holidays){
        return holidays.stream().map(holiday -> modelMapper.map(holiday, MandatoryHolidayDto.class)).collect(Collectors.toList());
    }
}
