package com.unosquare.adminCore;

import com.unosquare.adminCore.entity.EmployeeUserRole;
import com.unosquare.adminCore.enums.EmployeeUserRoles;
import com.unosquare.adminCore.payload.SignUpRequest;
import com.unosquare.adminCore.repository.EmployeeUserRoleRepository;
import com.unosquare.adminCore.service.EmployeeService;
import com.unosquare.adminCore.service.EmployeeUserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class ApplicationStartup
        implements ApplicationListener<ApplicationReadyEvent> {

    @Autowired
    EmployeeService employeeService;

    @Autowired
    EmployeeUserRoleService employeeUserRoleService;

    /**
     * This event is executed as late as conceivably possible to indicate that
     * the application is ready to service requests.
     */
    @Override
    public void onApplicationEvent(final ApplicationReadyEvent event) {

        employeeUserRoleService.save(EmployeeUserRoles.TeamLeader.getRole());
        employeeUserRoleService.save(EmployeeUserRoles.SystemAdmin.getRole());
        employeeUserRoleService.save(EmployeeUserRoles.User.getRole());

        if (employeeService.findByEmail("superuser@unosquare.com") == null) {
            SignUpRequest signUpRequest = new SignUpRequest("super", "user",
                    "superuser@unosquare.com",
                    "un05qu@r3_@dm1n",
                    "Northern Ireland", true, EmployeeUserRoles.SystemAdmin.getRole(), LocalDate.of(2018, 01, 01));
            employeeService.createNewEmployeeUser(signUpRequest);
        }
    }
}
