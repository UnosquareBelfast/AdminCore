package com.unosquare.admin_core.back_end.configuration;

import com.unosquare.admin_core.back_end.configuration.mappings.domain.EmployeeMappings;
import com.unosquare.admin_core.back_end.configuration.mappings.presentation.RegisterEmployeeMappings;
import io.github.lukehutch.fastclasspathscanner.FastClasspathScanner;
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
        modelMapper.getConfiguration().setAmbiguityIgnored(true);

       /* Converter<CreateHolidayDto, Event> eventConverter = new AbstractConverter<CreateHolidayDto, Event>() {
            @Override
            protected Event convert(CreateHolidayDto source) {
                Event ret = new Event(source.getDates().get(0).getStartDate(), source.getDates().get(source.getDates().size() - 1).getEndDate(),
                        source.getEmployeeId(), EventTypes.ANNUAL_LEAVE.getEventTypeId(), 1, source.getDates().get(0).isHalfDay());

                return ret;
            }
        };*/

        List mappings = new ArrayList<>();
        new FastClasspathScanner(EmployeeMappings.class.getPackage().getName())
                .matchSubclassesOf(Object.class, mappings::add)
                .scan();
        new FastClasspathScanner(RegisterEmployeeMappings.class.getPackage().getName())
                .matchSubclassesOf(Object.class, mappings::add)
                .scan();

        for (Object mapping : mappings) {
            if (mapping instanceof BaseMappings<?, ?>) {
                modelMapper.addMappings(((BaseMappings) mapping).MapFromDtoToTarget());
                modelMapper.addMappings(((BaseMappings) mapping).MapFromTargetToDto());
            }

        }

        /*Converter<Event, EventDto> eventDtoConvert = new AbstractConverter<Event, EventDto>() {
            @Override
            protected EventDto convert(Event source) {
                EventDto ret = new EventDto(source.getEventId(), source.getStartDate(), source.getEndDate(),
                        source.getEmployee().getEmployeeId(), source.getEventType().getEventTypeId(),
                        source.getEventStatus().getEventStatusId(), source.isHalfDay());
                return ret;
            }
        };



        modelMapper.addConverter(eventConverter);
     //   modelMapper.addMappings(employeeMapping);
    //    modelMapper.addMappings(employeeDtoMapping);
        modelMapper.addConverter(eventDtoConvert);
      //  modelMapper.addMappings(eventEntityMapping);*/

        return modelMapper;
    }
}
