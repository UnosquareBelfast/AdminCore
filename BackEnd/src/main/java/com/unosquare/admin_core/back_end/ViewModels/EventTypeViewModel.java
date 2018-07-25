package com.unosquare.admin_core.back_end.ViewModels;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public class  EventTypeViewModel {

    private  String description;
    private  int eventTypeId;

}


