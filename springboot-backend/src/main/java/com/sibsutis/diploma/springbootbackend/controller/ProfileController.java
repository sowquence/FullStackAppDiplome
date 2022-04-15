package com.sibsutis.diploma.springbootbackend.controller;

import com.sibsutis.diploma.springbootbackend.model.StudentProfile;
import com.sibsutis.diploma.springbootbackend.repository.StudentProfileRepository;
import com.sibsutis.diploma.springbootbackend.service.CodeforcesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000/","http://192.168.0.6:3000/"})
@RestController
@RequestMapping("api/v1/profiles")
public class ProfileController {

    @Autowired
    private StudentProfileRepository studentProfileRepository;

    @Autowired
    private CodeforcesService codeforcesService;

    @GetMapping
    public List<StudentProfile> getAllProfiles(){
        return studentProfileRepository.findAll();
    }

    @GetMapping("{handle}")
    public StudentProfile getStudentProfile(@PathVariable String handle) {
        return codeforcesService.getStudentProfile(handle);
    }
}
