package com.unosquare.admin_core.back_end.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ContractStatus {

    ACTIVE((short) 1, "Active"),
    INACTIVE((short) 2, "Inactive");

    private final String description;
    private final short contractStatusId;

    ContractStatus(short contractStatusId, String description) {
        this.contractStatusId = contractStatusId;
        this.description = description;
    }

    public short getContractStatusId() {
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

    public static ContractStatus fromId(short contractStatusId) {

        for (ContractStatus status : ContractStatus.values()) {
            if (status.contractStatusId == contractStatusId) {
                return status;
            }
        }
        return null;
    }
}
