package com.unosquare.adminCore.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.unosquare.adminCore.enums.Country;
import com.unosquare.adminCore.enums.EmployeeRole;
import com.unosquare.adminCore.enums.EmployeeStatus;
import com.unosquare.adminCore.enums.enumConverter.CountryConverter;
import com.unosquare.adminCore.enums.enumConverter.EmployeeRoleConverter;
import com.unosquare.adminCore.enums.enumConverter.EmployeeStatusConverter;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@ToString
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property="@id", scope = Employee.class)
@Table(name = "Employee")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int employeeId;

    private String forename;
    private String surname;
    private String email;
    private short totalHolidays;

    private LocalDate startDate;

    @Basic
    @Column(name = "countryId")
    @Convert( converter=CountryConverter.class )
    private Country country;

    private String password;

    @Basic
    @Column(name = "employeeRoleId")
    @Convert( converter=EmployeeRoleConverter.class )
    private EmployeeRole employeeRole;

    @Basic
    @Column(name = "employeeStatusId")
    @Convert( converter=EmployeeStatusConverter.class )
    private EmployeeStatus employeeStatus;

    @OneToMany(mappedBy = "employee")
    @JsonIgnore
    private Set<Contract> contracts = new HashSet<>();

    @OneToMany(mappedBy = "employee")
    @JsonIgnore
    private Set<Holiday> holidays = new HashSet<>();

    public Employee() {

    }

    public Employee(String forename, String surname, String email,
                    EmployeeRole employeeRole,
                    EmployeeStatus status, LocalDate startDate,
                    Country country, String password) {
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
