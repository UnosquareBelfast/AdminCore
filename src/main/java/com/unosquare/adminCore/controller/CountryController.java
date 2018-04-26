package com.unosquare.adminCore.controller;

import com.unosquare.adminCore.enums.Country;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/countries")
public class CountryController {

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Map<Country, String> getCountries() {
        Map<Country, String> countries = new HashMap<>();

        for (Country status: Country.values()) {
            countries.put(status, status.toString());
        }
        return countries;
    }
    
}
