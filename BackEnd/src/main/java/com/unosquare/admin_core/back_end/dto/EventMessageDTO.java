package com.unosquare.admin_core.back_end.dto;
import lombok.Data;

import java.time.LocalDate;

@Data
public class EventMessageDTO {

    private int eventMessageId;
    private String author;
    private LocalDate lastModified;
    private String message;
    private int messageTypeId;
    private String messageTypeDescription;
}
