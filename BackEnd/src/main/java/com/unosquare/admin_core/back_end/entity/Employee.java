package com.unosquare.admin_core.back_end.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.unosquare.admin_core.back_end.enums.Country;
import com.unosquare.admin_core.back_end.enums.EmployeeRole;
import com.unosquare.admin_core.back_end.enums.EmployeeStatus;
import com.unosquare.admin_core.back_end.enums.converter.CountryConverter;
import com.unosquare.admin_core.back_end.enums.converter.EmployeeRoleConverter;
import com.unosquare.admin_core.back_end.enums.converter.EmployeeStatusConverter;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@ToString
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "@id", scope = Employee.class)
@Table(name = "Employee")
public class Employee implements java.io.Serializable {

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
    @Convert(converter = CountryConverter.class)
    private Country country;

    private String password;

    @Basic
    @Column(name = "employeeRoleId")
    @Convert(converter = EmployeeRoleConverter.class)
    private EmployeeRole employeeRole;

    @Basic
    @Column(name = "employeeStatusId")
    @Convert(converter = EmployeeStatusConverter.class)
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
