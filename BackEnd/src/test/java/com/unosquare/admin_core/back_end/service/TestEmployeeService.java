package com.unosquare.admin_core.back_end.service;

import com.unosquare.admin_core.back_end.entity.Employee;
import com.unosquare.admin_core.back_end.entity.Holiday;
import com.unosquare.admin_core.back_end.enums.Country;
import com.unosquare.admin_core.back_end.enums.EmployeeRole;
import com.unosquare.admin_core.back_end.enums.EmployeeStatus;
import com.unosquare.admin_core.back_end.payload.LoginRequest;
import com.unosquare.admin_core.back_end.payload.SignUpRequest;
import com.unosquare.admin_core.back_end.repository.EmployeeRepository;
import com.unosquare.admin_core.back_end.repository.HolidayRepository;
import com.unosquare.admin_core.back_end.security.JwtTokenProvider;
import com.unosquare.admin_core.back_end.service.enums.TestEmployeeEnum;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.*;

import static org.mockito.ArgumentMatchers.any;

public class TestEmployeeService {

    @InjectMocks
    private EmployeeService testingObject;

    @InjectMocks
    private EmployeeService holidayTestingObject;

    private Employee employeeStartDateBeforeToday;
    private Employee employeeStartDateAfterToday;
    private List<Employee> employees;

    private List<Employee> employeesAfterStart;
    private List<Employee> employeesBeforeStart;

    private int year = LocalDate.now().getYear();
    private LocalDate currentDateTest = LocalDate.of(year, 6, 6);

    private LocalDate pastDate = currentDateTest.minusMonths(1);
    private LocalDate futureDate = currentDateTest.plusMonths(1);


    @Mock
    private EmployeeRepository employeeRepository;

    @Mock
    private HolidayRepository holidayRepository;

    @Mock
    private HolidayService holidayService;

    @Mock
    PasswordEncoder passwordEncoder;

    @Mock
    AuthenticationManager authenticationManager;

    @Mock
    JwtTokenProvider tokenProvider;

    @Before
    public void initMocks() {
        MockitoAnnotations.initMocks(this);
        employeeStartDateBeforeToday = new Employee();
        employeeStartDateBeforeToday.setForename(TestEmployeeEnum.forename.toString());
        employeeStartDateBeforeToday.setSurname(TestEmployeeEnum.surname.toString());
        employeeStartDateBeforeToday.setEmployeeStatus(EmployeeStatus.ACTIVE);
        employeeStartDateBeforeToday.setEmployeeRole(EmployeeRole.SYSTEM_ADMINISTRATOR);
        employeeStartDateBeforeToday.setCountry(Country.NORTHERN_IRELAND);
        employeeStartDateBeforeToday.setEmail(TestEmployeeEnum.email.toString());
        employeeStartDateBeforeToday.setTotalHolidays(Short.valueOf(TestEmployeeEnum.totalHolidays.toString()));
        employeeStartDateBeforeToday.setEmployeeId(Integer.valueOf(TestEmployeeEnum.employeeId.toString()));
        employeeStartDateBeforeToday.setStartDate(pastDate);
        employeeStartDateBeforeToday.setPassword(TestEmployeeEnum.passwordEncrypted.toString());

        employeeStartDateAfterToday = new Employee();
        employeeStartDateAfterToday.setForename(TestEmployeeEnum.forename2.toString());
        employeeStartDateAfterToday.setSurname(TestEmployeeEnum.surname2.toString());
        employeeStartDateAfterToday.setEmployeeStatus(EmployeeStatus.ACTIVE);
        employeeStartDateAfterToday.setEmployeeRole(EmployeeRole.SYSTEM_ADMINISTRATOR);
        employeeStartDateAfterToday.setCountry(Country.MEXICO);
        employeeStartDateAfterToday.setEmail(TestEmployeeEnum.email2.toString());
        employeeStartDateAfterToday.setTotalHolidays(Short.valueOf(TestEmployeeEnum.totalHolidays2.toString()));
        employeeStartDateAfterToday.setEmployeeId(Integer.valueOf(TestEmployeeEnum.employeeId2.toString()));
        employeeStartDateAfterToday.setStartDate(futureDate);
        employeeStartDateAfterToday.setPassword(TestEmployeeEnum.passwordEncrypted.toString());

        employees = Arrays.asList(employeeStartDateBeforeToday, employeeStartDateAfterToday);
        employeesAfterStart = Arrays.asList(employeeStartDateAfterToday);
        employeesBeforeStart = Arrays.asList(employeeStartDateBeforeToday);

    }

