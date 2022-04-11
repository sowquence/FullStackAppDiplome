package com.sibsutis.diploma.springbootbackend.controller;

import com.sibsutis.diploma.springbootbackend.model.Profile;
import com.sibsutis.diploma.springbootbackend.repository.StudentRepository;
import com.sibsutis.diploma.springbootbackend.repository.UserRepository;
import com.sibsutis.diploma.springbootbackend.service.CodeforcesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("api/v1/cf_students")
public class CodeforcesProfileController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CodeforcesService codeforcesService;

    @GetMapping
    public List<Profile> getUsers(@RequestBody List<String> handles) throws URISyntaxException {
        return codeforcesService.findAllUsers(handles);
    }



}
