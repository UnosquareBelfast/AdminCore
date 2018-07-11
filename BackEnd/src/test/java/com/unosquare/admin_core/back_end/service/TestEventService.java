package com.unosquare.admin_core.back_end.service;

import com.unosquare.admin_core.back_end.entity.Employee;
import com.unosquare.admin_core.back_end.entity.Event;
import com.unosquare.admin_core.back_end.enums.Country;
import com.unosquare.admin_core.back_end.enums.EmployeeRole;
import com.unosquare.admin_core.back_end.enums.EmployeeStatus;
import com.unosquare.admin_core.back_end.enums.HolidayStatus;
import com.unosquare.admin_core.back_end.repository.EventRepository;
import com.unosquare.admin_core.back_end.service.enums.TestEmployeeEnum;
import com.unosquare.admin_core.back_end.service.enums.TestHolidayEnum;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.context.annotation.ComponentScan;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static java.util.Arrays.asList;
import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyShort;

@ComponentScan("com.unosquare.admin_core")
public class TestEventService {

    @InjectMocks
    private EventService testingObject;

    private Event eventBeforeToday;

    private Employee employee;

    private com.unosquare.admin_core.back_end.entity.HolidayStatus holidayStatusEntity;

    private com.unosquare.admin_core.back_end.entity.EmployeeRole employeeRoleEntity;

    private com.unosquare.admin_core.back_end.entity.EmployeeStatus employeeStatusEntity;

    private com.unosquare.admin_core.back_end.entity.Country countryEntity;

    private List<Event> allHolidays;
    private List<Event> holidaysBeforeToday;
    private List<Event> holidaysAfterToday;

    private int year = LocalDate.now().getYear();
    private LocalDate currentDateTest = LocalDate.of(year, 6, 6);

    private final LocalDate pastDate = currentDateTest.minusMonths(1);
    private final LocalDate futureDate = currentDateTest.plusMonths(1);

    @Mock
    private EventRepository eventRepository;

    @Before
    public void initMocks() {
        MockitoAnnotations.initMocks(this);
        initCountryEntity();
        initHolidayStatusEntity();
        initEmployeeRoleEntity();
        initEmployeeStatusEntity();
        initEmployee();
        initHolidays();
    }

    private void initCountryEntity(){
        countryEntity = new com.unosquare.admin_core.back_end.entity.Country();
        countryEntity.setCountryId(Country.NORTHERN_IRELAND.getCountryId());
        countryEntity.setDescription(Country.NORTHERN_IRELAND.getDescription());
    }

    private void initHolidayStatusEntity(){
        holidayStatusEntity = new com.unosquare.admin_core.back_end.entity.HolidayStatus();
        holidayStatusEntity.setHolidayStatusId(HolidayStatus.AWAITING_APPROVAL.getHolidayStatusId());
        holidayStatusEntity.setDescription(HolidayStatus.AWAITING_APPROVAL.getDescription());
    }

    private void initEmployeeRoleEntity(){
        employeeRoleEntity = new com.unosquare.admin_core.back_end.entity.EmployeeRole();
        employeeRoleEntity.setEmployeeRoleId(EmployeeRole.SYSTEM_ADMINISTRATOR.getEmployeeRoleId());
        employeeRoleEntity.setDescription(EmployeeRole.SYSTEM_ADMINISTRATOR.getDescription());
    }

    private void initEmployeeStatusEntity(){
        employeeStatusEntity = new com.unosquare.admin_core.back_end.entity.EmployeeStatus();
        employeeStatusEntity.setEmployeeStatusId(EmployeeStatus.ACTIVE.getEmployeeStatusId());
        employeeStatusEntity.setDescription(EmployeeStatus.ACTIVE.getDescription());
    }

