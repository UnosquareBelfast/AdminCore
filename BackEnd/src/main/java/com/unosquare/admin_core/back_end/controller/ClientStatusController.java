package com.unosquare.admin_core.back_end.controller;

import com.unosquare.admin_core.back_end.enums.ClientStatus;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/clientStatuses")
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
public class ClientStatusController {

    @RequestMapping(method = RequestMethod.OPTIONS, value = "/*")
    @ResponseBody
    public ResponseEntity handleOptions() {
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ClientStatus[] getClientStatuses() {
        return ClientStatus.values();
    }

}
