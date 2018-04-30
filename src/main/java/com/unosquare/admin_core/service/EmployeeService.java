package com.unosquare.admin_core.service;

import com.google.common.base.Preconditions;
import com.unosquare.admin_core.entity.Employee;
import com.unosquare.admin_core.enums.Country;
import com.unosquare.admin_core.payload.LoginRequest;
import com.unosquare.admin_core.payload.SignUpRequest;
import com.unosquare.admin_core.repository.EmployeeRepository;
import com.unosquare.admin_core.repository.HolidayRepository;
import com.unosquare.admin_core.security.JwtTokenProvider;
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

@Service
public class EmployeeService {

    @Autowired
    HolidayService holidayService;

    @Autowired
    HolidayRepository holidayRepository;

    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenProvider tokenProvider;

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

    public void updateTotalHolidayForNewEmployee(Employee employee) {
        holidayService.addMandatoryHolidaysForNewEmployee(employee);
        int mandatoryHolidaysCount = holidayRepository.findByEmployee_EmployeeId(employee.getEmployeeId()).size();
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

    public List<Employee> findByStartDateAfter(LocalDate date) {
        return employeeRepository.findByStartDateAfter(date);
    }

    public List<Employee> findByStartDateBefore(LocalDate date) {
        return employeeRepository.findByStartDateBefore(date);
    }

    public List<Employee> findByCountry(Country country) {
        return employeeRepository.findByCountry(country);
    }

    public Employee findByEmail(String email) {
        return employeeRepository.findByEmailIgnoreCase(email);
    }

    public Employee createNewEmployeeUser(SignUpRequest signUpRequest) {
        // Creating USER's account
        Employee employee = new Employee(signUpRequest.getForename(), signUpRequest.getSurname(),
                signUpRequest.getEmail(), signUpRequest.getEmployeeRole(), signUpRequest.getStatus(),
                signUpRequest.getStartDate(), signUpRequest.getCounty(), signUpRequest.getPassword());

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
