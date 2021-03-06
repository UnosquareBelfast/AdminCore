package com.unosquare.admin_core.back_end.configuration.mappings.presentation;
import com.unosquare.admin_core.back_end.viewModels.employee.EmployeeCredentialsViewModel;
import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;
import com.unosquare.admin_core.back_end.security.UserPrincipal;
import lombok.NoArgsConstructor;
import org.modelmapper.PropertyMap;

@NoArgsConstructor

public class EmployeeCredentialsMappings implements BaseMappings<UserPrincipal, EmployeeCredentialsViewModel> {
    @Override
    public PropertyMap<UserPrincipal, EmployeeCredentialsViewModel> MapFromSourceToTarget() {
        return new PropertyMap <UserPrincipal, EmployeeCredentialsViewModel>() {
            protected void configure() {
                map().setUserId(source.getId());
            }
        };
    }

    @Override
    public PropertyMap<EmployeeCredentialsViewModel, UserPrincipal> MapFromTargetToSource() {
        return new PropertyMap <EmployeeCredentialsViewModel, UserPrincipal>() {
            protected void configure() {
            }
        };
    }
}
