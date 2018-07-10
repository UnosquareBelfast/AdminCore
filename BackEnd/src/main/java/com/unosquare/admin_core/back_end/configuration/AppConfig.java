package com.unosquare.admin_core.back_end.configuration;

import com.unosquare.admin_core.back_end.dto.CreateEventDto;
import com.unosquare.admin_core.back_end.dto.EmployeeDto;
import com.unosquare.admin_core.back_end.dto.EventDto;
import com.unosquare.admin_core.back_end.entity.*;
import javafx.beans.property.Property;
import org.modelmapper.AbstractConverter;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import java.time.LocalDate;

@Configuration
@EnableTransactionManagement
public class AppConfig {

    @Bean
    @Scope(value = ConfigurableBeanFactory.SCOPE_SINGLETON)
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        Converter<CreateEventDto, Event> holidayConverter = new AbstractConverter<CreateEventDto, Event>() {
            @Override
            protected Event convert(CreateEventDto source) {
                Event ret = new Event(source.getDates().get(0).getStartDate(), source.getDates().get(source.getDates().size()-1).getEndDate(),
                        source.getEmployeeId(), source.getEventTypeId(), 1, source.getDates().get(0).isHalfDay());

                return ret;
            }
        };

        Converter<Event, EventDto> holidayDtoConvert = new AbstractConverter<Event, EventDto>() {
            @Override
            protected EventDto convert(Event source) {
                EventDto ret = new EventDto(source.getEventId(), source.getStartDate(), source.getEndDate(),
                        source.getEmployee().getEmployeeId(), source.getEventType().getEventTypeId(),
                        source.getHolidayStatus().getHolidayStatusId(), source.isHalfDay());

                return ret;
            }
        };

        PropertyMap<EventDto, Event> holidayEntityMapping = new PropertyMap<EventDto, Event>() {
            @Override
            protected void configure() {
                skip().setDateCreated(null);
                skip().getHolidayStatus().setDescription(source.getHolidayStatusDescription());
                skip().getEventType().setDescription(source.getEventTypeDescription());
                map().setLastModified(LocalDate.now());
                map().setHalfDay(source.isHalfDay());
                map().setEndDate(source.getEndDate());
                map().setEmployee(new Employee(source.getEmployeeId()));
                map().setEventId(source.getEventId());
                map().setHolidayStatus(new HolidayStatus(source.getHolidayStatusId()));
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

        modelMapper.addConverter(holidayConverter);
        modelMapper.addMappings(employeeMapping);
        modelMapper.addMappings(employeeDtoMapping);
        modelMapper.addConverter(holidayDtoConvert);
        modelMapper.addMappings(holidayEntityMapping);

        return modelMapper;
    }
}
