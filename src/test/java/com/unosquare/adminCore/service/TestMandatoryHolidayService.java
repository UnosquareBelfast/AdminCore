package com.unosquare.adminCore.service;

import com.unosquare.adminCore.entity.MandatoryHoliday;
import com.unosquare.adminCore.enums.Country;
import com.unosquare.adminCore.repository.MandatoryHolidayRepository;
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
public class TestMandatoryHolidayService {

    @InjectMocks
    private MandatoryHolidayService testingObject;

    private MandatoryHoliday pastHoliday;
    private MandatoryHoliday futureHoliday;
    private List<MandatoryHoliday> mandatoryHolidays;
    private List<MandatoryHoliday> pastMandatoryHolidays;
    private List<MandatoryHoliday> futureMandatoryHolidays;

    private int year = LocalDate.now().getYear();
    private LocalDate currentDateTest = LocalDate.of(year, 6, 6);

    private LocalDate pastDate = currentDateTest.minusMonths(1);
    private LocalDate futureDate = currentDateTest.plusMonths(1);

    @Mock
    private MandatoryHolidayRepository mandatoryHolidayRepository;

    @Before
    public void initMocks() {
        MockitoAnnotations.initMocks(this);

        pastHoliday = new MandatoryHoliday();
        pastHoliday.setCountry(Country.northernIreland);
        pastHoliday.setDate(pastDate);
        pastHoliday.setMandatoryHolidayId(1);

        futureHoliday = new MandatoryHoliday();
        futureHoliday.setCountry(Country.northernIreland);
        futureHoliday.setDate(futureDate);
        futureHoliday.setMandatoryHolidayId(2);

        mandatoryHolidays = Arrays.asList(pastHoliday, futureHoliday);
        pastMandatoryHolidays = Arrays.asList(pastHoliday);
        futureMandatoryHolidays = Arrays.asList(futureHoliday);
    }


    @Test
    public void testFindByIdCountySet() {
        Mockito.doReturn(Optional.of(pastHoliday)).when(mandatoryHolidayRepository).findById(1);
        Assert.assertTrue(testingObject.findById(1).getCountry().equals(Country.northernIreland));
    }

    @Test
    public void testFindByIdDateSet() {
        Mockito.doReturn(Optional.of(pastHoliday)).when(mandatoryHolidayRepository).findById(1);
        Assert.assertTrue(testingObject.findById(1).getDate().equals(pastDate));
    }


    @Test
    public void testSaveMethod() {
        testingObject.save(pastHoliday);
    }

    @Test
    public void testFindAll() {
        Mockito.doReturn(mandatoryHolidays).when(mandatoryHolidayRepository).findAll();
        Assert.assertTrue(testingObject.findAll().size() == 2);
    }

    @Test
    public void testFindMandatoryHolidaysByCountryAfterStartDate() {

        Mockito.doReturn(mandatoryHolidays).
                when(mandatoryHolidayRepository).findByCountryAndDateBetween(any(Country.class), any(LocalDate.class), any(LocalDate.class));

        Assert.assertArrayEquals(testingObject.findMandatoryHolidaysByCountryAfterStartDate(Country.northernIreland, LocalDate.now()).toArray(),
                mandatoryHolidays.toArray());
    }

    @Test
    public void testFindMandatoryHolidaysByCountryAndYear() {

        Mockito.doReturn(mandatoryHolidays).
                when(mandatoryHolidayRepository).findByCountryAndDateBetween(any(Country.class), any(LocalDate.class), any(LocalDate.class));


        Assert.assertArrayEquals(testingObject.findMandatoryHolidaysByCountryAndYear(Country.northernIreland, year).toArray(),
                mandatoryHolidays.toArray());
    }

    @Test
    public void testFindByCountryAndDateBetween() {
        Mockito.doReturn(futureMandatoryHolidays).
                when(mandatoryHolidayRepository).findByCountryAndDateBetween(any(Country.class), any(LocalDate.class), any(LocalDate.class));

        Assert.assertArrayEquals(testingObject.findByCountryAndDateBetween(Country.northernIreland, currentDateTest, futureDate).toArray(),
                futureMandatoryHolidays.toArray());
    }

    @Test
    public void testFindByDateBetween() {
        Mockito.doReturn(futureMandatoryHolidays).
                when(mandatoryHolidayRepository).findByDateBetween(any(LocalDate.class), any(LocalDate.class));

        Assert.assertArrayEquals(testingObject.findByDateBetween(currentDateTest, futureDate).toArray(),
                futureMandatoryHolidays.toArray());
    }
}
