package com.unosquare.adminCore.service;

import com.unosquare.adminCore.entity.Client;
import com.unosquare.adminCore.entity.Employee;
import com.unosquare.adminCore.entity.Holiday;
import com.unosquare.adminCore.repository.EmployeeRepository;
import com.unosquare.adminCore.repository.HolidayRepository;
import com.unosquare.adminCore.service.enums.TestClientEnum;
import com.unosquare.adminCore.service.enums.TestEmployeeEnum;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class TestEmployeeService {

    @InjectMocks
    private EmployeeService testingObject;

    private Employee employee;
    @Mock
    private EmployeeRepository employeeRepository;

    @Mock
    private HolidayRepository holidayRepository;

    @Mock
    private HolidayService holidayService;

    @Before
    public void initMocks(){
        MockitoAnnotations.initMocks(this);
        employee = new Employee();
        employee.setForename(TestEmployeeEnum.forename.toString());
        employee.setSurname(TestEmployeeEnum.surname.toString());
        employee.setActive(Boolean.valueOf(TestEmployeeEnum.isActive.toString()));
        employee.setAdmin(Boolean.valueOf(TestEmployeeEnum.isAdmin.toString()));
        employee.setCountry(TestEmployeeEnum.country.toString());
        employee.setEmail(TestEmployeeEnum.email.toString());
        employee.setTotalHolidays(Short.valueOf(TestEmployeeEnum.totalHolidays.toString()));
        employee.setEmployeeId(Integer.valueOf(TestEmployeeEnum.employeeId.toString()));
        employee.setStartDate(LocalDate.of(1999,12,12));
    }

    @Test
    public void testFindByIdEmployeeFornameSet() {
        Mockito.doReturn(Optional.of(employee)).when(employeeRepository).findById(1);
        Assert.assertTrue(testingObject.findById(1).getForename().equals(TestEmployeeEnum.forename.toString()));
    }

    @Test
    public void testFindByIdEmployeeSurnameSet() {
        Mockito.doReturn(Optional.of(employee)).when(employeeRepository).findById(1);
        Assert.assertTrue(testingObject.findById(1).getSurname().equals(TestEmployeeEnum.surname.toString()));
    }

    @Test
    public void testFindByIdEmployeeCountrySet() {
        Mockito.doReturn(Optional.of(employee)).when(employeeRepository).findById(1);
        Assert.assertTrue(testingObject.findById(1).getCountry().equals(TestEmployeeEnum.country.toString()));
    }

    @Test
    public void testFindByIdEmployeeTotalHolidaysSet() {
        Mockito.doReturn(Optional.of(employee)).when(employeeRepository).findById(1);
        Assert.assertTrue(testingObject.findById(1).getTotalHolidays()==(Integer.valueOf(TestEmployeeEnum.totalHolidays.toString())));
    }

    @Test
    public void testFindByIdEmployeeEmailSet() {
        Mockito.doReturn(Optional.of(employee)).when(employeeRepository).findById(1);
        Assert.assertTrue(testingObject.findById(1).getEmail().equals(TestEmployeeEnum.email.toString()));
    }

    @Test
    public void testFindByIdEmployeeAdminSet() {
        Mockito.doReturn(Optional.of(employee)).when(employeeRepository).findById(1);
        Assert.assertTrue(testingObject.findById(1).isActive()==(Boolean.valueOf(TestEmployeeEnum.isAdmin.toString())));
    }

    @Test
    public void testFindByIdEmployeeActiveSet() {
        Mockito.doReturn(Optional.of(employee)).when(employeeRepository).findById(1);
        Assert.assertTrue(testingObject.findById(1).isAdmin()==Boolean.valueOf(TestEmployeeEnum.isActive.toString()));
    }

    @Test
    public void TestSaveMethod() {
       Mockito.doReturn(employee).when(employeeRepository).save(employee);
       testingObject.save(employee);
    }

    @Test
    public void TestUpdateTotalHolidays() {
        List holidays= getMockHolidays();
        Mockito.doReturn(employee).when(holidayService).addMandatoryHolidaysForNewEmployee((employee));
        Mockito.doReturn(holidays).when(holidayRepository).findByEmployee((employee));
        Mockito.doReturn(employee).when(employeeRepository).save(employee);
        testingObject.updateTotalHolidayForNewEmployee(employee);
        Assert.assertTrue(employee.getTotalHolidays()==31);
    }
    @Test
    public void TestUpdateTotalHolidaysSameYear() {
        List holidays= getMockHolidays();
        employee.setStartDate(LocalDate.of(LocalDate.now().getYear(), 3,10));
        Mockito.doReturn(employee).when(holidayService).addMandatoryHolidaysForNewEmployee((employee));
        Mockito.doReturn(holidays).when(holidayRepository).findByEmployee((employee));
        Mockito.doReturn(employee).when(employeeRepository).save(employee);
        testingObject.updateTotalHolidayForNewEmployee(employee);
        Assert.assertTrue(employee.getTotalHolidays()<32);
    }

    @Test
    public void TestFindAll() {
       List<Employee> listOfAllClients= new ArrayList<>();
       listOfAllClients.add(employee);
        listOfAllClients.add(employee);
        Mockito.doReturn(listOfAllClients).when(employeeRepository).findAll();
        Assert.assertTrue(testingObject.findAll().size()==2);
    }
    private List<Holiday> getMockHolidays(){
        Holiday holiday= new Holiday();
        List holidays= new ArrayList<>();
        holidays.add(holiday);
        holidays.add(holiday);
        return  holidays;
    }
}
