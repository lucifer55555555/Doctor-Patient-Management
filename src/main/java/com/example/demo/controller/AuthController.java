package com.example.demo.controller;

import com.example.demo.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController

@RequestMapping("/api/auth")

@CrossOrigin("*")

public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")

    public Map<String, Object> login(

            @RequestBody Map<String, String> credentials

    ) {

        String username =

                credentials.get(
                        "username");

        String password =

                credentials.get(
                        "password");

        if (

        username.equals(
                "admin")

                &&

                password.equals(
                        "admin123")

        ) {

            String token =

                    jwtUtil.generateToken(
                            username,
                            "ADMIN");

            return Map.of(

                    "username",
                    username,

                    "role",
                    "ADMIN",

                    "token",
                    token

            );

        }

        throw new RuntimeException(
                "Invalid username or password");

    }

}