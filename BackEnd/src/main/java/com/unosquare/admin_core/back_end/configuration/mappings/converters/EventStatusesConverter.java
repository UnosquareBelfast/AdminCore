package com.unosquare.admin_core.back_end.configuration.mappings.converters;

import com.unosquare.admin_core.back_end.configuration.mappings.BaseConverters;
import com.unosquare.admin_core.back_end.enums.EventStatuses;
import org.modelmapper.Converter;

public class EventStatusesConverter implements BaseConverters<EventStatuses, Integer> {

    @Override
    public Converter<EventStatuses, Integer> MapFromSourceToTarget() {
        return mappingContext -> mappingContext.getSource().getEventStatusId();
    }

    @Override
    public Converter<Integer, EventStatuses> MapFromTargetToSource() {
        return mappingContext -> EventStatuses.fromId(mappingContext.getSource());
    }
}