    //region findById tests
    @Test
    public void testFindByIdEmployeeFornameSet() {
        Mockito.doReturn(Optional.of(employeeStartDateBeforeToday)).when(employeeRepository).findById(1);
        Assert.assertTrue(testingObject.findById(1).getForename().equals(TestEmployeeEnum.forename.toString()));
    }

    @Test
    public void testFindByIdEmployeeSurnameSet() {
        Mockito.doReturn(Optional.of(employeeStartDateBeforeToday)).when(employeeRepository).findById(1);
        Assert.assertTrue(testingObject.findById(1).getSurname().equals(TestEmployeeEnum.surname.toString()));
    }

    @Test
    public void testFindByIdEmployeeCountrySet() {
        Mockito.doReturn(Optional.of(employeeStartDateBeforeToday)).when(employeeRepository).findById(1);
        Assert.assertTrue(testingObject.findById(1).getCountry().equals(Country.NORTHERN_IRELAND));
    }

    @Test
    public void testFindByIdEmployeeTotalHolidaysSet() {
        Mockito.doReturn(Optional.of(employeeStartDateBeforeToday)).when(employeeRepository).findById(1);
        Assert.assertTrue(testingObject.findById(1).getTotalHolidays() == (Integer.valueOf(TestEmployeeEnum.totalHolidays.toString())));
    }

    @Test
    public void testFindByIdEmployeeEmailSet() {
        Mockito.doReturn(Optional.of(employeeStartDateBeforeToday)).when(employeeRepository).findById(1);
        Assert.assertTrue(testingObject.findById(1).getEmail().equals(TestEmployeeEnum.email.toString()));
    }

    @Test
    public void testFindByIdEmployeeAdminSet() {
        Mockito.doReturn(Optional.of(employeeStartDateBeforeToday)).when(employeeRepository).findById(1);
        Assert.assertTrue(testingObject.findById(1).getEmployeeStatus() == (EmployeeStatus.ACTIVE));
    }

    @Test
    public void testFindByIdEmployeeActiveSet() {
        Mockito.doReturn(Optional.of(employeeStartDateBeforeToday)).when(employeeRepository).findById(1);
        Assert.assertTrue(testingObject.findById(1).getEmployeeRole() == EmployeeRole.SYSTEM_ADMINISTRATOR);
    }
    //endregion

    @Test
    public void TestSaveMethod() {
        Mockito.doReturn(employeeStartDateBeforeToday).when(employeeRepository).save(employeeStartDateBeforeToday);
        testingObject.save(employeeStartDateBeforeToday);
    }

    @Test
    public void TestUpdateTotalHolidays() {
        List holidays = getMockHolidays();
        Mockito.doReturn(holidays).when(holidayRepository).findByEmployee_EmployeeId(employeeStartDateBeforeToday.getEmployeeId());
        Mockito.doReturn(employeeStartDateBeforeToday).when(employeeRepository).save(employeeStartDateBeforeToday);
        testingObject.updateTotalHolidayForNewEmployee(employeeStartDateBeforeToday);
        Assert.assertTrue(employeeStartDateBeforeToday.getTotalHolidays() < 33);
    }

    @Test
    public void TestUpdateTotalHolidaysSameYear() {
        List holidays = getMockHolidays();
        employeeStartDateBeforeToday.setStartDate(currentDateTest);
        Mockito.doReturn(holidays).when(holidayRepository).findByEmployee_EmployeeId(employeeStartDateBeforeToday.getEmployeeId());
        Mockito.doReturn(employeeStartDateBeforeToday).when(employeeRepository).save(employeeStartDateBeforeToday);
        testingObject.updateTotalHolidayForNewEmployee(employeeStartDateBeforeToday);
        Assert.assertTrue(employeeStartDateBeforeToday.getTotalHolidays() < 32);
    }

    @Test
    public void TestFindAll() {
        List<Employee> listOfAllClients = new ArrayList<>();
        listOfAllClients.add(employeeStartDateBeforeToday);
        listOfAllClients.add(employeeStartDateBeforeToday);
        Mockito.doReturn(listOfAllClients).when(employeeRepository).findAll();
        Assert.assertTrue(testingObject.findAll().size() == 2);
    }

