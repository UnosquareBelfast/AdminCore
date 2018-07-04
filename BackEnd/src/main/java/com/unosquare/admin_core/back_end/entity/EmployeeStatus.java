package com.unosquare.admin_core.back_end.entity;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Data
@ToString
@Table(name = "EmployeeStatus")
public class EmployeeStatus implements java.io.Serializable {

    @Id
    @SequenceGenerator(name="employeeStatusSeq",sequenceName="employee_status_employee_status_id_seq", allocationSize = 1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="employeeStatusSeq")
    @Column(name = "employee_status_id", unique = true, nullable = false)
    private int employeeStatusId;

    @Column(name = "description")
    private String description;

    public EmployeeStatus(){

    }

    public EmployeeStatus(int employeeStatusId){
        this.employeeStatusId = employeeStatusId;
    }
}