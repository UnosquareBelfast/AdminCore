package com.unosquare.admin_core.back_end.configuration;

import com.unosquare.admin_core.back_end.ViewModels.EmployeeCredentialsViewModel;
import com.unosquare.admin_core.back_end.configuration.mappings.domain.EmployeeMappings;
import com.unosquare.admin_core.back_end.configuration.mappings.presentation.RegisterEmployeeMappings;
import com.unosquare.admin_core.back_end.security.UserPrincipal;
import io.github.lukehutch.fastclasspathscanner.FastClasspathScanner;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import java.lang.*;
import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;
import org.springframework.web.context.annotation.RequestScope;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Configuration
@EnableTransactionManagement
public class AppConfig {

    @Bean
    @Scope(value = ConfigurableBeanFactory.SCOPE_SINGLETON)
    public ModelMapper modelMapper() throws IllegalAccessException, InstantiationException, ClassNotFoundException {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setAmbiguityIgnored(true);

        List<Class<? extends BaseMappings>> mappings = new ArrayList<>();
        new FastClasspathScanner(EmployeeMappings.class.getPackage().getName())
                .matchClassesImplementing(BaseMappings.class, mappings::add)
                .scan();
        new FastClasspathScanner(RegisterEmployeeMappings.class.getPackage().getName())
                .matchClassesImplementing(BaseMappings.class, mappings::add)
                .scan();

        for (Class<? extends BaseMappings> mappingClass : mappings) {
            BaseMappings mapping = (BaseMappings)Class.forName(mappingClass.getName()).newInstance();
            modelMapper.addMappings(mapping.MapFromSourceToTarget());
            modelMapper.addMappings(mapping.MapFromTargetToSource());
        }

        return modelMapper;
    }

    @Bean
    @RequestScope
    public EmployeeCredentialsViewModel userCredentials(HttpServletRequest request, ModelMapper modelMapper) {
        UserPrincipal user = (UserPrincipal)((UsernamePasswordAuthenticationToken)request.getUserPrincipal()).getPrincipal();

        return modelMapper.map(user, EmployeeCredentialsViewModel.class);
    }

}