    private List<Holiday> getMockHolidays() {
        Holiday holiday = new Holiday();
        List holidays = new ArrayList<>();
        holidays.add(holiday);
        holidays.add(holiday);
        return holidays;
    }

    //region findByForenameAndSurname tests
    @Test
    public void testFindByForenameAndSurnameFornameSet() {
        Mockito.doReturn(employees).when(employeeRepository).
                findByForenameIgnoreCaseAndSurnameIgnoreCase(TestEmployeeEnum.forename.toString(), TestEmployeeEnum.surname.toString());

        Assert.assertTrue(testingObject.findByForenameAndSurname(TestEmployeeEnum.forename.toString(), TestEmployeeEnum.surname.toString()).
                get(0).getForename().equals(TestEmployeeEnum.forename.toString()));
    }

    @Test
    public void testFindByForenameAndSurnameSurnameSet() {
        Mockito.doReturn(employees).when(employeeRepository).
                findByForenameIgnoreCaseAndSurnameIgnoreCase(TestEmployeeEnum.forename.toString(), TestEmployeeEnum.surname.toString());

        Assert.assertTrue(testingObject.findByForenameAndSurname(TestEmployeeEnum.forename.toString(), TestEmployeeEnum.surname.toString()).
                get(0).getSurname().equals(TestEmployeeEnum.surname.toString()));
    }

    @Test
    public void testFindByForenameAndSurnameCountrySet() {
        Mockito.doReturn(employees).when(employeeRepository).
                findByForenameIgnoreCaseAndSurnameIgnoreCase(TestEmployeeEnum.forename.toString(), TestEmployeeEnum.surname.toString());

        Assert.assertTrue(testingObject.findByForenameAndSurname(TestEmployeeEnum.forename.toString(), TestEmployeeEnum.surname.toString()).
                get(0).getCountry().equals(Country.NORTHERN_IRELAND));
    }

    @Test
    public void testFindByForenameAndSurnameTotalHolidaysSet() {
        Mockito.doReturn(employees).when(employeeRepository).
                findByForenameIgnoreCaseAndSurnameIgnoreCase(TestEmployeeEnum.forename.toString(), TestEmployeeEnum.surname.toString());

        Assert.assertTrue(testingObject.findByForenameAndSurname(TestEmployeeEnum.forename.toString(), TestEmployeeEnum.surname.toString()).
                get(0).getTotalHolidays() == Integer.parseInt(TestEmployeeEnum.totalHolidays.toString()));
    }

    @Test
    public void testFindByForenameAndSurnameEmailSet() {
        Mockito.doReturn(employees).when(employeeRepository).
                findByForenameIgnoreCaseAndSurnameIgnoreCase(TestEmployeeEnum.forename.toString(), TestEmployeeEnum.surname.toString());

        Assert.assertTrue(testingObject.findByForenameAndSurname(TestEmployeeEnum.forename.toString(), TestEmployeeEnum.surname.toString()).
                get(0).getEmail().equals(TestEmployeeEnum.email.toString()));
    }

    @Test
    public void testFindByForenameAndSurnameAdminSet() {
        Mockito.doReturn(employees).when(employeeRepository).
                findByForenameIgnoreCaseAndSurnameIgnoreCase(TestEmployeeEnum.forename.toString(), TestEmployeeEnum.surname.toString());

        Assert.assertTrue(testingObject.findByForenameAndSurname(TestEmployeeEnum.forename.toString(), TestEmployeeEnum.surname.toString()).
                get(0).getEmployeeRole() == EmployeeRole.SYSTEM_ADMINISTRATOR);
    }

    @Test
    public void testFindByForenameAndSurnameActiveSet() {
        Mockito.doReturn(employees).when(employeeRepository).
                findByForenameIgnoreCaseAndSurnameIgnoreCase(TestEmployeeEnum.forename.toString(), TestEmployeeEnum.surname.toString());

        Assert.assertTrue(testingObject.findByForenameAndSurname(TestEmployeeEnum.forename.toString(), TestEmployeeEnum.surname.toString()).
                get(0).getEmployeeStatus() == EmployeeStatus.ACTIVE);
    }
    //endregion

