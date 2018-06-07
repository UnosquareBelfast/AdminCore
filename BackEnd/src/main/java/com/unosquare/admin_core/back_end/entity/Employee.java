package com.unosquare.admin_core.back_end.entity;

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
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "@id", scope = Employee.class)
@Table(name = "Employee")
public class Employee implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int employeeId;

    private String forename;
    private String surname;
    private String email;

    @Column(name = "total_holidays")
    private int totalHolidays;

    @Column(name = "start_date")
    private LocalDate startDate;

//    @Basic
//    @Column(name = "country_id")
//    private int countryId;

    @OneToOne
    @MapsId("countryId")
    @JoinColumn(name = "countryId", referencedColumnName = "countryId", insertable = false, updatable = false)
    private Country country;

    private String password;

//    @Basic
//    @Column(name = "employee_role_id")
//    private int employeeRoleId;
//
//    @Basic
//    @Column(name = "employee_status_id")
//    private int employeeStatusId;

    @OneToOne
    @MapsId("employeeRoleId")
    @JoinColumn(name = "employeeRoleId", referencedColumnName = "employeeRoleId", insertable = false, updatable = false)
    private EmployeeRole employeeRole;

    @OneToOne
    @MapsId("employeeStatusId")
    @JoinColumn(name = "employeeStatusId", referencedColumnName = "employeeStatusId", insertable = false, updatable = false)
    private EmployeeStatus employeeStatus;

    @OneToMany(mappedBy = "employee")
    @JsonIgnore
    private Set<Contract> contracts = new HashSet<>();

//    @OneToMany(mappedBy = "employee")
//    @JsonIgnore
//    private Set<Holiday> holidays = new HashSet<>();

    public Employee() {

    }

    public Employee(int employeeId){
        this.employeeId = employeeId;
    }

    public Employee(String forename, String surname, String email,
                    int employeeRoleId,
                    int statusId,
                    LocalDate startDate,
                    int countryId,
                    String password) {
        this.forename = forename;
        this.surname = surname;
        this.email = email;
        this.employeeRole = new EmployeeRole(employeeRoleId);
        this.employeeStatus = new EmployeeStatus(statusId);
        this.startDate = startDate;
        this.country = new Country(countryId);
        this.password = password;
    }
}
