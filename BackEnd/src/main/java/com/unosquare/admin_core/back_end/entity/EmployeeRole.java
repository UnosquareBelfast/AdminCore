package com.unosquare.admin_core.back_end.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Data
@ToString
@Table(name = "EmployeeRole")
public class EmployeeRole implements java.io.Serializable {

    @Id
    @SequenceGenerator(name="employeeRoleSeq",sequenceName="employee_role_employee_role_id_seq")
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="employeeRoleSeq")
    @Column(name = "employee_role_id", unique = true, nullable = false)
    private int employeeRoleId;

    @Column(name = "description")
    private String description;

    public EmployeeRole(){

    }

    public EmployeeRole(int employeeRoleId){
        this.employeeRoleId = employeeRoleId;
    }
}