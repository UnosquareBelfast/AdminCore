package com.unosquare.admin_core.back_end.entity;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Data
@ToString
@Table(name = "Employee_Role")
public class EmployeeRole implements java.io.Serializable {

    @Id
    @SequenceGenerator(name="employeeRoleSeq",sequenceName="employee_role_employee_role_id_seq", allocationSize = 1)
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
