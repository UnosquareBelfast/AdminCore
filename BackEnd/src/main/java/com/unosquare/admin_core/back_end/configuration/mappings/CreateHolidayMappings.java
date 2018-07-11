package com.unosquare.admin_core.back_end.configuration.mappings;

import com.unosquare.admin_core.back_end.dto.ClientDto;
import com.unosquare.admin_core.back_end.dto.ContractDto;
import com.unosquare.admin_core.back_end.dto.CreateHolidayDto;
import com.unosquare.admin_core.back_end.entity.Client;
import com.unosquare.admin_core.back_end.entity.Contract;
import com.unosquare.admin_core.back_end.entity.Holiday;
import com.fasterxml.jackson.databind.ser.Serializers;
import com.unosquare.admin_core.back_end.dto.*;
import com.unosquare.admin_core.back_end.entity.*;
import com.unosquare.admin_core.back_end.enums.ClientStatus;
import com.unosquare.admin_core.back_end.payload.SignUpRequest;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

public class CreateHolidayMappings implements BaseMappings<CreateHolidayDto, Holiday> {


    @Override
    public PropertyMap<CreateHolidayDto, Holiday> RetrieveSourceDtoMapping() {
        return new org.modelmapper.PropertyMap<CreateHolidayDto, Holiday>() {
            protected void configure() {
                //map().setHolidayStatus();
                map().setEmployee(new Employee(source.getEmployeeId()));



            }
        };
    }


    @Override
    public PropertyMap<Holiday, CreateHolidayDto> RetrieveTargetDtoMapping(){
        return new org.modelmapper.PropertyMap<Holiday, CreateHolidayDto>() {
            @Override
            protected void configure() {
                map().setEmployeeId(source.getEmployee().getEmployeeId());

            }
        };
    }
}
