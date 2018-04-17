package com.unosquare.adminCore.service;

import com.unosquare.adminCore.entity.Employee;
import com.unosquare.adminCore.entity.Holiday;
import com.unosquare.adminCore.entity.MandatoryHoliday;
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
        holidayBeforeToday.setStartDate(pastDate);
        holidayBeforeToday.setEndDate(pastDate);
        holidayBeforeToday.setHolidayLength((short) 1);
        holidayBeforeToday.setLastModified(pastDate);
        holidayBeforeToday.setStatus(TestHolidayEnum.status1.toString());
        holidayBeforeToday.setEmployee(employee);

        holidayAfterToday = new Holiday();
        holidayAfterToday.setHolidayId(Integer.parseInt(TestHolidayEnum.holidayId1.toString()));
        holidayAfterToday.setDateCreated(futureDate);
        holidayAfterToday.setStartDate(futureDate);
        holidayAfterToday.setEndDate(futureDate);
        holidayAfterToday.setHolidayLength((short) 1);
        holidayAfterToday.setLastModified(futureDate);
        holidayAfterToday.setStatus(TestHolidayEnum.status1.toString());
        holidayAfterToday.setEmployee(employee);

        allHolidays = Arrays.asList(holidayBeforeToday, holidayAfterToday);
        holidaysAfterToday = Arrays.asList(holidayAfterToday);
        holidaysBeforeToday = Arrays.asList(holidayBeforeToday);
    }

    private void initEmployee() {
        employee = new Employee();
        employee.setForename(TestEmployeeEnum.forename.toString());
        employee.setSurname(TestEmployeeEnum.surname.toString());
        employee.setActive(Boolean.valueOf(TestEmployeeEnum.isActive.toString()));
        employee.setAdmin(Boolean.valueOf(TestEmployeeEnum.isAdmin.toString()));
        employee.setCountry(TestEmployeeEnum.country.toString());
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
        Assert.assertTrue(testingObject.findById(1).getStatus().equals(TestHolidayEnum.status1.toString()));
    }

    @Test
    public void testFindByIdDateCreatedSet() {
        Mockito.doReturn(Optional.of(holidayBeforeToday)).when(holidayRepository).findById(1);
        Assert.assertTrue(testingObject.findById(1).getDateCreated().equals(pastDate));
    }

    @Test
    public void testFindByIdStartDateSet() {
        Mockito.doReturn(Optional.of(holidayBeforeToday)).when(holidayRepository).findById(1);
        Assert.assertTrue(testingObject.findById(1).getStartDate().equals(pastDate));
    }

    @Test
    public void testFindByIdEndDateSet() {
        Mockito.doReturn(Optional.of(holidayBeforeToday)).when(holidayRepository).findById(1);
        Assert.assertTrue(testingObject.findById(1).getEndDate().equals(pastDate));
    }

    @Test
    public void testFindByIdLastModifiedSet() {
        Mockito.doReturn(Optional.of(holidayBeforeToday)).when(holidayRepository).findById(1);
        Assert.assertTrue(testingObject.findById(1).getLastModified().equals(pastDate));
    }

    @Test
    public void testFindByIdHolidayLengthSet() {
        Mockito.doReturn(Optional.of(holidayBeforeToday)).when(holidayRepository).findById(1);
        Assert.assertTrue(testingObject.findById(1).getHolidayLength() == (short) 1);
    }

    @Test
    public void testFindByIdEmployeeSet() {
        Mockito.doReturn(Optional.of(holidayBeforeToday)).when(holidayRepository).findById(1);
        Assert.assertTrue(testingObject.findById(1).getEmployee().equals(employee));
    }
    //endregion

    @Test
    public void testSaveMethod() {
        Mockito.doReturn(holidayBeforeToday).when(holidayRepository).save(holidayBeforeToday);
        testingObject.save(holidayBeforeToday);
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
                when(mandatoryHolidayService).findMandatoryHolidaysByCountryAfterStartDate(any(String.class), any(LocalDate.class));

        testingObject.addMandatoryHolidaysForNewEmployee(employee);
    }

    @Test
    public void testFindByStartDateAfter() {

        Mockito.doReturn(holidaysAfterToday).
                when(holidayRepository).findByStartDateAfter(currentDateTest);

        Assert.assertArrayEquals(testingObject.findByStartDateAfter(currentDateTest).toArray(),
                holidaysAfterToday.toArray());
    }

    @Test
    public void testFindByEndDateBeforeOrToday() {

        Mockito.doReturn(holidaysBeforeToday).
                when(holidayRepository).findByEndDateBefore(any(LocalDate.class));

        Assert.assertArrayEquals(testingObject.findByEndDateBefore(currentDateTest).toArray(),
                holidaysBeforeToday.toArray());
    }

    @Test
    public void testFindByStartDateBetween() {

        Mockito.doReturn(holidaysAfterToday).
                when(holidayRepository).findByStartDateBetween(currentDateTest, currentDateTest.plusMonths(2));

        Assert.assertArrayEquals(testingObject.findByStartDateBetween(currentDateTest, currentDateTest.plusMonths(2)).toArray(),
                holidaysAfterToday.toArray());
    }

    @Test
    public void testFindByStatus() {

        Mockito.doReturn(holidaysBeforeToday).
                when(holidayRepository).findByStatusIgnoreCase(TestHolidayEnum.status1.toString());

        Assert.assertArrayEquals(testingObject.findByStatus(TestHolidayEnum.status1.toString()).toArray(),
                holidaysBeforeToday.toArray());
    }

    @Test
    public void testFindByStatusAndStartDateAfter() {

        Mockito.doReturn(holidaysAfterToday).
                when(holidayRepository).findByStatusIgnoreCaseAndStartDateAfter(TestHolidayEnum.status2.toString(), currentDateTest);

        Assert.assertArrayEquals(testingObject.findByStatusAndStartDateAfter(TestHolidayEnum.status2.toString(), currentDateTest).toArray(),
                holidaysAfterToday.toArray());
    }
}
