package com.unosquare.adminCore.entity;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
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

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "employee")
    private Set<Contract> contracts = new HashSet<Contract>();

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "employee")
    private Set<Holiday> holidays;

    public Employee()
    {

    }

    public Employee(String forename, String surname, String email, boolean isAdmin, boolean isActive, LocalDate startDate, String country) {
        this.forename = forename;
        this.surname = surname;
        this.email = email;
        this.isAdmin = isAdmin;
        this.isActive = isActive;
        this.startDate = startDate;
        this.country = country;
    }

    public int getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(int employeeId) {
        this.employeeId = employeeId;
    }

    public String getForename() {
        return forename;
    }

    public void setForename(String forename) {
        this.forename = forename;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public short getTotalHolidays() {
        return totalHolidays;
    }

    public void setTotalHolidays(short totalHolidays) {
        this.totalHolidays = totalHolidays;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public Set<Contract> getContracts() {
        return contracts;
    }

    public Set<Holiday> getHolidays() {
        return holidays;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setContracts(Set<Contract> contracts) {
        this.contracts = contracts;
    }

    public void setHolidays(Set<Holiday> holidays) {
        this.holidays = holidays;
    }
}
