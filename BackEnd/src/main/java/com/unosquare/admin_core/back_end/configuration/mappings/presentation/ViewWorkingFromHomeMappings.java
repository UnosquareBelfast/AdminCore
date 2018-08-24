package com.unosquare.admin_core.back_end.configuration.mappings.presentation;

import com.unosquare.admin_core.back_end.viewModels.workfromhome.ViewWorkingFromHomeViewModel;
import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;
import com.unosquare.admin_core.back_end.dto.EventDTO;
import org.modelmapper.PropertyMap;

public class ViewWorkingFromHomeMappings implements BaseMappings<EventDTO, ViewWorkingFromHomeViewModel> {

    @Override
    public PropertyMap<EventDTO, ViewWorkingFromHomeViewModel> MapFromSourceToTarget() {
        return new PropertyMap <EventDTO, ViewWorkingFromHomeViewModel>() {
            protected void configure() {

                map().setDateCreated(source.getDateCreated());
                map().setEndDate(source.getEndDate());
                map().setLastModified(source.getLastModified());
                map().setStartDate(source.getStartDate());

            }
        };
    }

    @Override
    public PropertyMap<ViewWorkingFromHomeViewModel, EventDTO> MapFromTargetToSource() {
        return  new PropertyMap <ViewWorkingFromHomeViewModel, EventDTO>() {
            protected void configure() {

            }
        };
    }
}