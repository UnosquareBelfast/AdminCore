package com.unosquare.admin_core.back_end.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum EmployeeStatuses {

    ACTIVE(1, "Active"),
    INACTIVE(2, "Inactive");

    private final String description;
    private final int employeeStatusId;

    EmployeeStatuses(int employeeStatusId, String description) {
        this.employeeStatusId = employeeStatusId;
        this.description = description;
    }

    public int getEmployeeStatusId() {
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

    public static EmployeeStatuses fromId(int employeeStatusId) {
        for (EmployeeStatuses status : EmployeeStatuses.values()) {
            if (status.employeeStatusId == employeeStatusId) {
                return status;
            }
        }
        return null;
    }
}
