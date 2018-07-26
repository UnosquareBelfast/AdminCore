package com.unosquare.admin_core.back_end.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ContractDTO {

    private int contractId;

    private int teamId;

    private int employeeId;

    private LocalDate startDate;

    private LocalDate endDate;
}


