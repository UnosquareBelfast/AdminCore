package com.unosquare.adminCore.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@ToString
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "employeeUserRoleId", scope = EmployeeUserRole.class)
@Table(name = "EmployeeUserRole")
public class EmployeeUserRole {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int employeeUserRoleId;

    private String roleDescription;

    @OneToMany(mappedBy = "employeeUserRole")
    @JsonIgnore
    private Set<Employee> employees = new HashSet<>();

    public EmployeeUserRole() {

    }

    public EmployeeUserRole(int employeeUserRoleId, String roleDescription) {
        this.employeeUserRoleId = employeeUserRoleId;
        this.roleDescription = roleDescription;
    }
}
