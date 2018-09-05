package com.unosquare.admin_core.back_end.viewModels.dashboard;

import lombok.Data;

import java.util.List;

@Data
public class TeamSnapshotViewModel {
    private String team;
    private List<EmployeeSnapshotViewModel> members;
}
