package com.unosquare.admin_core.back_end.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum EmployeeRoles {

    TEAM_LEADER(1, "Team leader"),
    SYSTEM_ADMINISTRATOR(2, "System administrator"),
    USER(3, "User");

    private final String description;
    private final int employeeRoleId;

    EmployeeRoles(int employeeRoleId, String description) {
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

    public static EmployeeRoles fromId(int employeeRoleId) {
        for (EmployeeRoles status : EmployeeRoles.values()) {
            if (status.employeeRoleId == employeeRoleId) {
                return status;
            }
        }
        return null;
    }

}

