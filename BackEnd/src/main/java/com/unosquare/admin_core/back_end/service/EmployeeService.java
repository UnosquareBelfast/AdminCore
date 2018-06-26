package com.unosquare.admin_core.back_end.service;

import com.google.common.base.Preconditions;
import com.unosquare.admin_core.back_end.entity.Country;
import com.unosquare.admin_core.back_end.entity.Employee;
import com.unosquare.admin_core.back_end.entity.EmployeeRole;
import com.unosquare.admin_core.back_end.entity.EmployeeStatus;
import com.unosquare.admin_core.back_end.payload.LoginRequest;
import com.unosquare.admin_core.back_end.payload.SignUpRequest;
import com.unosquare.admin_core.back_end.repository.EmployeeRepository;
import com.unosquare.admin_core.back_end.repository.HolidayRepository;
import com.unosquare.admin_core.back_end.security.JwtTokenProvider;
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

        // Creating USER's account
//        Employee employee = new Employee(signUpRequest.getForename(), signUpRequest.getSurname(),
//                signUpRequest.getEmail(), entityManager.getReference(EmployeeRole.class, signUpRequest.getEmployeeRoleId()), entityManager.getReference(EmployeeStatus.class, signUpRequest.getStatusId()),
//                signUpRequest.getStartDate(), entityManager.getReference(Country.class, signUpRequest.getCountryId()), signUpRequest.getPassword());

//        Employee employee = new Employee(signUpRequest.getForename(), signUpRequest.getSurname(),
//                signUpRequest.getEmail(),
//                entityManager.merge(new EmployeeRole(signUpRequest.getEmployeeRoleId())),
//                entityManager.merge(new EmployeeStatus(signUpRequest.getStatusId())),
//                signUpRequest.getStartDate(),
//                entityManager.merge(new Country(signUpRequest.getCountryId())), signUpRequest.getPassword());

//        Employee employee = new Employee(signUpRequest.getForename(), signUpRequest.getSurname(),
//                signUpRequest.getEmail(), entityManager.merge(entityManager.getReference(EmployeeRole.class, signUpRequest.getEmployeeRoleId())),
//                entityManager.merge(entityManager.getReference(EmployeeStatus.class, signUpRequest.getStatusId())),
//                signUpRequest.getStartDate(), entityManager.merge(entityManager.getReference(Country.class, signUpRequest.getCountryId())), signUpRequest.getPassword());

        // got id and desc but stored id only, saved nothing
//        Country country = entityManager.merge(new Country(signUpRequest.getCountryId()));
//        EmployeeRole employeeRole = entityManager.merge(new EmployeeRole(signUpRequest.getEmployeeRoleId()));
//        EmployeeStatus employeeStatus = entityManager.merge(new EmployeeStatus(signUpRequest.getStatusId()));

        // got id and desc but stored nothing, saved nothing
//        Country country = entityManager.getReference(Country.class, signUpRequest.getCountryId());
//        EmployeeRole employeeRole = entityManager.getReference(EmployeeRole.class, signUpRequest.getEmployeeRoleId());
//        EmployeeStatus employeeStatus = entityManager.getReference(EmployeeStatus.class, signUpRequest.getStatusId());

        // got id and desc but stored nothing, saved nothing
        Country country = entityManager.merge(entityManager.getReference(Country.class, signUpRequest.getCountryId()));
        EmployeeRole employeeRole = entityManager.merge(entityManager.getReference(EmployeeRole.class, signUpRequest.getEmployeeRoleId()));
        EmployeeStatus employeeStatus = entityManager.merge(entityManager.getReference(EmployeeStatus.class, signUpRequest.getStatusId()));

        entityManager.persist(country);
        entityManager.persist(employeeRole);
        entityManager.persist(employeeStatus);

        Employee employee = new Employee(signUpRequest.getForename(), signUpRequest.getSurname(),
                signUpRequest.getEmail(), employeeRole, employeeStatus,
                signUpRequest.getStartDate(), country, signUpRequest.getPassword());

        employee.setEmployeeRole(employeeRole);
        employee.setEmployeeStatus(employeeStatus);
        employee.setCountry(country);

        entityManager.persist(employee);



        employee.setPassword(passwordEncoder.encode(employee.getPassword()));

//        employee.getEmployeeStatus().setEmployeeStatusId(signUpRequest.getStatusId());
//        employee.getEmployeeRole().setEmployeeRoleId(signUpRequest.getEmployeeRoleId());
//        employee.getCountry().setCountryId(signUpRequest.getCountryId());

//        employee.setCountry(entityManager.merge(employee.getCountry()));
//        employee.setEmployeeStatus(entityManager.merge(employee.getEmployeeStatus()));
//        employee.setEmployeeRole(entityManager.merge(employee.getEmployeeRole()));

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