    //region findByStartDateAfter tests
    @Test
    public void testFindByStartDateAfterFornameSet() {
        Mockito.doReturn(employeesAfterStart).when(employeeRepository).
                findByStartDateAfter(currentDateTest);

        Assert.assertTrue(testingObject.findByStartDateAfter(currentDateTest).
                get(0).getForename().equals(TestEmployeeEnum.forename2.toString()));
    }

    @Test
    public void testFindByStartDateAfterSurnameSet() {
        Mockito.doReturn(employeesAfterStart).when(employeeRepository).
                findByStartDateAfter(currentDateTest);

        Assert.assertTrue(testingObject.findByStartDateAfter(currentDateTest).
                get(0).getSurname().equals(TestEmployeeEnum.surname2.toString()));
    }

    @Test
    public void testFindByStartDateAfterCountrySet() {
        Mockito.doReturn(employeesAfterStart).when(employeeRepository).
                findByStartDateAfter(currentDateTest);

        Assert.assertTrue(testingObject.findByStartDateAfter(currentDateTest).
                get(0).getCountry().equals(Country.MEXICO));
    }

    @Test
    public void testFindByStartDateAfterTotalHolidaysSet() {
        Mockito.doReturn(employeesAfterStart).when(employeeRepository).
                findByStartDateAfter(currentDateTest);

        Assert.assertTrue(testingObject.findByStartDateAfter(currentDateTest).
                get(0).getTotalHolidays() == Integer.parseInt(TestEmployeeEnum.totalHolidays2.toString()));
    }

    @Test
    public void testFindByStartDateAfterEmailSet() {
        Mockito.doReturn(employeesAfterStart).when(employeeRepository).
                findByStartDateAfter(currentDateTest);

        Assert.assertTrue(testingObject.findByStartDateAfter(currentDateTest).
                get(0).getEmail().equals(TestEmployeeEnum.email2.toString()));
    }

    @Test
    public void testFindByStartDateAfterAdminSet() {
        Mockito.doReturn(employeesAfterStart).when(employeeRepository).
                findByStartDateAfter(currentDateTest);

        Assert.assertTrue(testingObject.findByStartDateAfter(currentDateTest).
                get(0).getEmployeeRole() == EmployeeRole.SYSTEM_ADMINISTRATOR);
    }

    @Test
    public void testFindByStartDateAfterActiveSet() {
        Mockito.doReturn(employeesAfterStart).when(employeeRepository).
                findByStartDateAfter(currentDateTest);

        Assert.assertTrue(testingObject.findByStartDateAfter(currentDateTest).
                get(0).getEmployeeStatus() == EmployeeStatus.ACTIVE);
    }
    //endregion

    //region findByStartDateBeforeOrStartDateIs tests
    @Test
    public void testFindByStartDateBeforeOrStartDateFornameSet() {
        Mockito.doReturn(employeesBeforeStart).when(employeeRepository).
                findByStartDateBefore(any(LocalDate.class));

        Assert.assertTrue(testingObject.findByStartDateBefore(currentDateTest).
                get(0).getForename().equals(TestEmployeeEnum.forename.toString()));
    }

    @Test
    public void testFindByStartDateBeforeOrStartDateSurnameSet() {
        Mockito.doReturn(employeesBeforeStart).when(employeeRepository).
                findByStartDateBefore(any(LocalDate.class));

        Assert.assertTrue(testingObject.findByStartDateBefore(currentDateTest).
                get(0).getSurname().equals(TestEmployeeEnum.surname.toString()));
    }

    @Test
    public void testFindByStartDateBeforeOrStartDateCountrySet() {
        Mockito.doReturn(employeesBeforeStart).when(employeeRepository).
                findByStartDateBefore(any(LocalDate.class));

        Assert.assertTrue(testingObject.findByStartDateBefore(currentDateTest).
                get(0).getCountry().equals(Country.NORTHERN_IRELAND));
    }

    @Test
    public void testFindByStartDateBeforeOrStartDateHolidaysSet() {
        Mockito.doReturn(employeesBeforeStart).when(employeeRepository).
                findByStartDateBefore(any(LocalDate.class));

        Assert.assertTrue(testingObject.findByStartDateBefore(currentDateTest).
                get(0).getTotalHolidays() == Integer.parseInt(TestEmployeeEnum.totalHolidays.toString()));
    }

