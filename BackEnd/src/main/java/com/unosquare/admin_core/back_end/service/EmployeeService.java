package com.unosquare.admin_core.back_end.service;

import com.google.common.base.Preconditions;
import com.unosquare.admin_core.back_end.dto.EmployeeDto;
import com.unosquare.admin_core.back_end.entity.Country;
import com.unosquare.admin_core.back_end.entity.Employee;
import com.unosquare.admin_core.back_end.entity.EmployeeRole;
import com.unosquare.admin_core.back_end.entity.EmployeeStatus;
import com.unosquare.admin_core.back_end.payload.LoginRequest;
import com.unosquare.admin_core.back_end.payload.SignUpRequest;
import com.unosquare.admin_core.back_end.repository.EmployeeRepository;
import com.unosquare.admin_core.back_end.repository.HolidayRepository;
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
@Transactional
public class EmployeeService {

    @Autowired
    HolidayService holidayService;

    @Autowired
    HolidayRepository holidayRepository;

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

    public Employee updateEmployee(EmployeeDto employeeDto){
        Employee employee = entityManager.find(Employee.class, employeeDto.getEmployeeId());

        Country country = entityManager.find(Country.class, employeeDto.getCountryId());
        EmployeeRole role = entityManager.find(EmployeeRole.class, employeeDto.getEmployeeRoleId());
        EmployeeStatus status = entityManager.find(EmployeeStatus.class, employeeDto.getEmployeeStatusId());

        employee.setCountry(country);
        employee.setEmployeeRole(role);
        employee.setEmployeeStatus(status);

        entityManager.detach(employee.getCountry());
        entityManager.detach(employee.getEmployeeRole());
        entityManager.detach(employee.getEmployeeStatus());

        modelMapper.map(employeeDto, employee);

        return save(employee);
    }


    public void updateTotalHolidayForNewEmployee(Employee employee) {
        holidayService.addMandatoryHolidaysForNewEmployee(employee);
//        int mandatoryHolidaysCount = holidayRepository.findByEmployeeId(employee.getEmployeeId()).size();
        int mandatoryHolidaysCount = 10;
        int maxHolidays = 33 - mandatoryHolidaysCount;
        employee.setTotalHolidays(calculateTotalHolidaysFromStartDate(employee, maxHolidays));
        save(employee);
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

    public List<Employee> findByStartDateAfter(LocalDate startDate) {
        return employeeRepository.findByStartDateAfter(startDate);
    }

    public List<Employee> findByStartDateBefore(LocalDate startDate) {
        return employeeRepository.findByStartDateBefore(startDate);
    }

    public List<Employee> findByCountry(com.unosquare.admin_core.back_end.enums.Country country) {
        return employeeRepository.findByCountry(new com.unosquare.admin_core.back_end.entity.Country(country.getCountryId()));
    }

    public Employee findByEmail(String email) {
        return employeeRepository.findByEmailIgnoreCase(email);
    }

    public Employee createNewEmployeeUser(SignUpRequest signUpRequest) {

        Country country = entityManager.find(Country.class, signUpRequest.getCountryId());
        EmployeeRole employeeRole = entityManager.find(EmployeeRole.class, signUpRequest.getEmployeeRoleId());
        EmployeeStatus employeeStatus = entityManager.find(EmployeeStatus.class, signUpRequest.getStatusId());

        Employee employee = new Employee(signUpRequest.getForename(), signUpRequest.getSurname(),
                signUpRequest.getEmail(), employeeRole, employeeStatus,
                signUpRequest.getStartDate(), country, signUpRequest.getPassword());

        employee.setPassword(passwordEncoder.encode(employee.getPassword()));
        employee = save(employee);

        updateTotalHolidayForNewEmployee(employee);

        return employee;
    }

    public String jwtSignIn(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        return tokenProvider.generateToken(authentication);
    }
}
