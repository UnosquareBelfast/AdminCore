package com.unosquare.adminCore.service;

import com.unosquare.adminCore.entity.Employee;
import com.unosquare.adminCore.entity.Holiday;
import com.unosquare.adminCore.entity.MandatoryHoliday;
import com.unosquare.adminCore.enums.Country;
import com.unosquare.adminCore.enums.EmployeeRole;
import com.unosquare.adminCore.enums.EmployeeStatus;
import com.unosquare.adminCore.enums.HolidayStatus;
import com.unosquare.adminCore.repository.HolidayRepository;
import com.unosquare.adminCore.service.enums.TestEmployeeEnum;
import com.unosquare.adminCore.service.enums.TestHolidayEnum;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.context.annotation.ComponentScan;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;

@ComponentScan("com.unosquare.adminCore")
public class TestHolidayService {

    @InjectMocks
    private HolidayService testingObject;

    private Holiday holidayBeforeToday;
    private Holiday holidayAfterToday;

    private Employee employee;

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
        initEmployee();
        initHolidays();
    }

    private void initHolidays() {
        holidayBeforeToday = new Holiday();
        holidayBeforeToday.setHolidayId(Integer.parseInt(TestHolidayEnum.holidayId1.toString()));
        holidayBeforeToday.setDateCreated(pastDate);
        holidayBeforeToday.setDate(pastDate);
        holidayBeforeToday.setHalfDay(false);
        holidayBeforeToday.setLastModified(pastDate);
        holidayBeforeToday.setHolidayStatus(HolidayStatus.awaitingApproval);
        holidayBeforeToday.setEmployee(employee);

        holidayAfterToday = new Holiday();
        holidayAfterToday.setHolidayId(Integer.parseInt(TestHolidayEnum.holidayId1.toString()));
        holidayAfterToday.setDateCreated(futureDate);
        holidayAfterToday.setDate(futureDate);
        holidayAfterToday.setLastModified(futureDate);
        holidayAfterToday.setHolidayStatus(HolidayStatus.awaitingApproval);
        holidayAfterToday.setEmployee(employee);
        holidayBeforeToday.setHalfDay(false);
        allHolidays = Arrays.asList(holidayBeforeToday, holidayAfterToday);
        holidaysAfterToday = Arrays.asList(holidayAfterToday);
        holidaysBeforeToday = Arrays.asList(holidayBeforeToday);
    }

    private void initEmployee() {
        employee = new Employee();
        employee.setForename(TestEmployeeEnum.forename.toString());
        employee.setSurname(TestEmployeeEnum.surname.toString());
        employee.setEmployeeStatus(EmployeeStatus.active);
        employee.setEmployeeRole(EmployeeRole.systemAdministrator);
        employee.setCountry(Country.northernIreland);
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
        Assert.assertTrue(testingObject.findById(1).getHolidayStatus().equals(HolidayStatus.awaitingApproval));
    }

    @Test
    public void testFindByIdDateCreatedSet() {
        Mockito.doReturn(Optional.of(holidayBeforeToday)).when(holidayRepository).findById(1);
        Assert.assertTrue(testingObject.findById(1).getDateCreated().equals(pastDate));
    }

    @Test
    public void testFindByIdStartDateSet() {
        Mockito.doReturn(Optional.of(holidayBeforeToday)).when(holidayRepository).findById(1);
        Assert.assertTrue(testingObject.findById(1).getDate().equals(pastDate));
    }

    @Test
    public void testFindByIdEmployeeSet() {
        Mockito.doReturn(Optional.of(holidayBeforeToday)).when(holidayRepository).findById(1);
        Assert.assertTrue(testingObject.findById(1).getEmployee().equals(employee));
    }
    //endregion

    @Test
    public void testSaveMethod() {
        testingObject.save(holidayBeforeToday);
    }

    @Test
    public void testSaveMultipleMethod() {
        testingObject.saveMultiple(allHolidays);
    }

    @Test
    public void testFindAll() {
        Mockito.doReturn(allHolidays).when(holidayRepository).findAll();
        Assert.assertTrue(testingObject.findAll().size() == 2);
    }

    @Test
    public void testAddMandatoryHolidaysForNewEmployee() {

        LocalDate endOfYear = LocalDate.of(year, 12, 31);

        Mockito.doReturn(Arrays.asList(new MandatoryHoliday(currentDateTest, employee.getCountry()))).
                when(mandatoryHolidayService).findMandatoryHolidaysByCountryAfterStartDate(any(Country.class), any(LocalDate.class));

        testingObject.addMandatoryHolidaysForNewEmployee(employee);
    }

    @Test
    public void testFindByStartDateAfter() {

        Mockito.doReturn(holidaysAfterToday).
                when(holidayRepository).findByDateAfter(currentDateTest);

        Assert.assertArrayEquals(testingObject.findByDateAfter(currentDateTest).toArray(),
                holidaysAfterToday.toArray());
    }

    @Test
    public void testFindByEndDateBeforeOrToday() {

        Mockito.doReturn(holidaysBeforeToday).
                when(holidayRepository).findByDateBefore(any(LocalDate.class));

        Assert.assertArrayEquals(testingObject.findByDateBefore(currentDateTest).toArray(),
                holidaysBeforeToday.toArray());
    }

    @Test
    public void testFindByStartDateBetween() {

        Mockito.doReturn(holidaysAfterToday).
                when(holidayRepository).findByDateBetween(currentDateTest, currentDateTest.plusMonths(2));

        Assert.assertArrayEquals(testingObject.findByDateBetween(currentDateTest, currentDateTest.plusMonths(2)).toArray(),
                holidaysAfterToday.toArray());
    }

    @Test
    public void testFindByStatus() {

        Mockito.doReturn(holidaysBeforeToday).
                when(holidayRepository).findByHolidayStatus(HolidayStatus.awaitingApproval);

        Assert.assertArrayEquals(testingObject.findByStatus(HolidayStatus.awaitingApproval).toArray(),
                holidaysBeforeToday.toArray());
    }

    @Test
    public void testFindByStatusAndStartDateAfter() {

        Mockito.doReturn(holidaysAfterToday).
                when(holidayRepository).findByHolidayStatusAndDateAfter(HolidayStatus.awaitingApproval, currentDateTest);

        Assert.assertArrayEquals(testingObject.findByStatusAndDateAfter(HolidayStatus.awaitingApproval, currentDateTest).toArray(),
                holidaysAfterToday.toArray());
    }
}
