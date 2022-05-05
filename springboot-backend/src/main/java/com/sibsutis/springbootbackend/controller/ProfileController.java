package com.sibsutis.springbootbackend.controller;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sibsutis.springbootbackend.exception.ResourceNotFoundException;
import com.sibsutis.springbootbackend.model.GymProgress;
import com.sibsutis.springbootbackend.model.StudentProfile;
import com.sibsutis.springbootbackend.repository.GymProgressRepository;
import com.sibsutis.springbootbackend.repository.StudentProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000/","http://192.168.0.6:3000/"})
@RestController
@RequestMapping("api/v1/profiles")
public class ProfileController {

    @Autowired
    StudentProfileRepository studentProfileRepository;

    @Autowired
    GymProgressRepository gymProgressRepository;

    @GetMapping()
    public List<StudentProfile> getAllProfiles(){
        return studentProfileRepository.findAll();
    }

    @GetMapping("/progress")
    public List<GymProgress> getGymProgresses(){
        return gymProgressRepository.findAll();
    }

}
