package com.unosquare.adminCore.controller;

import com.unosquare.adminCore.enums.HolidayStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/holidayStatuses")
public class HolidayStatusController {

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Map<HolidayStatus, String> getHolidayStatuses() {
        Map<HolidayStatus, String> statuses = new HashMap<>();

        for (HolidayStatus status: HolidayStatus.values()) {
            statuses.put(status, status.toString());
        }
        return statuses;
    }

}
