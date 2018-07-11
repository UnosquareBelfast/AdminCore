package com.unosquare.admin_core.back_end.configuration;
import com.unosquare.admin_core.back_end.configuration.mappings.*;
import com.unosquare.admin_core.back_end.dto.*;
import com.unosquare.admin_core.back_end.entity.*;
import com.unosquare.admin_core.back_end.enums.converter.ContractStatusConverter;
import com.unosquare.admin_core.back_end.payload.SignUpRequest;
import io.github.lukehutch.fastclasspathscanner.FastClasspathScanner;
import org.modelmapper.ModelMapper;

import java.io.Console;
import java.io.File;
import java.io.FileInputStream;
import java.lang.reflect.Method;
import org.modelmapper.PropertyMap;
import org.modelmapper.convention.MatchingStrategies;
import org.modelmapper.spi.MatchingStrategy;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import sun.security.ssl.Debug;
import java.lang.*;
import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;
import java.lang.reflect.Constructor;

import javax.print.attribute.standard.Destination;
import java.lang.reflect.Type;
import java.net.URL;
import java.time.LocalDate;
import java.util.*;
import java.util.jar.JarEntry;
import java.util.jar.JarInputStream;

@Configuration
@EnableTransactionManagement
public class AppConfig {

    @Bean
    @Scope(value = ConfigurableBeanFactory.SCOPE_SINGLETON)
    public ModelMapper modelMapper() {
        ModelMapper mapper = new ModelMapper();
// Alternative Java 8 version using a method reference:
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
        //Converter function
        HolidayMappings holidayMappings = new HolidayMappings();
        mapper.addConverter(holidayMappings.holidayConverter);
        mapper.addConverter(holidayMappings.holidayDtoConvert);


        return mapper;
    }
}
