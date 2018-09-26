package com.unosquare.admin_core.back_end.viewModels.dashboard;

import lombok.Data;

@Data
public class EmployeeSnapshotViewModel {
    private int employeeId;
    private String name;
    private String state;
    private String email;
    private String clientName;
}
