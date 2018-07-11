package com.unosquare.admin_core.back_end.configuration.mappings;

import com.unosquare.admin_core.back_end.dto.*;
import com.unosquare.admin_core.back_end.entity.*;
import com.unosquare.admin_core.back_end.payload.SignUpRequest;
import com.unosquare.admin_core.back_end.service.ClientService;
import com.unosquare.admin_core.back_end.service.EmployeeService;
import lombok.val;
import org.modelmapper.AbstractConverter;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.spring.web.readers.operation.CachingOperationNameGenerator;

import javax.persistence.EnumType;
import java.util.ArrayList;
import java.util.List;

public class ContractMappings implements BaseMappings<ContractDto, Contract> {




    @Override
    public PropertyMap<ContractDto, Contract> RetrieveSourceDtoMapping() {
        return new PropertyMap <ContractDto, Contract>() {
            protected void configure() {
                skip().setContractStatus(new ContractStatus(source.getContractStatusId()));
                skip().setEmployee(new Employee(source.getEmployee().getEmployeeId()));
                skip().setClient(new Client(source.getClient().getClientId()));
                map().setContractId(source.getContractId());
            }
        };
    }

    @Override
    public PropertyMap<Contract, ContractDto> RetrieveTargetDtoMapping() {
        return new PropertyMap <Contract, ContractDto>() {
            protected void configure() {
                map().setEmployeeService(new EmployeeService());
                map().setEmployee(new EmployeeDto());
                map().setClient(new ClientDto());
                map().setClientService(new ClientService());
                map().setContractStatusId(new ContractStatus().getContractStatusId());
                map().setContractStatusDescription(source.getContractStatus().getDescription());

            }
        };
    }

}
