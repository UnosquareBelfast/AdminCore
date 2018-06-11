package com.unosquare.admin_core.back_end.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Data
@ToString
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "@id", scope = EmployeeRole.class)
@Table(name = "EmployeeRole")
public class EmployeeRole implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "employee_role_id")
    private int employeeRoleId;

    @Column(name = "description")
    private String description;

    public EmployeeRole(){

    }

    public EmployeeRole(int employeeRoleId){
        this.employeeRoleId = employeeRoleId;
    }
}
