package com.unosquare.adminCore.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@ToString
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "employeeId", scope = Employee.class)
@Table(name = "Employee")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int employeeId;

    private String forename;
    private String surname;
    private String email;
    private short totalHolidays;

    private boolean isAdmin;
    private boolean isActive;

    private LocalDate startDate;
    private String country;
    private String password;

    @OneToMany(mappedBy = "employee")
    @JsonIgnore
    private Set<Contract> contracts = new HashSet<Contract>();

    @OneToMany(mappedBy = "employee")
    @JsonIgnore
    private Set<Holiday> holidays = new HashSet<Holiday>();

    public Employee() {

    }

    public Employee(String forename, String surname, String email,
                    boolean isAdmin, boolean isActive, LocalDate startDate,
                    String country, String password) {
        this.forename = forename;
        this.surname = surname;
        this.email = email;
        this.isAdmin = isAdmin;
        this.isActive = isActive;
        this.startDate = startDate;
        this.country = country;
        this.password = password;
    }
}