    @Test
    public void testFindByStartDateBeforeOrStartDateEmailSet() {
        Mockito.doReturn(employeesBeforeStart).when(employeeRepository).
                findByStartDateBefore(any(LocalDate.class));

        Assert.assertTrue(testingObject.findByStartDateBefore(currentDateTest).
                get(0).getEmail().equals(TestEmployeeEnum.email.toString()));
    }

    @Test
    public void testFindByStartDateBeforeOrStartDateAdminSet() {
        Mockito.doReturn(employeesBeforeStart).when(employeeRepository).
                findByStartDateBefore(any(LocalDate.class));

        Assert.assertTrue(testingObject.findByStartDateBefore(currentDateTest).
                get(0).getEmployeeRole() == EmployeeRole.SYSTEM_ADMINISTRATOR);
    }

    @Test
    public void testFindByStartDateBeforeOrStartDateActiveSet() {
        Mockito.doReturn(employeesBeforeStart).when(employeeRepository).
                findByStartDateBefore(any(LocalDate.class));

        Assert.assertTrue(testingObject.findByStartDateBefore(currentDateTest).
                get(0).getEmployeeStatus() == EmployeeStatus.ACTIVE);
    }
    //endregion

    //region findByCountry tests
    @Test
    public void testFindByCountryFornameSet() {
        Mockito.doReturn(employees).when(employeeRepository).
                findByCountry(Country.NORTHERN_IRELAND);

        Assert.assertTrue(testingObject.findByCountry(Country.NORTHERN_IRELAND).
                get(0).getForename().equals(TestEmployeeEnum.forename.toString()));
    }

    @Test
    public void testFindByCountrySurnameSet() {
        Mockito.doReturn(employees).when(employeeRepository).
                findByCountry(Country.NORTHERN_IRELAND);

        Assert.assertTrue(testingObject.findByCountry(Country.NORTHERN_IRELAND).
                get(0).getSurname().equals(TestEmployeeEnum.surname.toString()));
    }

    @Test
    public void testFindByCountryCountrySet() {
        Mockito.doReturn(employees).when(employeeRepository).
                findByCountry(Country.NORTHERN_IRELAND);

        Assert.assertTrue(testingObject.findByCountry(Country.NORTHERN_IRELAND).
                get(0).getCountry().equals(Country.NORTHERN_IRELAND));
    }

    @Test
    public void testFindByCountryHolidaysSet() {
        Mockito.doReturn(employees).when(employeeRepository).
                findByCountry(Country.NORTHERN_IRELAND);

        Assert.assertTrue(testingObject.findByCountry(Country.NORTHERN_IRELAND).
                get(0).getTotalHolidays() == Integer.parseInt(TestEmployeeEnum.totalHolidays.toString()));
    }

    @Test
    public void testFindByCountryEmailSet() {
        Mockito.doReturn(employees).when(employeeRepository).
                findByCountry(Country.NORTHERN_IRELAND);

        Assert.assertTrue(testingObject.findByCountry(Country.NORTHERN_IRELAND).
                get(0).getEmail().equals(TestEmployeeEnum.email.toString()));
    }

    @Test
    public void testFindByCountryAdminSet() {
        Mockito.doReturn(employees).when(employeeRepository).
                findByCountry(Country.NORTHERN_IRELAND);

        Assert.assertTrue(testingObject.findByCountry(Country.NORTHERN_IRELAND).
                get(0).getEmployeeRole() == EmployeeRole.SYSTEM_ADMINISTRATOR);
    }

    @Test
    public void testFindByCountryActiveSet() {
        Mockito.doReturn(employees).when(employeeRepository).
                findByCountry(Country.NORTHERN_IRELAND);

        Assert.assertTrue(testingObject.findByCountry(Country.NORTHERN_IRELAND).
                get(0).getEmployeeStatus() == EmployeeStatus.ACTIVE);
    }
    //endregion

    //region findByEmail tests
    @Test
    public void testFindByEmailFornameSet() {
        Mockito.doReturn(employeeStartDateBeforeToday).when(employeeRepository).
                findByEmailIgnoreCase(TestEmployeeEnum.email.toString());

        Assert.assertTrue(testingObject.findByEmail(TestEmployeeEnum.email.toString()).
                getForename().equals(TestEmployeeEnum.forename.toString()));
    }

