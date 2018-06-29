package com.unosquare.admin_core.back_end.configuration;

import com.unosquare.admin_core.back_end.dto.CreateHolidayDto;
import com.unosquare.admin_core.back_end.dto.DateDTO;
import com.unosquare.admin_core.back_end.dto.EmployeeDto;
import com.unosquare.admin_core.back_end.entity.*;
import org.modelmapper.AbstractConverter;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.spi.MappingContext;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.orm.jpa.LocalEntityManagerFactoryBean;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.print.attribute.standard.Destination;
import java.time.LocalDate;
import java.util.List;

@Configuration
@EnableTransactionManagement
public class AppConfig {

    @Bean
    @Scope(value = ConfigurableBeanFactory.SCOPE_SINGLETON)
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        Converter<CreateHolidayDto, Holiday> holidayConverter = new AbstractConverter<CreateHolidayDto, Holiday>() {
            @Override
            protected Holiday convert(CreateHolidayDto source) {
                Holiday ret = new Holiday(source.getDates().get(0).getStartDate(), source.getDates().get(source.getDates().size()-1).getEndDate(),
                        source.getEmployeeId(), 1, source.getDates().get(0).isHalfDay());

                return ret;
            }
        };

        PropertyMap<EmployeeDto, Employee> employeeMapping = new PropertyMap<EmployeeDto, Employee>() {
            @Override
            protected void configure() {
                skip().setPassword(null);
                skip().getCountry().setDescription(source.getCountryDescription());
                skip().getEmployeeStatus().setDescription(source.getStatusDescription());
                skip().getEmployeeRole().setDescription(source.getEmployeeRoleDescription());
                map().getCountry().setCountryId(source.getCountryId());
                map().setEmployeeId(source.getEmployeeId());
                map().getEmployeeStatus().setEmployeeStatusId(source.getEmployeeStatusId());
                map().getEmployeeRole().setEmployeeRoleId(source.getEmployeeRoleId());
                map().setEmail(source.getEmail());
                map().setForename(source.getForename());
                map().setSurname(source.getSurname());
                map().setStartDate(source.getStartDate());
                map().setTotalHolidays(source.getTotalHolidays());
            }
        };

        modelMapper.addConverter(holidayConverter);
        modelMapper.addMappings(employeeMapping);

        return modelMapper;
    }

//    @Bean
//    public LocalEntityManagerFactoryBean entityManagerFactoryBean() {
//        LocalEntityManagerFactoryBean factory = new LocalEntityManagerFactoryBean();
//        factory.setPersistenceUnitName("entityManagerFactoryUnit");
//        return factory;
//    }
}
