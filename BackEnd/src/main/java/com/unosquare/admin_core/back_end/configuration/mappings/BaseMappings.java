package com.unosquare.admin_core.back_end.configuration.mappings;

import org.modelmapper.PropertyMap;

import java.util.List;

public interface BaseMappings<T, U> {

    PropertyMap <T, U> RetrieveSourceDtoMapping();
    PropertyMap <U, T> RetrieveTargetDtoMapping();
}