    @Test
    public void testFindByEmailSurnameSet() {
        Mockito.doReturn(employeeStartDateBeforeToday).when(employeeRepository).
                findByEmailIgnoreCase(TestEmployeeEnum.email.toString());

        Assert.assertTrue(testingObject.findByEmail(TestEmployeeEnum.email.toString()).
                getSurname().equals(TestEmployeeEnum.surname.toString()));
    }

    @Test
    public void testFindByEmailCountrySet() {
        Mockito.doReturn(employeeStartDateBeforeToday).when(employeeRepository).
                findByEmailIgnoreCase(TestEmployeeEnum.email.toString());

        Assert.assertTrue(testingObject.findByEmail(TestEmployeeEnum.email.toString()).
                getCountry().equals(Country.NORTHERN_IRELAND));
    }

    @Test
    public void testFindByEmailHolidaysSet() {
        Mockito.doReturn(employeeStartDateBeforeToday).when(employeeRepository).
                findByEmailIgnoreCase(TestEmployeeEnum.email.toString());

        Assert.assertTrue(testingObject.findByEmail(TestEmployeeEnum.email.toString()).
                getTotalHolidays() == Integer.parseInt(TestEmployeeEnum.totalHolidays.toString()));
    }

    @Test
    public void testFindByEmailEmailSet() {
        Mockito.doReturn(employeeStartDateBeforeToday).when(employeeRepository).
                findByEmailIgnoreCase(TestEmployeeEnum.email.toString());

        Assert.assertTrue(testingObject.findByEmail(TestEmployeeEnum.email.toString()).
                getEmail().equals(TestEmployeeEnum.email.toString()));
    }

    @Test
    public void testFindByEmailAdminSet() {
        Mockito.doReturn(employees).when(employeeRepository).
                findByCountry(Country.NORTHERN_IRELAND);

        Assert.assertTrue(testingObject.findByCountry(Country.NORTHERN_IRELAND).
                get(0).getEmployeeRole() == EmployeeRole.SYSTEM_ADMINISTRATOR);
    }

    @Test
    public void testFindByEmailActiveSet() {
        Mockito.doReturn(employeeStartDateBeforeToday).when(employeeRepository).
                findByEmailIgnoreCase(TestEmployeeEnum.email.toString());

        Assert.assertTrue(testingObject.findByEmail(TestEmployeeEnum.email.toString()).
                getEmployeeStatus() == EmployeeStatus.ACTIVE);
    }
    //endregion

    @Test
    public void TestCreateNewEmployeeUserMethodSuccess() {
        Mockito.doReturn(employeeStartDateBeforeToday).when(employeeRepository).save(any(Employee.class));
        Mockito.doReturn(TestEmployeeEnum.passwordEncrypted.toString()).when(passwordEncoder).encode(any(String.class));
        Mockito.doReturn(getMockHolidays()).when(holidayRepository).findByEmployee_EmployeeId(any(Integer.class));

        SignUpRequest request = new SignUpRequest(
                employeeStartDateBeforeToday.getForename(), employeeStartDateBeforeToday.getSurname(),
                TestEmployeeEnum.signupEmail.toString(), TestEmployeeEnum.passwordDecrypted.toString(),
                employeeStartDateBeforeToday.getCountry(), employeeStartDateBeforeToday.getEmployeeStatus(),
                employeeStartDateBeforeToday.getEmployeeRole(), employeeStartDateBeforeToday.getStartDate());

        Employee createdUser = testingObject.createNewEmployeeUser(request);
        Assert.assertTrue(createdUser.getPassword() == TestEmployeeEnum.passwordEncrypted.toString());
    }

    @Test
    public void TestJwtSignInUserMethodSuccess() {
        Authentication auth = new Authentication() {
            @Override
            public Collection<? extends GrantedAuthority> getAuthorities() {
                return null;
            }

            @Override
            public Object getCredentials() {
                return null;
            }

            @Override
            public Object getDetails() {
                return null;
            }

            @Override
            public Object getPrincipal() {
                return null;
            }

            @Override
            public boolean isAuthenticated() {
                return true;
            }

            @Override
            public void setAuthenticated(boolean b) throws IllegalArgumentException {

            }

            @Override
            public String getName() {
                return null;
            }
        };

        Mockito.doReturn(auth).when(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
        Mockito.doReturn("authcode").when(tokenProvider).generateToken(any(Authentication.class));

        Assert.assertTrue(testingObject.jwtSignIn(
                new LoginRequest("email@email.com", "password")).equals("authcode"));
    }
}