    private void initHolidays() {
        eventBeforeToday = new Event();
        eventBeforeToday.setEventId(Integer.parseInt(TestHolidayEnum.holidayId1.toString()));
        eventBeforeToday.setDateCreated(pastDate);
        eventBeforeToday.setStartDate(pastDate);
        eventBeforeToday.setEndDate(pastDate);
        eventBeforeToday.setHalfDay(false);
        eventBeforeToday.setLastModified(pastDate);
        eventBeforeToday.setHolidayStatus(holidayStatusEntity);
        eventBeforeToday.setEmployee(employee);

        Event eventAfterToday = new Event();
        eventAfterToday.setEventId(Integer.parseInt(TestHolidayEnum.holidayId1.toString()));
        eventAfterToday.setDateCreated(futureDate);
        eventAfterToday.setStartDate(futureDate);
        eventAfterToday.setEndDate(futureDate);
        eventAfterToday.setLastModified(futureDate);
        eventAfterToday.setHolidayStatus(holidayStatusEntity);
        eventAfterToday.setEmployee(employee);
        eventBeforeToday.setHalfDay(false);
        allHolidays = asList(eventBeforeToday, eventAfterToday);
        holidaysAfterToday = Collections.singletonList(eventAfterToday);
        holidaysBeforeToday = Collections.singletonList(eventBeforeToday);
    }

    private void initEmployee() {
        employee = new Employee();
        employee.setForename(TestEmployeeEnum.forename.toString());
        employee.setSurname(TestEmployeeEnum.surname.toString());
        employee.setEmployeeStatus(employeeStatusEntity);
        employee.setEmployeeRole(employeeRoleEntity);
        employee.setCountry(countryEntity);
        employee.setEmail(TestEmployeeEnum.email.toString());
        employee.setTotalHolidays(Short.valueOf(TestEmployeeEnum.totalHolidays.toString()));
        employee.setEmployeeId(Integer.valueOf(TestEmployeeEnum.employeeId.toString()));
        employee.setStartDate(pastDate);
        employee.setPassword(TestEmployeeEnum.passwordEncrypted.toString());
    }

    //region findById tests
    @Test
    public void testFindByIdStatusSet() {
        Mockito.doReturn(Optional.of(eventBeforeToday)).when(eventRepository).findById(1);
        assertEquals(testingObject.findById(1).getHolidayStatus().getHolidayStatusId(), HolidayStatus.AWAITING_APPROVAL.getHolidayStatusId());
    }

    @Test
    public void testFindByIdDateCreatedSet() {
        Mockito.doReturn(Optional.of(eventBeforeToday)).when(eventRepository).findById(1);
        assertEquals(testingObject.findById(1).getDateCreated(), pastDate);
    }

    @Test
    public void testFindByIdStartDateSet() {
        Mockito.doReturn(Optional.of(eventBeforeToday)).when(eventRepository).findById(1);
        assertEquals(testingObject.findById(1).getStartDate(), pastDate);
    }

    @Test
    public void testFindByIdEmployeeSet() {
        Mockito.doReturn(Optional.of(eventBeforeToday)).when(eventRepository).findById(1);
        assertEquals(testingObject.findById(1).getEmployee().getEmployeeId(), employee.getEmployeeId());
    }
    //endregion

    @Test
    public void testSaveMethod() {
//        testingObject.save(holidayBeforeToday);
    }

    @Test
    public void testFindAll() {
        Mockito.doReturn(allHolidays).when(eventRepository).findAll();
        Assert.assertEquals(2, testingObject.findAll().size());
    }

    @Test
    public void testFindByStartDateBetween() {

        Mockito.doReturn(holidaysAfterToday).
                when(eventRepository).findByStartDateBetween(currentDateTest, currentDateTest.plusMonths(2));

        Assert.assertArrayEquals(testingObject.findByDateBetween(currentDateTest, currentDateTest.plusMonths(2)).toArray(),
                holidaysAfterToday.toArray());
    }

    @Test
    public void testFindByStatus() {

//        Mockito.doReturn(holidaysBeforeToday).
//                when(holidayRepository).findByHolidayStatusId(HolidayStatus.AWAITING_APPROVAL.getHolidayStatusId());

//        Assert.assertArrayEquals(testingObject.findByStatus(HolidayStatus.AWAITING_APPROVAL).toArray(),
//                holidaysBeforeToday.toArray());
    }

    @Test
    public void testFindByStatusAndStartDateAfter() {

//        Mockito.doReturn(holidaysAfterToday).
//                when(holidayRepository).findByHolidayStatusIdAndStartDate(HolidayStatus.AWAITING_APPROVAL.getHolidayStatusId(), currentDateTest);

//        Assert.assertArrayEquals(testingObject.findByStatusAndDateAfter(HolidayStatus.AWAITING_APPROVAL, currentDateTest).toArray(),
//                holidaysAfterToday.toArray());
    }
}
