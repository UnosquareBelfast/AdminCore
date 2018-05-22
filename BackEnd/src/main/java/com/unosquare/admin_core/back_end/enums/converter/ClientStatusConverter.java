package com.unosquare.admin_core.back_end.enums.converter;

import com.unosquare.admin_core.back_end.enums.ClientStatus;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class ClientStatusConverter
        implements AttributeConverter<ClientStatus, Short> {

    public Short convertToDatabaseColumn(ClientStatus status) {
        if (status == null) {
            return null;
        }

        return status.getClientStatusId();
    }

    @Override
    public ClientStatus convertToEntityAttribute(Short id) {
        if (id == null) {
            return null;
        }

        return ClientStatus.fromId(id);
    }
}