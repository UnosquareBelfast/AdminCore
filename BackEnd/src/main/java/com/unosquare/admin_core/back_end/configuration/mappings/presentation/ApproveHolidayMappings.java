package com.unosquare.admin_core.back_end.configuration.mappings.presentation;
import com.unosquare.admin_core.back_end.ViewModels.ApproveHolidayViewModel;
import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;
import com.unosquare.admin_core.back_end.configuration.mappings.converters.EventStatusesConverter;
import com.unosquare.admin_core.back_end.dto.EventDTO;
import com.unosquare.admin_core.back_end.enums.EventStatuses;
import lombok.NoArgsConstructor;
import org.modelmapper.PropertyMap;


@NoArgsConstructor
public class ApproveHolidayMappings implements BaseMappings<EventDTO, ApproveHolidayViewModel> {

    @Override
    public PropertyMap<EventDTO, ApproveHolidayViewModel> MapFromSourceToTarget() {
        return new PropertyMap <EventDTO, ApproveHolidayViewModel>() {
            protected void configure() {

            }
        };
    }

    @Override
    public PropertyMap<ApproveHolidayViewModel, EventDTO> MapFromTargetToSource() {
        return  new PropertyMap <ApproveHolidayViewModel, EventDTO>() {
            protected void configure() {
                map().setEventId(source.getHolidayId());
            }
        };
    }
}

