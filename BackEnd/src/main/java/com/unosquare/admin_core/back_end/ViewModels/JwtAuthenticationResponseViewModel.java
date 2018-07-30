package com.unosquare.admin_core.back_end.ViewModels;

import lombok.Data;

@Data
public class JwtAuthenticationResponseViewModel {

    private String accessToken;
    private String tokenType = "Bearer";

    public JwtAuthenticationResponseViewModel(String accessToken) {
        this.accessToken = accessToken;
    }
}
