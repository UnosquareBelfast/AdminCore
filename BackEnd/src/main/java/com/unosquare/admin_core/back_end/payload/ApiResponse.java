package com.unosquare.admin_core.back_end.payload;

import lombok.Data;

@Data
public class ApiResponse {

    private Boolean success;
    private String message;

    public ApiResponse(Boolean success, String message) {
        this.success = success;
        this.message = message;
    }
}