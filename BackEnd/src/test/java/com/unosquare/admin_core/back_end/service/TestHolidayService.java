package com.unosquare.admin_core.back_end.service;

import com.unosquare.admin_core.back_end.entity.Employee;
import com.unosquare.admin_core.back_end.entity.Holiday;
import com.unosquare.admin_core.back_end.entity.MandatoryHoliday;
import com.unosquare.admin_core.back_end.enums.Country;
import com.unosquare.admin_core.back_end.enums.EmployeeRole;
import com.unosquare.admin_core.back_end.enums.EmployeeStatus;
import com.unosquare.admin_core.back_end.enums.HolidayStatus;
import com.unosquare.admin_core.back_end.repository.HolidayRepository;
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
public class TestHolidayService {

    @InjectMocks
    private HolidayService testingObject;

    private Holiday holidayBeforeToday;

    private Employee employee;

    private com.unosquare.admin_core.back_end.entity.HolidayStatus holidayStatusEntity;

    private com.unosquare.admin_core.back_end.entity.EmployeeRole employeeRoleEntity;

    private com.unosquare.admin_core.back_end.entity.EmployeeStatus employeeStatusEntity;

    private com.unosquare.admin_core.back_end.entity.Country countryEntity;

    private List<Holiday> allHolidays;
    private List<Holiday> holidaysBeforeToday;
    private List<Holiday> holidaysAfterToday;

    private int year = LocalDate.now().getYear();
    private LocalDate currentDateTest = LocalDate.of(year, 6, 6);

    private final LocalDate pastDate = currentDateTest.minusMonths(1);
    private final LocalDate futureDate = currentDateTest.plusMonths(1);

    @Mock
    private HolidayRepository holidayRepository;

    @Mock
    private MandatoryHolidayService mandatoryHolidayService;

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
        holidayBeforeToday = new Holiday();
        holidayBeforeToday.setHolidayId(Integer.parseInt(TestHolidayEnum.holidayId1.toString()));
        holidayBeforeToday.setDateCreated(pastDate);
        holidayBeforeToday.setStartDate(pastDate);
        holidayBeforeToday.setEndDate(pastDate);
        holidayBeforeToday.setHalfDay(false);
        holidayBeforeToday.setLastModified(pastDate);
        holidayBeforeToday.setHolidayStatus(holidayStatusEntity);
        holidayBeforeToday.setEmployee(employee);

        Holiday holidayAfterToday = new Holiday();
        holidayAfterToday.setHolidayId(Integer.parseInt(TestHolidayEnum.holidayId1.toString()));
        holidayAfterToday.setDateCreated(futureDate);
        holidayAfterToday.setStartDate(futureDate);
        holidayAfterToday.setEndDate(futureDate);
        holidayAfterToday.setLastModified(futureDate);
        holidayAfterToday.setHolidayStatus(holidayStatusEntity);
        holidayAfterToday.setEmployee(employee);
        holidayBeforeToday.setHalfDay(false);
        allHolidays = asList(holidayBeforeToday, holidayAfterToday);
        holidaysAfterToday = Collections.singletonList(holidayAfterToday);
        holidaysBeforeToday = Collections.singletonList(holidayBeforeToday);
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
        Mockito.doReturn(Optional.of(holidayBeforeToday)).when(holidayRepository).findById(1);
        assertEquals(testingObject.findById(1).getHolidayStatus().getHolidayStatusId(), HolidayStatus.AWAITING_APPROVAL.getHolidayStatusId());
    }

    @Test
    public void testFindByIdDateCreatedSet() {
        Mockito.doReturn(Optional.of(holidayBeforeToday)).when(holidayRepository).findById(1);
        assertEquals(testingObject.findById(1).getDateCreated(), pastDate);
    }

    @Test
    public void testFindByIdStartDateSet() {
        Mockito.doReturn(Optional.of(holidayBeforeToday)).when(holidayRepository).findById(1);
        assertEquals(testingObject.findById(1).getStartDate(), pastDate);
    }

    @Test
    public void testFindByIdEmployeeSet() {
        Mockito.doReturn(Optional.of(holidayBeforeToday)).when(holidayRepository).findById(1);
        assertEquals(testingObject.findById(1).getEmployee().getEmployeeId(), employee.getEmployeeId());
    }
    //endregion

    @Test
    public void testSaveMethod() {
//        testingObject.save(holidayBeforeToday);
    }

    @Test
    public void testSaveMultipleMethod() {
        testingObject.saveMultiple(allHolidays);
    }

    @Test
    public void testFindAll() {
        Mockito.doReturn(allHolidays).when(holidayRepository).findAll();
        Assert.assertEquals(2, testingObject.findAll().size());
    }

    @Test
    public void testAddMandatoryHolidaysForNewEmployee() {
        Mockito.doReturn(Collections.singletonList(new MandatoryHoliday(currentDateTest, employee.getCountry()))).
                when(mandatoryHolidayService).findMandatoryHolidaysByCountryIdAfterStartDate(anyShort(), any(LocalDate.class));

        testingObject.addMandatoryHolidaysForNewEmployee(employee);
    }

    @Test
    public void testFindByStartDateAfter() {

        Mockito.doReturn(holidaysAfterToday).
                when(holidayRepository).findByStartDateAfter(currentDateTest);

        Assert.assertArrayEquals(testingObject.findByDateAfter(currentDateTest).toArray(),
                holidaysAfterToday.toArray());
    }

    @Test
    public void testFindByEndDateBeforeOrToday() {

        Mockito.doReturn(holidaysBeforeToday).
                when(holidayRepository).findByStartDateBefore(any(LocalDate.class));

        Assert.assertArrayEquals(testingObject.findByDateBefore(currentDateTest).toArray(),
                holidaysBeforeToday.toArray());
    }

    @Test
    public void testFindByStartDateBetween() {

        Mockito.doReturn(holidaysAfterToday).
                when(holidayRepository).findByStartDateBetween(currentDateTest, currentDateTest.plusMonths(2));

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
