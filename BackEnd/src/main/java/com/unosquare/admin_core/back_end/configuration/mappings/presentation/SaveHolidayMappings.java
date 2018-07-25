
package com.unosquare.admin_core.back_end.configuration.mappings.presentation;

import com.unosquare.admin_core.back_end.ViewModels.SaveHolidayViewModel;
import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;
import com.unosquare.admin_core.back_end.dto.EventDTO;
import org.modelmapper.PropertyMap;

import java.time.LocalDate;

public class SaveHolidayMappings extends BaseMappings<EventDTO, SaveHolidayViewModel> {

    @Override
    public PropertyMap<EventDTO, SaveHolidayViewModel> MapFromDtoToTarget() {
        return new PropertyMap<EventDTO, SaveHolidayViewModel>() {
            protected void configure() {
            }
        };
    }

    @Override
    public PropertyMap<SaveHolidayViewModel, EventDTO> MapFromTargetToDto() {
        return new PropertyMap <SaveHolidayViewModel, EventDTO>() {
            protected void configure() {
                skip().setStartDate(null);
                skip().setEndDate(null);
         /*       map().setEventTypeId(EventTypes.ANNUAL_LEAVE.getEventTypeId());
                map().setEventStatusId(EventStatuses.AWAITING_APPROVAL.getEventStatusId());
                map().setEventTypeDescription(EventTypes.ANNUAL_LEAVE.getDescription());
                map().setEventStatusDescription(EventTypes.ANNUAL_LEAVE.getDescription());*/
                map().setDateCreated(LocalDate.now());
                map().setLastModified(LocalDate.now());
                }
        };
    }
}

