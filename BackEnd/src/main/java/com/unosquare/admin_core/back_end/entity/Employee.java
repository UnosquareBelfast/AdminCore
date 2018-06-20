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
@Table(name = "Employee")
public class Employee implements java.io.Serializable {

    @Id
    @SequenceGenerator(name="employeeSeq",sequenceName="employee_employee_id_seq1")
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="employeeSeq")
    @Column(name = "employee_id", unique = true, nullable = false)
    private int employeeId;

    private String forename;
    private String surname;
    private String email;

    @Column(name = "total_holidays")
    private int totalHolidays;

    @Column(name = "start_date")
    private LocalDate startDate;

    @OneToOne
    @MapsId("countryId")
    @JoinColumn(name = "country_id", referencedColumnName = "country_id", insertable = false, updatable = false)
    private Country country;

    private String password;

    @OneToOne
    @MapsId("employeeRoleId")
    @JoinColumn(name = "employee_role_id", referencedColumnName = "employee_role_id", insertable = false, updatable = false)
    private EmployeeRole employeeRole;

    @OneToOne
    @MapsId("employeeStatusId")
    @JoinColumn(name = "employee_status_id", referencedColumnName = "employee_status_id", insertable = false, updatable = false)
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
