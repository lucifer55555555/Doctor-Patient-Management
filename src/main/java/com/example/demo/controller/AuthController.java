package com.example.demo.controller;

import com.example.demo.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login() {
        String token = jwtUtil.generateToken("admin", "ADMIN");
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("username", "admin");
        response.put("role", "ADMIN");
        return ResponseEntity.ok(response);
    }
}