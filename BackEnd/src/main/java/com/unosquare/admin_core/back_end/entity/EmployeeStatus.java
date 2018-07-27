package com.unosquare.admin_core.back_end.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Embeddable
@Data
@NoArgsConstructor
@Table(name = "Employee_Status")
public class EmployeeStatus implements java.io.Serializable {

    @Id
    @SequenceGenerator(name="employeeStatusSeq",sequenceName="employee_status_employee_status_id_seq", allocationSize = 1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="employeeStatusSeq")
    @Column(name = "employee_status_id", unique = true, nullable = false)
    private int employeeStatusId;

    @Column(name = "description")
    private String description;

    public EmployeeStatus(int employeeStatusId){
        this.employeeStatusId = employeeStatusId;
    }
}