package com.unosquare.adminCore.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "holidayId")

@Table(name = "Holiday")
public class Holiday {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int holidayId;

    private LocalDate startDate;
    private LocalDate endDate;

    private short holidayLength;

    @ManyToOne
    @JoinColumn(name="employeeId")
    private Employee employee;

    private String status;

    private LocalDate lastModified;
    private LocalDate dateCreated;

    public Holiday()
    {

    }

    public Holiday(LocalDate startDate, LocalDate endDate, short holidayLength, Employee employee) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.holidayLength = holidayLength;
        this.employee = employee;
        this.status = "new";
        this.lastModified = LocalDate.now();
        this.dateCreated = LocalDate.now();
    }

    public Holiday(LocalDate startDate, LocalDate endDate, short holidayLength, Employee employee, String status) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.holidayLength = holidayLength;
        this.employee = employee;
        this.status = "new";
        this.lastModified = LocalDate.now();
        this.dateCreated = LocalDate.now();
        this.status = status;
    }

    public int getHolidayId() {
        return holidayId;
    }

    public void setHolidayId(int holidayId) {
        this.holidayId = holidayId;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public short getHolidayLength() {
        return holidayLength;
    }

    public void setHolidayLength(short holidayLength) {
        this.holidayLength = holidayLength;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getLastModified() {
        return lastModified;
    }

    public void setLastModified(LocalDate lastModified) {
        this.lastModified = lastModified;
    }

    public LocalDate getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(LocalDate dateCreated) {
        this.dateCreated = dateCreated;
    }
}
