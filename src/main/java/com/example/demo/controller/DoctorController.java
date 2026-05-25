package com.example.demo.controller;

import com.example.demo.entity.Doctor;
import com.example.demo.repository.DoctorRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/api/doctors")

public class DoctorController {

    @Autowired

    DoctorRepository repo;

    @GetMapping

    public List<Doctor> getDoctors() {

        return repo.findAll();

    }

    @PostMapping

    public Doctor addDoctor(
            @RequestBody Doctor doctor) {

        return repo.save(
                doctor);

    }
}