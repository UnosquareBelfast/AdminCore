package com.unosquare.admin_core.back_end.configuration.mappings;

import org.modelmapper.Converter;

public interface BaseConverters<T, U> {

    Converter<T, U> MapFromSourceToTarget();

    Converter<U, T> MapFromTargetToSource();
}
