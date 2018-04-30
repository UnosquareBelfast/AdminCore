package com.unosquare.admin_core.controller;

import com.unosquare.admin_core.enums.Country;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
@RequestMapping("/countries")
public class CountryController {

    @RequestMapping(method = RequestMethod.OPTIONS, value = "/*")
    @ResponseBody
    public ResponseEntity handleOptions() {
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Country[] getCountries() {
        return Country.values();
    }
}
