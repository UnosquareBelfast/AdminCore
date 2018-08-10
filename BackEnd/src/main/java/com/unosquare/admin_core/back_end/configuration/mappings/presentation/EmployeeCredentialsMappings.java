package com.unosquare.admin_core.back_end.configuration.mappings.presentation;

import com.unosquare.admin_core.back_end.ViewModels.EmployeeCredentialsViewModel;
import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;
import com.unosquare.admin_core.back_end.security.UserPrincipal;
import org.modelmapper.PropertyMap;
public class EmployeeCredentialsMappings implements BaseMappings<UserPrincipal, EmployeeCredentialsViewModel> {
    @Override
    public PropertyMap<UserPrincipal, EmployeeCredentialsViewModel> MapFromSourceToTarget() {
        return new PropertyMap <UserPrincipal, EmployeeCredentialsViewModel>() {
            protected void configure() {
                map().setEmail(source.getUsername());
                map().setEmployeeId(source.getId());
                map().setEmployeeRoleId(source.getRoleId());
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
