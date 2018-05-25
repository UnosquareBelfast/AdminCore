package com.unosquare.admin_core.back_end.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum EmployeeRole {

    TEAM_LEADER(1, "Team leader"),
    SYSTEM_ADMINISTRATOR(2, "System administrator"),
    USER(3, "User");

    private final String description;
    private final int employeeRoleId;

    EmployeeRole(int employeeRoleId, String description) {
        this.employeeRoleId = employeeRoleId;
        this.description = description;
    }

    public int getEmployeeRoleId() {
        return employeeRoleId;
    }

    public String getDescription() {
        return description;
    }

    @Override
    public String toString() {
        return String.format(
                "{employeeRoleId='%s', description='%s'}",
                employeeRoleId, description);
    }

    public static EmployeeRole fromId(int employeeRoleId) {
        for (EmployeeRole status : EmployeeRole.values()) {
            if (status.employeeRoleId == employeeRoleId) {
                return status;
            }
        }
        return null;
    }

}

