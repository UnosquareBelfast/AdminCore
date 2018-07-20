package com.unosquare.admin_core.back_end.service;

import com.google.common.base.Preconditions;
import com.unosquare.admin_core.back_end.dto.EmployeeDTO;
import com.unosquare.admin_core.back_end.entity.Country;
import com.unosquare.admin_core.back_end.entity.Employee;
import com.unosquare.admin_core.back_end.entity.EmployeeRole;
import com.unosquare.admin_core.back_end.entity.EmployeeStatus;
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
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @PersistenceContext
    private EntityManager entityManager;

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

    public List<Employee> findAll() {
        return employeeRepository.findAll();
    }

    public Employee findById(int id) {
        Optional<Employee> searchResult = employeeRepository.findById(id);

        if (searchResult.isPresent()) {
            return searchResult.get();
        }
        return null;
    }

    public Employee save(Employee employee) {
        Preconditions.checkNotNull(employee);
        return employeeRepository.save(employee);
    }

    public Employee updateEmployee(EmployeeDTO employeeDTO){
        Employee employee = entityManager.find(Employee.class, employeeDTO.getEmployeeId());

        Country country = entityManager.find(Country.class, employeeDTO.getCountryId());
        EmployeeRole role = entityManager.find(EmployeeRole.class, employeeDTO.getEmployeeRoleId());
        EmployeeStatus status = entityManager.find(EmployeeStatus.class, employeeDTO.getEmployeeStatusId());

        employee.setCountry(country);
        employee.setEmployeeRole(role);
        employee.setEmployeeStatus(status);

        entityManager.detach(employee.getCountry());
        entityManager.detach(employee.getEmployeeRole());
        entityManager.detach(employee.getEmployeeStatus());

        modelMapper.map(employeeDTO, employee);

        return save(employee);
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

    public List<Employee> findByForenameAndSurname(String forename, String surname) {
        return employeeRepository.findByForenameIgnoreCaseAndSurnameIgnoreCase(forename, surname);
    }

    public List<Employee> findByCountry(com.unosquare.admin_core.back_end.enums.Countries country) {
        return employeeRepository.findByCountry(new com.unosquare.admin_core.back_end.entity.Country(country.getCountryId()));
    }

    public Employee findByEmail(String email) {
        return employeeRepository.findByEmailIgnoreCase(email);
    }

    public EmployeeDTO createNewEmployee(EmployeeDTO newEmployeeDTO) {
        Employee employee = modelMapper.map(newEmployeeDTO, Employee.class);
        employee.setPassword(passwordEncoder.encode(employee.getPassword()));
        employee.setTotalHolidays(calculateTotalHolidaysFromStartDate(employee, 33));
        Employee newEmployee = save(employee);

        return modelMapper.map(newEmployee, EmployeeDTO.class);
    }

    public String jwtSignIn(String email, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        email,
                        password
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        return tokenProvider.generateToken(authentication);
    }
}
