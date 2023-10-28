package xyz.domza.qrgenerator.controller;

import net.glxn.qrgen.core.image.ImageType;
import net.glxn.qrgen.javase.QRCode;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class RestQrController {

    private final Map<Integer, QRCode> tempMap = new HashMap<>();

    @GetMapping(value = "qrcode/svg/{qrcode}")
    public ResponseEntity<byte[]> getSvgQrCode(@PathVariable("qrcode") String code) throws IOException {
        File svgFile = tempMap.get(Integer.parseInt(code)).svg();
        byte[] file = Files.readAllBytes(svgFile.toPath());
        HttpHeaders header = new HttpHeaders();
        header.add("Content-Type","image/svg+xml");
        return ResponseEntity.ok()
                .headers(header)
                .body(file);
    }

    @GetMapping(value = "qrcode/{qrcode}", produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<byte[]> getPngQrCode(@PathVariable("qrcode") String code) {
        try {
            int id = Integer.parseInt(code);
            byte[] image = tempMap.get(id).to(ImageType.PNG).stream().toByteArray();
            return ResponseEntity.ok(image);
        } catch (Exception ignored) {}
        return null;
    }

    @PostMapping(value = "/getId")
    public Integer getId(@RequestBody String text) {
        String result = java.net.URLDecoder.decode(text, StandardCharsets.UTF_8).split("=")[1];
        int id = tempMap.size();
        tempMap.put(id, generateQRCodeImage(result));
        return id;
    }


    public static QRCode generateQRCodeImage(String barcodeText) {
        return QRCode.from(barcodeText).withSize(200, 200);
    }
}
