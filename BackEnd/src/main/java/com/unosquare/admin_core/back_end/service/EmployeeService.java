package com.unosquare.admin_core.back_end.service;

import com.google.common.base.Preconditions;
import com.unosquare.admin_core.back_end.dto.EmployeeDTO;
import com.unosquare.admin_core.back_end.entity.Country;
import com.unosquare.admin_core.back_end.entity.Employee;
import com.unosquare.admin_core.back_end.enums.Countries;
import com.unosquare.admin_core.back_end.repository.EmployeeRepository;
import com.unosquare.admin_core.back_end.security.JwtTokenProvider;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenProvider tokenProvider;

    @Autowired
    ModelMapper modelMapper;

    public List<EmployeeDTO> findAll() {
        List employees = employeeRepository.findAll();
        return mapEmployeesToDtos(employees);
    }

    public EmployeeDTO findById(int id) {
        Optional<Employee> searchResult = employeeRepository.findById(id);
        if (searchResult.isPresent()) {
            return modelMapper.map(searchResult.get(), EmployeeDTO.class);
        }
        return null;
    }

    public EmployeeDTO save(EmployeeDTO employeeDto) {
        Preconditions.checkNotNull(employeeDto);
        Employee savedEmployee = null;

        Optional<Employee> existingEmployee = employeeRepository.findById(employeeDto.getEmployeeId());
        if (existingEmployee.isPresent()) {

            Employee currentDetails = existingEmployee.get();
            modelMapper.map(employeeDto, currentDetails);
            savedEmployee = employeeRepository.save(currentDetails);
        }
        else {
            Employee employee = modelMapper.map(employeeDto, Employee.class);
            savedEmployee = employeeRepository.save(employee);
        }

        return modelMapper.map(savedEmployee, EmployeeDTO.class);
    }

    public List<EmployeeDTO> findByForenameAndSurname(String forename, String surname) {
        List employees = employeeRepository.findByForenameIgnoreCaseAndSurnameIgnoreCase(forename, surname);
        return mapEmployeesToDtos(employees);
    }

    public List<EmployeeDTO> findByCountry(Countries country) {
        List employees = employeeRepository.findByCountry(new Country(country.getCountryId()));
        return mapEmployeesToDtos(employees);
    }

    public EmployeeDTO findByEmail(String email) {
        Employee employee = employeeRepository.findByEmailIgnoreCase(email);
        return employee != null ? modelMapper.map(employee, EmployeeDTO.class) : null;
    }

    public EmployeeDTO createNewEmployee(EmployeeDTO newEmployeeDTO) {
        Employee employee = modelMapper.map(newEmployeeDTO, Employee.class);
        employee.setPassword(passwordEncoder.encode(employee.getPassword()));
        employee.setTotalHolidays(calculateTotalHolidaysFromStartDate(employee, 33));
        Employee newEmployee = employeeRepository.save(employee);

        return modelMapper.map(newEmployee, EmployeeDTO.class);
    }

    public String jwtSignIn(String email, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        return tokenProvider.generateToken(authentication);
    }

    private short calculateTotalHolidaysFromStartDate(Employee employee, int maxHolidays) {
        short totalHolidays;
        if (employee.getStartDate().getYear() == LocalDate.now().getYear()) {
            totalHolidays = (short) ((maxHolidays / 12) * (12 - employee.getStartDate().getMonthValue()));
        } else {
            totalHolidays = (short) maxHolidays;
        }
        return totalHolidays;
    }

    private List<EmployeeDTO> mapEmployeesToDtos(List<Employee> events) {
        return events.stream().map(event -> modelMapper.map(event, EmployeeDTO.class)).collect(Collectors.toList());
    }
}
