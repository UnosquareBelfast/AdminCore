package com.unosquare.admin_core.back_end.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.unosquare.admin_core.back_end.entity.Employee;
import com.unosquare.admin_core.back_end.enums.EmployeeRoles;
import com.unosquare.admin_core.back_end.enums.SecurityRoles;
import lombok.Data;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

@Data
public class UserPrincipal implements UserDetails {
    private int id;

    private String name;

    @JsonIgnore
    private String email;

    @JsonIgnore
    private String password;

    private Collection<? extends GrantedAuthority> authorities;



    public UserPrincipal(int id, String name, String email, String password, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
    }


    public static UserPrincipal create(Employee employee) {

        List<String> roles = new ArrayList();

        getUserRoles(employee, roles);

        List<GrantedAuthority> authorities = new ArrayList();

        for (String role : roles) {
            authorities.add(new SimpleGrantedAuthority(role));
        }


        return new UserPrincipal(
                employee.getEmployeeId(), String.format("%s %s", employee.getForename(), employee.getSurname()),
                employee.getEmail(), employee.getPassword(), authorities
        );
    }

    private static void getUserRoles(Employee employee, List<String> roles) {
        if (employee.getEmployeeRole().getEmployeeRoleId() == EmployeeRoles.TEAM_LEADER.getEmployeeRoleId()) {
            roles.add(SecurityRoles.TEAM_LEADER.toString());
        } else if (employee.getEmployeeRole().getEmployeeRoleId() == EmployeeRoles.SYSTEM_ADMINISTRATOR.getEmployeeRoleId()) {
            roles.add(SecurityRoles.SYSTEM_ADMIN.toString());
        }

        roles.add(SecurityRoles.USER.toString());
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserPrincipal that = (UserPrincipal) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id);
    }
}