package com.unosquare.admin_core.back_end.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TeamSummaryDto {
    private final int teamId;
    private final String name;
    private final String description;
    private String teamName;
}
