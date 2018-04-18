package com.unosquare.adminCore.service;

import com.unosquare.adminCore.entity.EmployeeUserRole;
import com.unosquare.adminCore.entity.MandatoryHoliday;
import com.unosquare.adminCore.enums.EmployeeUserRoles;
import com.unosquare.adminCore.repository.EmployeeUserRoleRepository;
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
public class TestEmployeeUserRoleService {

    @InjectMocks
    private EmployeeUserRoleService testingObject;

    private EmployeeUserRole teamLeader = EmployeeUserRoles.TeamLeader.getRole();
    private EmployeeUserRole systemAdmin = EmployeeUserRoles.SystemAdmin.getRole();
    private EmployeeUserRole user = EmployeeUserRoles.User.getRole();

    private List<EmployeeUserRole> allRoles = Arrays.asList(teamLeader, systemAdmin, user);

    @Mock
    private EmployeeUserRoleRepository employeeUserRoleRepository;

    @Before
    public void initMocks() {
        MockitoAnnotations.initMocks(this);
    }


    @Test
    public void testFindById() {
        Mockito.doReturn(Optional.of(teamLeader)).when(employeeUserRoleRepository).findById(1);
        Assert.assertTrue(testingObject.findById((short)1).equals(teamLeader));
    }

    @Test
    public void testFindAll() {
        Mockito.doReturn(allRoles).when(employeeUserRoleRepository).findAll();

        Assert.assertArrayEquals(testingObject.findAll().toArray(),
                allRoles.toArray());
    }
}
