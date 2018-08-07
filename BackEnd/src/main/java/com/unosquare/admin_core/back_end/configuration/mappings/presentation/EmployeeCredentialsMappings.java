
package com.unosquare.admin_core.back_end.configuration.mappings.presentation;

import com.unosquare.admin_core.back_end.ViewModels.UserCredentialsViewModel;
import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;
import com.unosquare.admin_core.back_end.security.UserPrincipal;
import org.modelmapper.PropertyMap;

public class UserCredentialsMappings implements BaseMappings<UserPrincipal, UserCredentialsViewModel> {
    @Override
    public PropertyMap<UserPrincipal, UserCredentialsViewModel> MapFromSourceToTarget() {
        return new PropertyMap <UserPrincipal, UserCredentialsViewModel>() {
            protected void configure() {
                map().setUserId(source.getId());
            }
        };
    }

    @Override
    public PropertyMap<UserCredentialsViewModel, UserPrincipal> MapFromTargetToSource() {
        return new PropertyMap <UserCredentialsViewModel, UserPrincipal>() {
            protected void configure() {
            }
        };
    }
}
