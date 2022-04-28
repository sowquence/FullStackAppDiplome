package com.sibsutis.springbootbackend.controller;

import com.sibsutis.springbootbackend.exception.ResourceNotFoundException;
import com.sibsutis.springbootbackend.model.*;
import com.sibsutis.springbootbackend.model.gymModel.Gym;
import com.sibsutis.springbootbackend.model.gymModel.Problem;
import com.sibsutis.springbootbackend.model.gymModel.Result;
import com.sibsutis.springbootbackend.repository.ContestRepository;
import com.sibsutis.springbootbackend.repository.gymRepository.GymRepository;
import com.sibsutis.springbootbackend.repository.StudentProfileRepository;
import com.sibsutis.springbootbackend.repository.gymRepository.ResultRepository;
import com.sibsutis.springbootbackend.service.CodeforcesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:3000/", "http://192.168.0.6:3000/"})
@RestController
@RequestMapping("api/v1/contests")
public class ContestController {

    @Autowired
    ContestRepository contestRepository;

    @Autowired
    StudentProfileRepository studentProfileRepository;

    @Autowired
    CodeforcesService codeforcesService;

    @Autowired
    ResultRepository resultRepository;

    @Autowired
    GymRepository gymRepository;

    @GetMapping("{id}")
    public List<Contest> getAllContestByUId(@PathVariable long id) {
        return studentProfileRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Profile not exist with id " + id)).getContests();
    }

    @GetMapping("gyms")
    public List<Gym> getGymsAsList() {
        return gymRepository.findAll();
    }

    //Добавление тренировок в список
    @PostMapping("gym/{gymId}")
    public ResponseEntity<Result> getInfoGym(@PathVariable long gymId) { //http://localhost:8080/api/v1/contests/gym


        Result gymResult = codeforcesService.getStudentGym(gymId);
        System.out.println(gymResult);
        resultRepository.save(gymResult);

        return ResponseEntity.ok(gymResult);

    }
}
