package com.unosquare.adminCore.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum EmployeeStatus {

    active((short)1, "Active"),
    inactive((short)2, "Inactive");

    private final String description;
    private final short employeeStatusId;

    EmployeeStatus(short employeeStatusId,String description) {
        this.employeeStatusId = employeeStatusId;
        this.description = description;
    }

    public short getEmployeeStatusId()
    {
        return employeeStatusId;
    }

    public String getDescription() {
        return description;
    }

    @Override
    public String toString() {
        return String.format(
                "{employeeStatusId='%s', description='%s'}",
                employeeStatusId, description);
    }

    public static EmployeeStatus fromId(short employeeStatusId) {
        for (EmployeeStatus status : EmployeeStatus.values()) {
            if(status.employeeStatusId == employeeStatusId)
            {
                return status;
            }
        }
        return null;
    }
}
