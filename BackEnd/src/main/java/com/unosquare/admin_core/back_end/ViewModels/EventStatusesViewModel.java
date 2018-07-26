package com.unosquare.admin_core.back_end.ViewModels;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

@Data
public class EventStatusesViewModel {

    private  String description;
    private  int eventStatusId;

}
