package com.unosquare.admin_core.back_end.viewModels.events;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
@Data
public class  EventTypeViewModel {

    private  String description;
    private  int eventTypeId;

}


