package com.unosquare.admin_core.back_end.dto;

import lombok.Data;
import org.modelmapper.ModelMapper;

import java.time.LocalDate;

@Data
public class ContractDto {

    private int contractId;
    private int teamId;
    private int employeeId;
    private LocalDate startDate;
    private LocalDate endDate;

    public ContractDto() {

    }
}


