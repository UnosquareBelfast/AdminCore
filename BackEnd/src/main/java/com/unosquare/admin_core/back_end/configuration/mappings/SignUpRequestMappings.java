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

import java.util.ArrayList;
import java.util.List;


public class SignUpRequestMappings implements BaseMappings<SignUpRequestDto, SignUpRequest> {

    public PropertyMap<SignUpRequestDto , SignUpRequest> RetrieveSourceDtoMapping(){
        return new PropertyMap<SignUpRequestDto, SignUpRequest>() {
            @Override
            protected void configure() {
                map().setForename(source.getForename());
                map().setSurname(source.getSurname());
                map().setStatusId(source.getStatusId());
                map().setStartDate(source.getStartDate());
                map().setPassword(source.getPassword());
                map().setEmployeeRoleId(source.getEmployeeRoleId());
                map().setEmail(source.getEmail());
                map().setCountryId(source.getCountryId());
                map().setUsername(source.getEmail());

            }
        };
    }


    public PropertyMap<SignUpRequest, SignUpRequestDto>RetrieveTargetDtoMapping(){
        return new PropertyMap<SignUpRequest, SignUpRequestDto>() {
            @Override
            protected void configure() {

                map().setForename(source.getForename());
                map().setSurname(source.getSurname());
                map().setStatusId(source.getStatusId());
                map().setStartDate(source.getStartDate());
                map().setPassword(source.getPassword());
                map().setEmployeeRoleId(source.getEmployeeRoleId());
                map().setEmail(source.getEmail());
                map().setCountryId(source.getCountryId());

            }
        };
    }
}
