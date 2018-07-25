package com.unosquare.admin_core.back_end.configuration.mappings;

import org.modelmapper.PropertyMap;

public abstract class BaseMappings<T, U> {

    public PropertyMap <T, U> MapFromDtoToTarget() {

        return null;
    }

    public PropertyMap <U, T> MapFromTargetToDto() {

        return null;
    }
}
