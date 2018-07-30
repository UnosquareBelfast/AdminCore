package com.unosquare.admin_core.back_end.configuration.mappings.presentation;

import com.unosquare.admin_core.back_end.ViewModels.ApproveHolidayViewModel;
import com.unosquare.admin_core.back_end.ViewModels.DateViewModel;
import com.unosquare.admin_core.back_end.ViewModels.UpdateHolidayViewModel;
import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;
import com.unosquare.admin_core.back_end.configuration.mappings.converters.EventStatusesConverter;
import com.unosquare.admin_core.back_end.dto.EventDTO;
import com.unosquare.admin_core.back_end.enums.EventStatuses;
import lombok.NoArgsConstructor;
import org.hibernate.sql.Update;
import org.modelmapper.PropertyMap;

@NoArgsConstructor
public class UpdateHolidayMappings implements BaseMappings<EventDTO , UpdateHolidayViewModel>{
    @Override
    public PropertyMap<EventDTO, UpdateHolidayViewModel> MapFromSourceToTarget() {
        return new PropertyMap <EventDTO, UpdateHolidayViewModel>() {
            protected void configure() {

            }
        };
    }

    @Override
    public PropertyMap<UpdateHolidayViewModel, EventDTO> MapFromTargetToSource() {
        return  new PropertyMap <UpdateHolidayViewModel, EventDTO>() {
            protected void configure() {
                map().setEventId(source.getHolidayId());
                skip().setStartDate(null);
                skip().setEndDate(null);

            }
        };
    }

}