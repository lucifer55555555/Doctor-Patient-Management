package com.example.demo.controller;

import com.example.demo.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController

@RequestMapping("/api/auth")

public class AuthController {

    @Autowired

    JwtUtil jwtUtil;

    @PostMapping("/login")

    public String login() {

        return jwtUtil.generateToken(
                "admin",
                "ADMIN");

    }
}