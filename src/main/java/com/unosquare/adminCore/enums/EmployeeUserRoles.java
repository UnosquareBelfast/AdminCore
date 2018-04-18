package com.unosquare.adminCore.enums;

import com.unosquare.adminCore.entity.EmployeeUserRole;

public enum EmployeeUserRoles {

    TeamLeader("Team Leader", 1),
    SystemAdmin("System Admin", 2),
    User("User", 3);

    private final String description;
    private final int id;

    EmployeeUserRoles(String description, int id) {
        this.description = description;
        this.id = id;
    }

    public EmployeeUserRole getRole()
    {
        return new EmployeeUserRole(id, description);
    }

    @Override
    public String toString() {
        return description;
    }
}
