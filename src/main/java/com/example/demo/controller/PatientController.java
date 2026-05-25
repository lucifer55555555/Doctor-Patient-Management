package com.example.demo.controller;

import com.example.demo.entity.Patient;
import com.example.demo.repository.PatientRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/api/patients")

public class PatientController {

    @Autowired

    PatientRepository repo;

    @GetMapping

    public List<Patient> getPatients() {

        return repo.findAll();

    }

    @PostMapping

    public Patient addPatient(
            @RequestBody Patient patient) {

        return repo.save(
                patient);

    }
}