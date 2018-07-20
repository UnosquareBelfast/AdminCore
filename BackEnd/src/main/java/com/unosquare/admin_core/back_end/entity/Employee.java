package com.unosquare.admin_core.back_end.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@Entity
@Data
@Table(name = "Employee")
@ToString
public class Employee {

    @Id
    @SequenceGenerator(name="employeeSeq",sequenceName="employee_employee_id_seq", allocationSize = 1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="employeeSeq")
    @Column(name = "employee_id", unique = true, insertable = false, nullable = false)
    private int employeeId;

    private String forename;
    private String surname;
    private String email;

    @Column(name = "total_holidays")
    private int totalHolidays;

    @Column(name = "start_date")
    private LocalDate startDate;

    @OneToOne(cascade=CascadeType.DETACH)
    @JoinColumn(name = "country_id")
    private Country country;

    private String password;

    @ManyToOne(cascade=CascadeType.DETACH)
    @JoinColumn(name = "employee_role_id")
    private EmployeeRole employeeRole;

    @ManyToOne(cascade=CascadeType.DETACH)
    @JoinColumn(name = "employee_status_id")
    private EmployeeStatus employeeStatus;

    @OneToMany(mappedBy = "employee")
    private Set<Contract> contracts = new HashSet();

    @OneToMany(mappedBy = "employee")
    private Set<Event> events = new HashSet<>();

    public Employee(int employeeId){
        this.employeeId = employeeId;
    }
}
