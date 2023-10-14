package xyz.domza.qrgenerator.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import xyz.domza.qrgenerator.model.StringDto;

@Controller
public class QrController {

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("text", new StringDto());
        return "index";
    }
}
