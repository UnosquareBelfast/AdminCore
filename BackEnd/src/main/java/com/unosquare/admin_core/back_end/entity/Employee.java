package com.unosquare.admin_core.back_end.entity;

//import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
//import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@ToString
@Table(name = "Employee")
public class Employee implements java.io.Serializable {

    @Id
    @SequenceGenerator(name="employeeSeq",sequenceName="employee_employee_id_seq1", allocationSize = 1)
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

    @ManyToOne
    @JoinColumn(name = "country_id")
    private Country country;

    private String password;

    @ManyToOne
    @JoinColumn(name = "employee_role_id")
    private EmployeeRole employeeRole;

    @ManyToOne
    @JoinColumn(name = "employee_status_id")
    private EmployeeStatus employeeStatus;

    @OneToMany(mappedBy = "employee")
    @JsonIgnore
    private Set<Contract> contracts = new HashSet();

    @OneToMany(mappedBy = "employee")
    @JsonIgnore
    private Set<Holiday> holidays = new HashSet<>();

    public Employee() {

    }

    public Employee(int employeeId){
        this.employeeId = employeeId;
    }

    public Employee(String forename, String surname, String email,
                    EmployeeRole employeeRole,
                    EmployeeStatus status,
                    LocalDate startDate,
                    Country country,
                    String password) {
        this.forename = forename;
        this.surname = surname;
        this.email = email;
        this.employeeRole = employeeRole;
        this.employeeStatus = status;
        this.startDate = startDate;
        this.country = country;
        this.password = password;
    }
}
