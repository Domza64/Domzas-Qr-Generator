package xyz.domza.qrgenerator.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class QrController {

    @GetMapping("/")
    public String index() {
        return "index";
    }
}
