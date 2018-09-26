package com.unosquare.admin_core.back_end.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EmployeeSnapshotDto {
    private final int teamId;
    private final String name;
    private final String description;
    private String teamName;
    private int employeeId;
    private String email;
    private String clientName;
}
