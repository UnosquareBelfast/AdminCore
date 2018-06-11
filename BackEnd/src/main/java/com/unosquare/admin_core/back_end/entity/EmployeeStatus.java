package com.unosquare.admin_core.back_end.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Data
@ToString
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "@id", scope = EmployeeStatus.class)
@Table(name = "EmployeeStatus")
public class EmployeeStatus implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "employee_status_id")
    private int employeeStatusId;

    @Column(name = "description")
    private String description;

    public EmployeeStatus(){

    }

    public EmployeeStatus(int employeeStatusId){
        this.employeeStatusId = employeeStatusId;
    }
}