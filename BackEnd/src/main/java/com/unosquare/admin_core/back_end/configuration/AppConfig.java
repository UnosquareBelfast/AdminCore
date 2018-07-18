package com.unosquare.admin_core.back_end.configuration;
import com.unosquare.admin_core.back_end.configuration.mappings.*;
import io.github.lukehutch.fastclasspathscanner.FastClasspathScanner;

import com.unosquare.admin_core.back_end.dto.CreateHolidayDto;
import com.unosquare.admin_core.back_end.dto.EmployeeDto;
import com.unosquare.admin_core.back_end.dto.EventDto;
import com.unosquare.admin_core.back_end.entity.*;
import com.unosquare.admin_core.back_end.enums.EventTypes;
import org.modelmapper.AbstractConverter;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import java.lang.*;
import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;
import java.util.*;

@Configuration
@EnableTransactionManagement
public class AppConfig {

    @Bean
    @Scope(value = ConfigurableBeanFactory.SCOPE_SINGLETON)
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        Converter<CreateHolidayDto, Event> eventConverter = new AbstractConverter<CreateHolidayDto, Event>() {
            @Override
            protected Event convert(CreateHolidayDto source) {
                Event ret = new Event(source.getDates().get(0).getStartDate(), source.getDates().get(source.getDates().size()-1).getEndDate(),
                        source.getEmployeeId(), EventTypes.ANNUAL_LEAVE.getEventTypeId(), 1, source.getDates().get(0).isHalfDay());

                return ret;
        ModelMapper mapper = new ModelMapper();
        List mappings = new ArrayList<>();
        new FastClasspathScanner(ClientMappings.class.getPackage().getName())
                .matchSubclassesOf(Object.class, mappings::add)
                .scan();
        for (Object mapping : mappings) {
            if (mapping instanceof BaseMappings<?, ?>) {
               mapper.addMappings(((BaseMappings) mapping).RetrieveSourceDtoMapping());
               mapper.addMappings(((BaseMappings) mapping).RetrieveTargetDtoMapping());
            }

        }
        HolidayMappings holidayMappings = new HolidayMappings();
        mapper.addConverter(holidayMappings.holidayConverter);
        mapper.addConverter(holidayMappings.holidayDtoConvert);
        Converter<Event, EventDto> eventDtoConvert = new AbstractConverter<Event, EventDto>() {
            @Override
            protected EventDto convert(Event source) {
                EventDto ret = new EventDto(source.getEventId(), source.getStartDate(), source.getEndDate(),
                        source.getEmployee().getEmployeeId(), source.getEventType().getEventTypeId(),
                        source.getEventStatus().getEventStatusId(), source.isHalfDay());


        return mapper;
        PropertyMap<EventDto, Event> eventEntityMapping = new PropertyMap<EventDto, Event>() {
            @Override
            protected void configure() {
                skip().setDateCreated(null);
                skip().getEventStatus().setDescription(source.getEventStatusDescription());
                skip().getEventType().setDescription(source.getEventTypeDescription());
                map().setLastModified(LocalDate.now());
                map().setHalfDay(source.isHalfDay());
                map().setEndDate(source.getEndDate());
                map().setEmployee(new Employee(source.getEmployeeId()));
                map().setEventId(source.getEventId());
                map().setEventStatus(new EventStatus(source.getEventStatusId()));
                map().setStartDate(source.getStartDate());
                map().setEventType(new EventType(source.getEventTypeId()));
            }
        };

        PropertyMap<EmployeeDto, Employee> employeeMapping = new PropertyMap<EmployeeDto, Employee>() {
            @Override
            protected void configure() {
                skip().setPassword(null);
                skip().getCountry().setDescription(source.getCountryDescription());
                skip().getEmployeeRole().setDescription(source.getEmployeeRoleDescription());
                skip().getEmployeeStatus().setDescription(source.getStatusDescription());
                skip().setEvents(null);
                skip().setContracts(null);
                map().setTotalHolidays(source.getTotalHolidays());
                map().setEmail(source.getEmail());
                map().setCountry(new Country(source.getCountryId()));
                map().setEmployeeId(source.getEmployeeId());
                map().setEmployeeStatus(new EmployeeStatus(source.getEmployeeStatusId()));
                map().setEmployeeRole(new EmployeeRole(source.getEmployeeRoleId()));
                map().setForename(source.getForename());
                map().setSurname(source.getSurname());
                map().setStartDate(source.getStartDate());
            }
        };

        PropertyMap<Employee, EmployeeDto> employeeDtoMapping = new PropertyMap<Employee, EmployeeDto>() {
            @Override
            protected void configure() {
                map().setTotalHolidays(source.getTotalHolidays());
                map().setEmail(source.getEmail());
                map().setCountryId(source.getCountry().getCountryId());
                map().setCountryDescription(source.getCountry().getDescription());
                map().setEmployeeId(source.getEmployeeId());
                map().setEmployeeStatusId(source.getEmployeeStatus().getEmployeeStatusId());
                map().setStatusDescription(source.getEmployeeStatus().getDescription());
                map().setEmployeeRoleId(source.getEmployeeRole().getEmployeeRoleId());
                map().setEmployeeRoleDescription(source.getEmployeeRole().getDescription());
                map().setForename(source.getForename());
                map().setSurname(source.getSurname());
                map().setStartDate(source.getStartDate());
            }
        };

        modelMapper.addConverter(eventConverter);
        modelMapper.addMappings(employeeMapping);
        modelMapper.addMappings(employeeDtoMapping);
        modelMapper.addConverter(eventDtoConvert);
        modelMapper.addMappings(eventEntityMapping);

        return modelMapper;
    }
}
