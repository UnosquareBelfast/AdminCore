package com.unosquare.admin_core.back_end.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ContractStatus {

    ACTIVE(1, "Active"),
    INACTIVE(2, "Inactive");

    private final String description;
    private final int contractStatusId;

    ContractStatus(int contractStatusId, String description) {
        this.contractStatusId = contractStatusId;
        this.description = description;
    }

    public int getContractStatusId() {
        return contractStatusId;
    }

    public String getDescription() {
        return description;
    }

    @Override
    public String toString() {
        return String.format(
                "{contractStatusId='%s', description='%s'}",
                contractStatusId, description);
    }

    public static ContractStatus fromId(int contractStatusId) {

        for (ContractStatus status : ContractStatus.values()) {
            if (status.contractStatusId == contractStatusId) {
                return status;
            }
        }
        return null;
    }
}
