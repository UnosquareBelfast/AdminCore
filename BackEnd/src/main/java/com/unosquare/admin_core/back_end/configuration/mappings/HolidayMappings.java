package com.unosquare.admin_core.back_end.configuration.mappings;

import com.fasterxml.jackson.databind.annotation.JsonAppend;
import com.fasterxml.jackson.databind.ser.Serializers;
import com.unosquare.admin_core.back_end.dto.*;
import com.unosquare.admin_core.back_end.entity.*;
import com.unosquare.admin_core.back_end.payload.SignUpRequest;
import org.modelmapper.AbstractConverter;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import sun.nio.cs.ext.MacArabic;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class HolidayMappings implements BaseMappings<HolidayDto, Holiday> {


   public Converter<CreateHolidayDto, Holiday> holidayConverter = new AbstractConverter<CreateHolidayDto, Holiday>() {
        @Override
        protected Holiday convert(CreateHolidayDto source) {
            Holiday ret = new Holiday(source.getDates().get(0).getStartDate(), source.getDates().get(source.getDates().size()-1).getEndDate(),
                    source.getEmployeeId(), 1, source.getDates().get(0).isHalfDay());

            return ret;
        }
    };

   public Converter<Holiday, HolidayDto> holidayDtoConvert = new AbstractConverter<Holiday, HolidayDto>() {
        @Override
        protected HolidayDto convert(Holiday source) {
            HolidayDto ret = new HolidayDto(source.getHolidayId(), source.getStartDate(), source.getEndDate(),
                    source.getEmployee().getEmployeeId(), source.getHolidayStatus().getHolidayStatusId(), source.isHalfDay());

            return ret;
        }
    };

    @Override
    public PropertyMap<HolidayDto, Holiday> RetrieveSourceDtoMapping(){
        return new PropertyMap<HolidayDto, Holiday>() {
            protected void configure() {
                skip().setDateCreated(null);
                map().setHolidayStatus(new HolidayStatus(source.getHolidayStatusId()));
                map().setLastModified(LocalDate.now());
                map().setHalfDay(source.isHalfDay());
                map().setEndDate(source.getEndDate());
               // map().setEmployee(new Employee(source.getEmployeeId()));
                map().setEmployee(new Employee(source.getEmployeeId()));
                map().setHolidayId(source.getHolidayId());
                map().setHolidayStatus(new HolidayStatus(source.getHolidayStatusId()));
                map().setStartDate(source.getStartDate());



            }
        };
    }


    @Override
    public PropertyMap<Holiday, HolidayDto>RetrieveTargetDtoMapping(){
        return new PropertyMap<Holiday, HolidayDto>() {

            protected void configure() {
                map().setLastModified(source.getLastModified());
                map().setHalfDay(source.isHalfDay());
                map().setHolidayId(source.getHolidayId());
                map().setDateCreated(source.getDateCreated());
                map().setHolidayStatusDescription(source.getHolidayStatus().getDescription());
                map().setEndDate(source.getEndDate());
                map().setStartDate(source.getStartDate());
                map().setEmployeeId(source.getEmployee().getEmployeeId());
                map().setHolidayStatusId(source.getHolidayStatus().getHolidayStatusId());

            }
        };
    }
}
