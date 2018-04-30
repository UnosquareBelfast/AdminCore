package com.unosquare.admin_core.enums.converter;

import com.unosquare.admin_core.enums.ContractStatus;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class ContractStatusConverter
        implements AttributeConverter<ContractStatus, Short> {

    public Short convertToDatabaseColumn(ContractStatus status) {
        if (status == null) {
            return null;
        }

        return status.getContractStatusId();
    }

    public ContractStatus convertToEntityAttribute(Short id) {
        if (id == null) {
            return null;
        }

        return ContractStatus.fromId(id);
    }
}
