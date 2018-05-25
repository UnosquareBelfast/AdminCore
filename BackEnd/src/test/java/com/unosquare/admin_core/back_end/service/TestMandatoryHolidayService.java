package com.unosquare.admin_core.back_end.service;

import com.unosquare.admin_core.back_end.entity.MandatoryHoliday;
import com.unosquare.admin_core.back_end.enums.Country;
import com.unosquare.admin_core.back_end.repository.MandatoryHolidayRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.*;
import org.springframework.context.annotation.ComponentScan;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static java.util.Arrays.asList;
import static org.mockito.ArgumentMatchers.any;

@ComponentScan("com.unosquare.admin_core")
public class TestMandatoryHolidayService {

    @InjectMocks
    private MandatoryHolidayService testingObject;

    private MandatoryHoliday pastHoliday;
    private List<MandatoryHoliday> mandatoryHolidays;
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
        pastHoliday.setCountryId(Country.NORTHERN_IRELAND.getCountryId());
        pastHoliday.setDate(pastDate);
        pastHoliday.setMandatoryHolidayId(1);

        MandatoryHoliday futureHoliday = new MandatoryHoliday();
        futureHoliday.setCountryId(Country.NORTHERN_IRELAND.getCountryId());
        futureHoliday.setDate(futureDate);
        futureHoliday.setMandatoryHolidayId(2);

        mandatoryHolidays = asList(pastHoliday, futureHoliday);
        futureMandatoryHolidays = Collections.singletonList(futureHoliday);
    }


    @Test
    public void testFindByIdCountySet() {
        Mockito.doReturn(Optional.of(pastHoliday)).when(mandatoryHolidayRepository).findById(1);
        Assert.assertEquals(testingObject.findById(1).getCountryId(), Country.NORTHERN_IRELAND.getCountryId());
    }

    @Test
    public void testFindByIdDateSet() {
        Mockito.doReturn(Optional.of(pastHoliday)).when(mandatoryHolidayRepository).findById(1);
        Assert.assertEquals(testingObject.findById(1).getDate(), pastDate);
    }


    @Test
    public void testSaveMethod() {
        testingObject.save(pastHoliday);
    }

    @Test
    public void testFindAll() {
        Mockito.doReturn(mandatoryHolidays).when(mandatoryHolidayRepository).findAll();
        Assert.assertEquals(2, testingObject.findAll().size());
    }

    @Test
    public void testFindMandatoryHolidaysByCountryAfterStartDate() {

        Mockito.doReturn(mandatoryHolidays).
                when(mandatoryHolidayRepository).findByCountryIdAndDateBetween(ArgumentMatchers.anyShort(), any(LocalDate.class), any(LocalDate.class));

        Assert.assertArrayEquals(testingObject.findMandatoryHolidaysByCountryIdAfterStartDate(Country.NORTHERN_IRELAND.getCountryId(), LocalDate.now()).toArray(),
                mandatoryHolidays.toArray());
    }

    @Test
    public void testFindMandatoryHolidaysByCountryAndYear() {

        Mockito.doReturn(mandatoryHolidays).
                when(mandatoryHolidayRepository).findByCountryIdAndDateBetween(ArgumentMatchers.anyShort(), any(LocalDate.class), any(LocalDate.class));


        Assert.assertArrayEquals(testingObject.findMandatoryHolidaysByCountryIdAndYear(Country.NORTHERN_IRELAND.getCountryId(), year).toArray(),
                mandatoryHolidays.toArray());
    }

    @Test
    public void testFindByCountryAndDateBetween() {
        Mockito.doReturn(futureMandatoryHolidays).
                when(mandatoryHolidayRepository).findByCountryIdAndDateBetween(ArgumentMatchers.anyShort(), any(LocalDate.class), any(LocalDate.class));

        Assert.assertArrayEquals(testingObject.findByCountryIdAndDateBetween(Country.NORTHERN_IRELAND.getCountryId(), currentDateTest, futureDate).toArray(),
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
