package com.unosquare.adminCore.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum EmployeeRole {

    teamLeader((short) 1, "Team leader"),
    systemAdministrator((short) 2, "System administrator"),
    user((short) 3, "User");

    private final String description;
    private final short employeeRoleId;

    EmployeeRole(short employeeRoleId, String description) {
        this.employeeRoleId = employeeRoleId;
        this.description = description;
    }

    public short getEmployeeRoleId()
    {
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

    public static EmployeeRole fromId(short employeeRoleId) {
        for (EmployeeRole status : EmployeeRole.values()) {
            if(status.employeeRoleId == employeeRoleId)
            {
                return status;
            }
        }
        return null;
    }

}

