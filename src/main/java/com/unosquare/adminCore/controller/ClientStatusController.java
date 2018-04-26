package com.unosquare.adminCore.controller;

import com.unosquare.adminCore.enums.ClientStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/clientStatuses")
public class ClientStatusController {

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Map<ClientStatus, String> getClientStatuses() {
        Map<ClientStatus, String> statuses = new HashMap<>();

        for (ClientStatus status: ClientStatus.values()) {
            statuses.put(status, status.toString());
        }
        return statuses;
    }

}
