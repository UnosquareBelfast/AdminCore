//package com.unosquare.admin_core.back_end.service;
//
//import com.unosquare.admin_core.back_end.entity.Employee;
//import com.unosquare.admin_core.back_end.entity.Event;
//import com.unosquare.admin_core.back_end.enums.Country;
//import com.unosquare.admin_core.back_end.enums.EmployeeRole;
//import com.unosquare.admin_core.back_end.enums.EmployeeStatus;
//import com.unosquare.admin_core.back_end.enums.HolidayStatus;
//import com.unosquare.admin_core.back_end.payload.LoginRequest;
//import com.unosquare.admin_core.back_end.payload.SignUpRequest;
//import com.unosquare.admin_core.back_end.repository.EmployeeRepository;
//import com.unosquare.admin_core.back_end.repository.EventRepository;
//import com.unosquare.admin_core.back_end.security.JwtTokenProvider;
//import com.unosquare.admin_core.back_end.service.enums.TestEmployeeEnum;
//import org.junit.Assert;
//import org.junit.Before;
//import org.junit.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.Mockito;
//import org.mockito.MockitoAnnotations;
//import org.springframework.context.annotation.ComponentScan;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//import java.time.LocalDate;
//import java.util.*;
//
//import static java.util.Arrays.asList;
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.ArgumentMatchers.isA;
//import static org.mockito.Mockito.doNothing;
//
//@ComponentScan("com.unosquare.admin_core")
//public class TestEmployeeService {
//
//    @InjectMocks
//    private EmployeeService testingObject;
//
//    private Employee employeeStartDateBeforeToday;
//    private List<Employee> employees;
//
//    private List<Employee> employeesAfterStart;
//    private List<Employee> employeesBeforeStart;
//
//    private int year = LocalDate.now().getYear();
//    private LocalDate currentDateTest = LocalDate.of(year, 6, 6);
//
//    private LocalDate pastDate = currentDateTest.minusMonths(1);
//    private LocalDate futureDate = currentDateTest.plusMonths(1);
//
//    private com.unosquare.admin_core.back_end.entity.HolidayStatus holidayStatusEntity;
//
//    private com.unosquare.admin_core.back_end.entity.EmployeeRole employeeRoleEntity;
//
//    private com.unosquare.admin_core.back_end.entity.EmployeeStatus employeeStatusEntity;
//
//    private com.unosquare.admin_core.back_end.entity.Country countryEntity;
//
//    @Mock
//    private EventService eventService;
//
//    @Mock
//    private EmployeeRepository employeeRepository;
//
//    @Mock
//    private EventRepository eventRepository;
//
//    @Mock
//    private
//    PasswordEncoder passwordEncoder;
//
//    @Mock
//    private
//    AuthenticationManager authenticationManager;
//
//    @Mock
//    private
//    JwtTokenProvider tokenProvider;
//
//    private void initCountryEntity(){
//        countryEntity = new com.unosquare.admin_core.back_end.entity.Country();
//        countryEntity.setCountryId(Country.NORTHERN_IRELAND.getCountryId());
//        countryEntity.setDescription(Country.NORTHERN_IRELAND.getDescription());
//    }
//
//    private void initHolidayStatusEntity(){
//        holidayStatusEntity = new com.unosquare.admin_core.back_end.entity.HolidayStatus();
//        holidayStatusEntity.setHolidayStatusId(HolidayStatus.AWAITING_APPROVAL.getHolidayStatusId());
//        holidayStatusEntity.setDescription(HolidayStatus.AWAITING_APPROVAL.getDescription());
//    }
//
//    private void initEmployeeRoleEntity(){
//        employeeRoleEntity = new com.unosquare.admin_core.back_end.entity.EmployeeRole();
//        employeeRoleEntity.setEmployeeRoleId(EmployeeRole.SYSTEM_ADMINISTRATOR.getEmployeeRoleId());
//        employeeRoleEntity.setDescription(EmployeeRole.SYSTEM_ADMINISTRATOR.getDescription());
//    }
//
//    private void initEmployeeStatusEntity(){
//        employeeStatusEntity = new com.unosquare.admin_core.back_end.entity.EmployeeStatus();
//        employeeStatusEntity.setEmployeeStatusId(EmployeeStatus.ACTIVE.getEmployeeStatusId());
//        employeeStatusEntity.setDescription(EmployeeStatus.ACTIVE.getDescription());
//    }
//
//    private void initEmployees(){
//
//        employeeStartDateBeforeToday = new Employee();
//        employeeStartDateBeforeToday.setForename(TestEmployeeEnum.forename.toString());
//        employeeStartDateBeforeToday.setSurname(TestEmployeeEnum.surname.toString());
//        employeeStartDateBeforeToday.setEmployeeStatus(employeeStatusEntity);
//        employeeStartDateBeforeToday.setEmployeeRole(employeeRoleEntity);
//        employeeStartDateBeforeToday.setCountry(countryEntity);
//        employeeStartDateBeforeToday.setEmail(TestEmployeeEnum.email.toString());
//        employeeStartDateBeforeToday.setTotalHolidays(Short.valueOf(TestEmployeeEnum.totalHolidays.toString()));
//        employeeStartDateBeforeToday.setEmployeeId(Integer.valueOf(TestEmployeeEnum.employeeId.toString()));
//        employeeStartDateBeforeToday.setStartDate(pastDate);
//        employeeStartDateBeforeToday.setPassword(TestEmployeeEnum.passwordEncrypted.toString());
//
//        Employee employeeStartDateAfterToday = new Employee();
//        employeeStartDateAfterToday.setForename(TestEmployeeEnum.forename2.toString());
//        employeeStartDateAfterToday.setSurname(TestEmployeeEnum.surname2.toString());
//        employeeStartDateAfterToday.setEmployeeStatus(employeeStatusEntity);
//        employeeStartDateAfterToday.setEmployeeRole(employeeRoleEntity);
//        employeeStartDateAfterToday.setCountry(countryEntity);
//        employeeStartDateAfterToday.setEmail(TestEmployeeEnum.email2.toString());
//        employeeStartDateAfterToday.setTotalHolidays(Short.valueOf(TestEmployeeEnum.totalHolidays2.toString()));
//        employeeStartDateAfterToday.setEmployeeId(Integer.valueOf(TestEmployeeEnum.employeeId2.toString()));
//        employeeStartDateAfterToday.setStartDate(futureDate);
//        employeeStartDateAfterToday.setPassword(TestEmployeeEnum.passwordEncrypted.toString());
//
//        employees = asList(employeeStartDateBeforeToday, employeeStartDateAfterToday);
//        employeesAfterStart = Collections.singletonList(employeeStartDateAfterToday);
//        employeesBeforeStart = Collections.singletonList(employeeStartDateBeforeToday);
//    }
//
//    @Before
//    public void initMocks() {
//
//        MockitoAnnotations.initMocks(this);
//
//        initCountryEntity();
//        initEmployeeRoleEntity();
//        initEmployeeStatusEntity();
//        initHolidayStatusEntity();
//        initEmployees();
//    }
//
//    //region findById tests
//    @Test
//    public void testFindByIdEmployeeFornameSet() {
//        Mockito.doReturn(Optional.of(employeeStartDateBeforeToday)).when(employeeRepository).findById(1);
//        Assert.assertEquals(testingObject.findById(1).getForename(), TestEmployeeEnum.forename.toString());
//    }
//
//    @Test
//    public void testFindByIdEmployeeSurnameSet() {
//        Mockito.doReturn(Optional.of(employeeStartDateBeforeToday)).when(employeeRepository).findById(1);
//        Assert.assertEquals(testingObject.findById(1).getSurname(), TestEmployeeEnum.surname.toString());
//    }
//
//    @Test
//    public void testFindByIdEmployeeCountrySet() {
//        Mockito.doReturn(Optional.of(employeeStartDateBeforeToday)).when(employeeRepository).findById(1);
//        Assert.assertEquals(testingObject.findById(1).getCountry().getCountryId(), Country.NORTHERN_IRELAND.getCountryId());
//    }
//
//    @Test
//    public void testFindByIdEmployeeTotalHolidaysSet() {
//        Mockito.doReturn(Optional.of(employeeStartDateBeforeToday)).when(employeeRepository).findById(1);
//        Assert.assertEquals(testingObject.findById(1).getTotalHolidays(), (int) (Integer.valueOf(TestEmployeeEnum.totalHolidays.toString())));
//    }
//
//    @Test
//    public void testFindByIdEmployeeEmailSet() {
//        Mockito.doReturn(Optional.of(employeeStartDateBeforeToday)).when(employeeRepository).findById(1);
//        Assert.assertEquals(testingObject.findById(1).getEmail(), TestEmployeeEnum.email.toString());
//    }
//
//    @Test
//    public void testFindByIdEmployeeAdminSet() {
//        Mockito.doReturn(Optional.of(employeeStartDateBeforeToday)).when(employeeRepository).findById(1);
//        Assert.assertEquals(testingObject.findById(1).getEmployeeStatus().getEmployeeStatusId(), (EmployeeStatus.ACTIVE.getEmployeeStatusId()));
//    }
//
//    @Test
//    public void testFindByIdEmployeeActiveSet() {
//        Mockito.doReturn(Optional.of(employeeStartDateBeforeToday)).when(employeeRepository).findById(1);
//        Assert.assertEquals(testingObject.findById(1).getEmployeeRole().getEmployeeRoleId(), EmployeeRole.SYSTEM_ADMINISTRATOR.getEmployeeRoleId());
//    }
//    //endregion
//
//    @Test
//    public void TestSaveMethod() {
//        Mockito.doReturn(employeeStartDateBeforeToday).when(employeeRepository).save(employeeStartDateBeforeToday);
//        testingObject.save(employeeStartDateBeforeToday);
//    }
//
//    @Test
//    public void TestUpdateTotalHolidays() {
//        List<Event> events = getMockEvents();
////        Mockito.doReturn(holidays).when(holidayRepository).findByEmployeeId(employeeStartDateBeforeToday.getEmployeeId());
//        Mockito.doReturn(employeeStartDateBeforeToday).when(employeeRepository).save(employeeStartDateBeforeToday);
//        testingObject.updateTotalHolidayForNewEmployee(employeeStartDateBeforeToday);
//        Assert.assertTrue(employeeStartDateBeforeToday.getTotalHolidays() < 33);
//    }
//
//    @Test
//    public void TestUpdateTotalHolidaysSameYear() {
//        List<Event> events = getMockEvents();
//        employeeStartDateBeforeToday.setStartDate(currentDateTest);
////        Mockito.doReturn(holidays).when(holidayRepository).findByEmployeeId(employeeStartDateBeforeToday.getEmployeeId());
//        Mockito.doReturn(employeeStartDateBeforeToday).when(employeeRepository).save(employeeStartDateBeforeToday);
//        testingObject.updateTotalHolidayForNewEmployee(employeeStartDateBeforeToday);
//        Assert.assertTrue(employeeStartDateBeforeToday.getTotalHolidays() < 32);
//    }
//
//    @Test
//    public void TestFindAll() {
//        List<Employee> listOfAllClients = new ArrayList<>();
//        listOfAllClients.add(employeeStartDateBeforeToday);
//        listOfAllClients.add(employeeStartDateBeforeToday);
//        Mockito.doReturn(listOfAllClients).when(employeeRepository).findAll();
//        Assert.assertEquals(2, testingObject.findAll().size());
//    }
//
//    private List<Event> getMockEvents() {
//        Event holiday = new Event();
//        List events = new ArrayList<>();
//        events.add(holiday);
//        events.add(holiday);
//        return events;
//    }
//
//    //region findByForenameAndSurname tests
//    @Test
//    public void testFindByForenameAndSurnameFornameSet() {
//        Mockito.doReturn(employees).when(employeeRepository).
//                findByForenameIgnoreCaseAndSurnameIgnoreCase(TestEmployeeEnum.forename.toString(), TestEmployeeEnum.surname.toString());
//
//        Assert.assertEquals(testingObject.findByForenameAndSurname(TestEmployeeEnum.forename.toString(), TestEmployeeEnum.surname.toString()).
//                get(0).getForename(), TestEmployeeEnum.forename.toString());
//    }
//
//    @Test
//    public void testFindByForenameAndSurnameSurnameSet() {
//        Mockito.doReturn(employees).when(employeeRepository).
//                findByForenameIgnoreCaseAndSurnameIgnoreCase(TestEmployeeEnum.forename.toString(), TestEmployeeEnum.surname.toString());
//
//        Assert.assertEquals(testingObject.findByForenameAndSurname(TestEmployeeEnum.forename.toString(), TestEmployeeEnum.surname.toString()).
//                get(0).getSurname(), TestEmployeeEnum.surname.toString());
//    }
//
//    @Test
//    public void testFindByForenameAndSurnameCountrySet() {
//        Mockito.doReturn(employees).when(employeeRepository).
//                findByForenameIgnoreCaseAndSurnameIgnoreCase(TestEmployeeEnum.forename.toString(), TestEmployeeEnum.surname.toString());
//
//        Assert.assertEquals(testingObject.findByForenameAndSurname(TestEmployeeEnum.forename.toString(), TestEmployeeEnum.surname.toString()).
//                get(0).getCountry().getCountryId(), Country.NORTHERN_IRELAND.getCountryId());
//    }
//
//    @Test
//    public void testFindByForenameAndSurnameTotalHolidaysSet() {
//        Mockito.doReturn(employees).when(employeeRepository).
//                findByForenameIgnoreCaseAndSurnameIgnoreCase(TestEmployeeEnum.forename.toString(), TestEmployeeEnum.surname.toString());
//
//        Assert.assertEquals(testingObject.findByForenameAndSurname(TestEmployeeEnum.forename.toString(), TestEmployeeEnum.surname.toString()).
//                get(0).getTotalHolidays(), Integer.parseInt(TestEmployeeEnum.totalHolidays.toString()));
//    }
//
//    @Test
//    public void testFindByForenameAndSurnameEmailSet() {
//        Mockito.doReturn(employees).when(employeeRepository).
//                findByForenameIgnoreCaseAndSurnameIgnoreCase(TestEmployeeEnum.forename.toString(), TestEmployeeEnum.surname.toString());
//
//        Assert.assertEquals(testingObject.findByForenameAndSurname(TestEmployeeEnum.forename.toString(), TestEmployeeEnum.surname.toString()).
//                get(0).getEmail(), TestEmployeeEnum.email.toString());
//    }
//
//    @Test
//    public void testFindByForenameAndSurnameAdminSet() {
//        Mockito.doReturn(employees).when(employeeRepository).
//                findByForenameIgnoreCaseAndSurnameIgnoreCase(TestEmployeeEnum.forename.toString(), TestEmployeeEnum.surname.toString());
//
//        Assert.assertEquals(testingObject.findByForenameAndSurname(TestEmployeeEnum.forename.toString(), TestEmployeeEnum.surname.toString()).
//                get(0).getEmployeeRole().getEmployeeRoleId(), EmployeeRole.SYSTEM_ADMINISTRATOR.getEmployeeRoleId());
//    }
//
//    @Test
//    public void testFindByForenameAndSurnameActiveSet() {
//        Mockito.doReturn(employees).when(employeeRepository).
//                findByForenameIgnoreCaseAndSurnameIgnoreCase(TestEmployeeEnum.forename.toString(), TestEmployeeEnum.surname.toString());
//
//        Assert.assertEquals(testingObject.findByForenameAndSurname(TestEmployeeEnum.forename.toString(), TestEmployeeEnum.surname.toString()).
//                get(0).getEmployeeStatus().getEmployeeStatusId(), EmployeeStatus.ACTIVE.getEmployeeStatusId());
//    }
//    //endregion
//
//    //region findByCountry tests
//    @Test
//    public void testFindByCountryFornameSet() {
////        Mockito.doReturn(employees).when(employeeRepository).
////                findByCountryId(Country.NORTHERN_IRELAND.getCountryId());
////
////        Assert.assertEquals(testingObject.findByCountry(Country.NORTHERN_IRELAND).
////                get(0).getForename(), TestEmployeeEnum.forename.toString());
//    }
//
//    @Test
//    public void testFindByCountrySurnameSet() {
////        Mockito.doReturn(employees).when(employeeRepository).
////                findByCountryId(Country.NORTHERN_IRELAND.getCountryId());
////
////        Assert.assertEquals(testingObject.findByCountry(Country.NORTHERN_IRELAND).
////                get(0).getSurname(), TestEmployeeEnum.surname.toString());
//    }
//
//    @Test
//    public void testFindByCountryCountrySet() {
////        Mockito.doReturn(employees).when(employeeRepository).
////                findByCountryId(Country.NORTHERN_IRELAND.getCountryId());
////
////        Assert.assertEquals(testingObject.findByCountry(Country.NORTHERN_IRELAND).
////                get(0).getCountry().getCountryId(), Country.NORTHERN_IRELAND.getCountryId());
//    }
//
//    @Test
//    public void testFindByCountryHolidaysSet() {
////        Mockito.doReturn(employees).when(employeeRepository).
////                findByCountryId(Country.NORTHERN_IRELAND.getCountryId());
////
////        Assert.assertEquals(testingObject.findByCountry(Country.NORTHERN_IRELAND).
////                get(0).getTotalHolidays(), Integer.parseInt(TestEmployeeEnum.totalHolidays.toString()));
//    }
//
//    @Test
//    public void testFindByCountryEmailSet() {
////        Mockito.doReturn(employees).when(employeeRepository).
////                findByCountryId(Country.NORTHERN_IRELAND.getCountryId());
////
////        Assert.assertEquals(testingObject.findByCountry(Country.NORTHERN_IRELAND).
////                get(0).getEmail(), TestEmployeeEnum.email.toString());
//    }
//
//    @Test
//    public void testFindByCountryAdminSet() {
////        Mockito.doReturn(employees).when(employeeRepository).
////                findByCountryId(Country.NORTHERN_IRELAND.getCountryId());
////
////        Assert.assertEquals(testingObject.findByCountry(Country.NORTHERN_IRELAND).
////                get(0).getEmployeeRole().getEmployeeRoleId(), EmployeeRole.SYSTEM_ADMINISTRATOR.getEmployeeRoleId());
//    }
//
//    @Test
//    public void testFindByCountryActiveSet() {
////        Mockito.doReturn(employees).when(employeeRepository).
////                findByCountryId(Country.NORTHERN_IRELAND.getCountryId());
////
////        Assert.assertEquals(testingObject.findByCountry(Country.NORTHERN_IRELAND).
////                get(0).getEmployeeStatus().getEmployeeStatusId(), EmployeeStatus.ACTIVE.getEmployeeStatusId());
//    }
//    //endregion
//
//    //region findByEmail tests
//    @Test
//    public void testFindByEmailFornameSet() {
////        Mockito.doReturn(employeeStartDateBeforeToday).when(employeeRepository).
////                findByEmailIgnoreCase(TestEmployeeEnum.email.toString());
////
////        Assert.assertEquals(testingObject.findByEmail(TestEmployeeEnum.email.toString()).
////                getForename(), TestEmployeeEnum.forename.toString());
//    }
//
//    @Test
//    public void testFindByEmailSurnameSet() {
//        Mockito.doReturn(employeeStartDateBeforeToday).when(employeeRepository).
//                findByEmailIgnoreCase(TestEmployeeEnum.email.toString());
//
//        Assert.assertEquals(testingObject.findByEmail(TestEmployeeEnum.email.toString()).
//                getSurname(), TestEmployeeEnum.surname.toString());
//    }
//
//    @Test
//    public void testFindByEmailCountrySet() {
//        Mockito.doReturn(employeeStartDateBeforeToday).when(employeeRepository).
//                findByEmailIgnoreCase(TestEmployeeEnum.email.toString());
//
//        Assert.assertEquals(testingObject.findByEmail(TestEmployeeEnum.email.toString()).
//                getCountry().getCountryId(), Country.NORTHERN_IRELAND.getCountryId());
//    }
//
//    @Test
//    public void testFindByEmailHolidaysSet() {
//        Mockito.doReturn(employeeStartDateBeforeToday).when(employeeRepository).
//                findByEmailIgnoreCase(TestEmployeeEnum.email.toString());
//
//        Assert.assertEquals(testingObject.findByEmail(TestEmployeeEnum.email.toString()).
//                getTotalHolidays(), Integer.parseInt(TestEmployeeEnum.totalHolidays.toString()));
//    }
//
//    @Test
//    public void testFindByEmailEmailSet() {
//        Mockito.doReturn(employeeStartDateBeforeToday).when(employeeRepository).
//                findByEmailIgnoreCase(TestEmployeeEnum.email.toString());
//
//        Assert.assertEquals(testingObject.findByEmail(TestEmployeeEnum.email.toString()).
//                getEmail(), TestEmployeeEnum.email.toString());
//    }
//
//    @Test
//    public void testFindByEmailAdminSet() {
//       /* Mockito.doReturn(employees).when(employeeRepository).
//                findByCountryId(Country.NORTHERN_IRELAND.getCountryId());
//
//        Assert.assertEquals(testingObject.findByCountry(Country.NORTHERN_IRELAND).
//                get(0).getEmployeeRole().getEmployeeRoleId(), EmployeeRole.SYSTEM_ADMINISTRATOR.getEmployeeRoleId());*/
//    }
//
//    @Test
//    public void testFindByEmailActiveSet() {
//        Mockito.doReturn(employeeStartDateBeforeToday).when(employeeRepository).
//                findByEmailIgnoreCase(TestEmployeeEnum.email.toString());
//
//        Assert.assertEquals(testingObject.findByEmail(TestEmployeeEnum.email.toString()).
//                getEmployeeStatus().getEmployeeStatusId(), EmployeeStatus.ACTIVE.getEmployeeStatusId());
//    }
//    //endregion
//
//    @Test
//    public void TestCreateNewEmployeeUserMethodSuccess() {
////        doNothing().when(holidayService).addMandatoryHolidaysForNewEmployee(isA(Employee.class));
////        Mockito.doReturn(employeeStartDateBeforeToday).when(employeeRepository).save(any(Employee.class));
////        Mockito.doReturn(TestEmployeeEnum.passwordEncrypted.toString()).when(passwordEncoder).encode(any(String.class));
//////        Mockito.doReturn(getMockHolidays()).when(holidayRepository).findByEmployeeId(any(Integer.class));
////
////        SignUpRequest request = new SignUpRequest(
////                employeeStartDateBeforeToday.getForename(), employeeStartDateBeforeToday.getSurname(),
////                TestEmployeeEnum.signupEmail.toString(), TestEmployeeEnum.passwordDecrypted.toString(),
////                employeeStartDateBeforeToday.getCountry().getCountryId(), employeeStartDateBeforeToday.getEmployeeStatus().getEmployeeStatusId(),
////                employeeStartDateBeforeToday.getEmployeeRole().getEmployeeRoleId(), employeeStartDateBeforeToday.getStartDate());
////
////        Employee createdUser = testingObject.createNewEmployeeUser(request);
////
////        Assert.assertSame(createdUser.getPassword(), TestEmployeeEnum.passwordEncrypted.toString());
//    }
//
//    @Test
//    public void TestJwtSignInUserMethodSuccess() {
//        Authentication auth = new Authentication() {
//            @Override
//            public Collection<? extends GrantedAuthority> getAuthorities() {
//                return null;
//            }
//
//            @Override
//            public Object getCredentials() {
//                return null;
//            }
//
//            @Override
//            public Object getDetails() {
//                return null;
//            }
//
//            @Override
//            public Object getPrincipal() {
//                return null;
//            }
//
//            @Override
//            public boolean isAuthenticated() {
//                return true;
//            }
//
//            @Override
//            public void setAuthenticated(boolean b) throws IllegalArgumentException {
//
//            }
//
//            @Override
//            public String getName() {
//                return null;
//            }
//        };
//
//        Mockito.doReturn(auth).when(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
//        Mockito.doReturn("authcode").when(tokenProvider).generateToken(any(Authentication.class));
//
//        Assert.assertEquals("authcode", testingObject.jwtSignIn(
//                new LoginRequest("email@email.com", "password")));
//    }
//}
