package com.unosquare.admin_core.back_end.configuration.mappings;

import org.modelmapper.PropertyMap;

public interface  BaseMappings<T, U> {

    PropertyMap <T, U> MapFromSourceToTarget();
    PropertyMap <U, T> MapFromTargetToSource();
}
