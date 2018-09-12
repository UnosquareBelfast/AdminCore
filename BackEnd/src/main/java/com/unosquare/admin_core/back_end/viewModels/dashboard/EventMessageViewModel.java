package com.unosquare.admin_core.back_end.viewModels.dashboard;

import lombok.Data;

@Data
public class EventMessageViewModel {
    private int eventMessageId;
    private String author;
    private String lastModified;
    private String message;
    private int messageTypeId;
    private String messageTypeDescription;
}
