package com.unosquare.adminCore;

import com.unosquare.adminCore.payload.SignUpRequest;
import com.unosquare.adminCore.service.EmployeeService;
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

    /**
     * This event is executed as late as conceivably possible to indicate that
     * the application is ready to service requests.
     */
    @Override
    public void onApplicationEvent(final ApplicationReadyEvent event) {
        if(employeeService.findByEmail("swaggerDev@unosquare.com") == null)
        {
            SignUpRequest signUpRequest = new SignUpRequest("swagger", "dev",
                    "swaggerDev@unosquare.com",
                    "un0squ@r35w@993r",
                    "Northern Ireland", true, true, LocalDate.of(2018, 01, 01));
            employeeService.createNewEmployeeUser(signUpRequest);
        }
    }

}
